import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "deposit",
      description: "Deposit your gold to bank",
      aliases: ["deposit"],
      category: "economy",
      usage: `${client.config.prefix}deposit <amount>`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const user = M.sender.jid;
    if (!joined)
      return void M.reply(`Specify the amount of gold to deposit, Baka!`);
    const amount: any = joined.trim();
    if (isNaN(amount))
      return void M.reply(
        `*https://en.wikipedia.org/wiki/Number*\n\nI think this might help you.`
      );

    const wallet = await (await this.client.getUser(user)).wallet;
    const bank = await (await this.client.getUser(user)).bank;
    if (bank >= 1000000)
      return void M.reply(
        `🟥 *You can't have more than 1000000 gold in your bank*.`
      );
    if (wallet < amount)
      return void M.reply(
        `🟥 *You don't have sufficient amount of gold in your wallet to make this transaction*.`
      );
    await this.client.deposit(user, amount);
    return void M.reply(`You have transferred *${amount} gold* to your bank.`);
  };
}