/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "lumine",
      description: "sends pics of lumine",
      category: "lumine",
      usage: `${client.config.prefix}lumine`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const images = [
      "https://wallpapercave.com/wp/wp7487067.jpg",
      "https://wallpapercave.com/wp/wp7486872.jpg",
      "https://wallpapercave.com/wp/wp7487045.jpg",
      "https://wallpapercave.com/wp/wp8467619.jpg",
      "https://wallpapercave.com/wp/wp8467629.jpg",
      "https://wallpapercave.com/wp/wp7648534.jpg",
      "https://wallpapercave.com/wp/wp8467660.jpg",
      "https://wallpapercave.com/wp/wp8467665.jpg",
      "https://wallpapercave.com/wp/wp7648633.jpg",
      "https://wallpapercave.com/wp/wp7940819.jpg",
      "https://wallpapercave.com/wp/wp8467681.jpg",
      "https://wallpapercave.com/wp/wp8467768.jpg",
      "https://wallpapercave.com/wp/wp7657219.jpg",
      "https://wallpapercave.com/wp/wp8467800.jpg",
    ];
    const selected = images[Math.floor(Math.random() * images.length)];
    const text = `*💖THERE YOU GO💖*\n\n`;
    this.client.sendMessage(M.from, { url: selected }, MessageType.image, {
      caption: `${text}`,
    });
  };
}
