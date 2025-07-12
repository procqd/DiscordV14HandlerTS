// src/types/discord.d.ts
import { Client } from 'discord.js';

declare module 'discord.js' {
  interface Client {
    snipedMessages: { [channelId: string]: Array<{ author: { id: string; username: string }; content: string; timestamp: number }> };
    snipeCleanupInterval?: NodeJS.Timeout;
  }
}