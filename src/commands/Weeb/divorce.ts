import MessageHandler from "../../Handlers/MessageHandler";

import BaseCommand from "../../lib/BaseCommand";

import WAClient from "../../lib/WAClient";

import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {

  constructor(client: WAClient, handler: MessageHandler) {

    super(client, handler, {

      command: "divorce",

      description: `Divorces your haigusha`,

      category: "weeb",

      usage: `${client.config.prefix}divorce`,

      baseXp: 10,

    });

  }

  run = async (M: ISimplifiedMessage): Promise<void> => {

  const l = await (await this.client.getUser(M.sender.jid)).haigusha;

    if (await !(await this.client.getUser(M.sender.jid)).married)

      return void M.reply(`You are already single.`);

    await this.client.DB.user.updateOne(

      { jid: M.sender.jid },

      {

        $set: {

          married: false,

        },

      }

    );

        await M.reply(`You divorced *${l.name}*.`);

  };

}

