import { Events, Interaction, Message } from 'discord.js';
import { ExtendedClient } from '../structures/ExtendedClient';

export const event = {
  name: Events.InteractionCreate,
  once: false,

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as ExtendedClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command.cooldown) {
      const remaining = client.isOnCooldown(
        interaction.user.id,
        interaction.commandName,
        {
          guildId: interaction.guildId || undefined
        }
      );

      if (remaining) {
        const cooldownEnd = Math.floor(Date.now() / 1000 + remaining);
        const formattedTime = `<t:${cooldownEnd}:R>`; // Correct timestamp format
        const coolMessages = [
          `\`💤\` Command taking a power nap! Available ${formattedTime}`,
          `\`⏱️\` Whoa there speedster! Try again ${formattedTime}`,
          `\`⏳\` Command will be available ${formattedTime}`
        ];
        const randomMessage = coolMessages[Math.floor(Math.random() * coolMessages.length)];

        try {
          const reply = await interaction.reply({
            content: randomMessage,
          });

          setTimeout(async () => {
            try {
              if (reply instanceof Message) {
                await reply.delete().catch(() => { });
              } else if ('delete' in reply) {
                await reply.delete().catch(() => { });
              }
            } catch {
              // Message already deleted or inaccessible - we can safely ignore
            }
          }, 1000);
        } catch (error) {
          console.error('Failed to send cooldown message:', error);
        }

        return;
      }
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing command "${interaction.commandName}":`, error);

      try {
        const errorReply = await interaction.reply({
          content: 'The command crashed!',
          flags: 64
        });

        setTimeout(async () => {
          try {
            if (errorReply instanceof Message) {
              await errorReply.delete().catch(() => { });
            } else if ('delete' in errorReply) {
              await errorReply.delete().catch(() => { });
            }
          } catch {
            // Message already deleted or inaccessible
          }
        }, 10000);
      } catch (error) {
        console.error('Failed to send error message:', error);
      }
    }
  },
};
