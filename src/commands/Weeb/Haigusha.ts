import MessageHandler from "../../Handlers/MessageHandler";

import BaseCommand from "../../lib/BaseCommand";

import WAClient from "../../lib/WAClient";

import { ISimplifiedMessage } from "../../typings";

import request from "../../lib/request";

import { MessageType } from "@adiwajshing/baileys";

import ms from "parse-ms-js";

import marika from "@shineiichijo/marika";

export default class Command extends BaseCommand {

  constructor(client: WAClient, handler: MessageHandler) {

    super(client, handler, {

      command: "haigusha",

      description: `Will summon a random character to marry.`,

      aliases: ["haigusha"],

      category: "weeb",

      usage: `${client.config.prefix}haigusha`,

      baseXp: 50,

    });

  }

  run = async (M: ISimplifiedMessage): Promise<void> => {

    const haigusha = await marika.getRandomCharacter();

    const source = await marika.getCharacterAnime(haigusha.mal_id);

    await this.client.DB.group.updateMany(

      { jid: M.from },

      {

        $set: {

          "haigushaResponse.name": haigusha.name,

          "haigushaResponse.id": haigusha.mal_id,

          "haigushaResponse.claimable": true,

        },

      }

    );

    let text = "";

    text += `💙 *Name: ${haigusha.name}*\n\n`;

    if (haigusha.nicknames.length > 0)

      text += `🖤 *Nicknames: ${haigusha.nicknames.join(", ")}*\n\n`;

    text += `💛 *Source: ${source[0].anime.title}*\n\n`;

    text += `❤ *Description:* ${haigusha.about}`;

    const buffer = await request.buffer(haigusha.images.jpg.image_url);

    const media = await this.client.prepareMessage(

      M.from,

      buffer,

      MessageType.image

    );

    const buttons = [

      {

        buttonId: "marry",

        buttonText: { displayText: `${this.client.config.prefix}marry` },

        type: 1,

      },

      {

        buttonId: "divorce",

        buttonText: { displayText: `${this.client.config.prefix}divorce` },

        type: 1,

      },

    ];

    const buttonMessage: any = {

      contentText: `${text}`,

      footerText: "beyond",

      buttons: buttons,

      headerType: 4,

      imageMessage: media?.message?.imageMessage,

    };

    await M.reply(buttonMessage, MessageType.buttonsMessage);

  };

}
