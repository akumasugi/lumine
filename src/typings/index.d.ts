import { WAGroupMetadata } from "@adiwajshing/baileys";

export * from "./message";
export * from "./command";
export * from "./mongo";
export interface IConfig {
  name: string;
  mods?: string[];
  prefix: string;
  session: string;
  mods: string[];
  gkey: string;
  chatBotUrl: string;
  gifApi: string;
  geniusKey: string;
  malUsername: string;
  malPassword: string;
}

export interface IParsedArgs {
  args: string[];
  flags: string[];
  joined: string;
}

export interface IExtendedGroupMetadata extends WAGroupMetadata {
  admins?: string[];
}

export interface ISession {
  clientID: string;
  serverToken: string;
  clientToken: string;
  encKey: string;
  macKey: string;
}

export interface IGroup {
  jid: string;
  events: boolean;
  nsfw: boolean;
  safe: boolean;
  mod: boolean;
  cmd: boolean;
  invitelink: boolean;
  news: boolean;
  bot: string;
  wild: boolean;
  lastPokemon: string;
  pId: number;
  pLevel: number;
  pImage: string;
  catchable: boolean;
  trade: boolean;
  startedBy: string;
  tOffer: {
    name: string;
    id: number;
    level: number;
    image: string;
  };
  tWant: string;
  haigushaResponse: {
    name: string;
    id: number;
    claimable: boolean;
  };
  quizResponse: {
    id: number;
    answer: number;
    ongoing: boolean;
    startedBy: string;
  };
}

export interface IUser {
  jid: string;
  ban: boolean;
  warnings: number;
  Xp: number;
  wallet: number;
  bank: number;
  coin: number;
  lastDaily: number;
  lastRob: number;
  pokemons: string[];
  party: {
    id: number;
    level: number;
    name: string;
    image: string;
  }[];
  pc: {
    id: number;
    level: number;
    name: string;
    image: string;
  }[];
  haigusha: {
    name: string;
    id: number;
  };
  married: boolean;
  lastQuizId: number;
}

export interface ICountdown {
  jid: string;
  slot: number;
  gamble: number;
  rob: number;
}

export interface IFeature {
  feature: string;
  state: boolean;
  jids: string[];
  id: string;
}

export interface IPackage {
  description: string;
  dependencies: { [key: string]: string };
  homepage: string;
  repository: {
    url: string;
  };
}
