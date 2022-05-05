import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "support",
      aliases: ["support"],
      description: "Gets the support group links",
      category: "general",
      usage: `${client.config.prefix}Support`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    await this.client.sendMessage(
      M.sender.jid,
      ` _*I'M FROM BEYOND 🎆*\n\n
        _*BEYOND GROUP*_:https://chat.whatsapp.com/EeIT4nf7PBUD8Kwbm4FgJC\n\n 
        _*FOLLOW ME ON INSTA*_:https://www.instagram.com/akuma__24/?hl=en`,

      MessageType.text
    );

    return void M.reply("Sent you the Group Link in personal message");
  };
}
