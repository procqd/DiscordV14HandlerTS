import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { loadCommands } from '../handlers/loadCommands';
import { loadEvents } from '../handlers/loadEvents';
import { Command } from '../interfaces/Command';

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<string, number>>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
      ],
    });

    this.commands = new Collection();
    this.cooldowns = new Collection();
  }

  public async init(): Promise<void> {
    try {
      await loadCommands(this);
      await loadEvents(this);
      await this.login(process.env.TOKEN);
    } catch (error) {
      console.error('Error during bot initialization:', error);
    }
  }

  /* Cooldown System */
  public isOnCooldown(
    userId: string,
    commandName: string,
    options?: {
      guildId?: string;
      bypassPremium?: boolean;
    }
  ): number | false {
    const cooldownKey = options?.guildId
      ? `${options.guildId}-${commandName}`
      : commandName;

    if (!this.cooldowns.has(cooldownKey)) {
      this.cooldowns.set(cooldownKey, new Collection());
    }

    const now = Date.now();
    const timestamps = this.cooldowns.get(cooldownKey)!;
    const command = this.commands.get(commandName);
    const cooldownAmount = (command?.cooldown || 3) * 1000;

    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;

      if (now < expirationTime) {
        return (expirationTime - now) / 1000;
      }
    }

    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);
    return false;
  }

  public clearCooldowns(): void {
    this.cooldowns.clear();
  }

  // Keep your existing then method if needed
  then(_arg0: any) {
    throw new Error('Method not implemented.');
  }
}

export default ExtendedClient;
