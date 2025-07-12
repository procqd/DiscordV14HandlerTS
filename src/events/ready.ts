import { ActivityType, Client, Events } from 'discord.js';

export const event = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    client.user?.setPresence({ activities: [{ name: 'your-bot-activity-goes-here', type: ActivityType.Listening }], status: 'idle' });
    console.log(`(${client.user?.tag}) - ${client.user?.id} is running.`);
  },
};
