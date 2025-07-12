import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { uwuifyText } from '../../functions/text'
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('uwu')
        .setDescription('Convert text into an uwu-style message.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to uwuify')
                .setRequired(true)
        ),
    cooldown: 180,
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        try {
            const text = interaction.options.getString('text', true);
            const uwuifiedText = uwuifyText(text);
            await interaction.editReply(uwuifiedText);
        } catch (error) {
            console.error('Error occurred while converting to uwu-style:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};
