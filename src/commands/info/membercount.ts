import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Get the current members count.'),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: 64 });

        try {
            const mCount = new EmbedBuilder()
                .setTitle('Members')
                .setDescription(`${interaction.guild?.memberCount}`)
                .setTimestamp();

            await interaction.editReply({ embeds: [mCount] });
        } catch (error) {
            console.error('Error fetching members count:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};