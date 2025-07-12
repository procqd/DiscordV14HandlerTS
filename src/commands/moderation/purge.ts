import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, TextChannel } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Bulk delete messages.')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Number of messages to delete')
                .setMinValue(1)
                .setMaxValue(101)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.channel as TextChannel;
        if (!channel) {
            return interaction.reply('This command can only be used in a text channel.');
        }
        
        await interaction.deferReply({ flags: 64 });

        try {
            const amount = interaction.options.getInteger('amount') || 100; // Default to 100 if no amount is provided

            // Fetch messages to check if there are any to delete
            const fetchedMessages = await channel.messages.fetch({ limit: amount });
            if (fetchedMessages.size === 0) {
                await interaction.editReply('There are no messages to delete in this channel.');
                return;
            }

            // Bulk delete messages
            const deletedMessages = await channel.bulkDelete(fetchedMessages, true);
            await wait(500);
            await interaction.editReply(`; purged **${deletedMessages.size}** messages.`);
        } catch (error) {
            console.error('Error occurred while deleting messages:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};