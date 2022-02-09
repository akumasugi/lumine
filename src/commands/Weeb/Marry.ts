import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "marry",
      description: `Will marry the recently summoned haigusha.`,
      category: "weeb",
      usage: `${client.config.prefix}marry`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const l = await (await this.client.getUser(M.sender.jid)).haigusha;
    if (
      await !(
        await this.client.getGroupData(M.from)
      ).haigushaResponse.claimable
    )
      return void M.reply(
        `There are no characters around to marry. Use ${this.client.config.prefix}haigusha to summon one.`
      );
    if (await (await this.client.getUser(M.sender.jid)).married)
      return void M.reply(`You are already married to *${l.name}*.`);
    const type = await (
      await this.client.getGroupData(M.from)
    ).haigushaResponse;
    await this.client.DB.group.updateOne(
      { jid: M.from },
      {
        $set: {
          "haigushaResponse.claimable": false,
        },
      }
    );
    await this.client.DB.user.updateMany(
      { jid: M.sender.jid },
      {
        $set: {
          "haigusha.name": type.name,
          "haigusha.id": type.id,
          married: true,
        },
      }
    );
    await M.reply(`🎉 You are now married with *${type.name}*.`);
  };
}
