import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import { isValidHttpUrl } from '../../functions/UrlValidation';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('bypass')
        .setDescription('Bypass annoying URL shorteners and reveal the original link.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Enter the shortened URL to bypass')
                .setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        // Load permissions
        const permissions = JSON.parse(readFileSync('premium.json', 'utf-8'));
        if (!permissions.allowedUserIds.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'This command is for premium users only. Please upgrade to gain access.',
                flags: 64,
            });
        }

        await interaction.deferReply({ flags: 64 });
        const shortenedUrl = interaction.options.getString('url', true) as string;

        // Validate URL using the built-in URL class;
        if (!isValidHttpUrl(shortenedUrl!)) {
            return interaction.reply({ content: 'You must provide a valid URL!' });
        }

        try {

            const response = await fetch(shortenedUrl, {
                method: "HEAD",
                redirect: "follow",
            });

            const originalUrl = response.url;

            if (originalUrl === shortenedUrl) {
                return interaction.editReply('Failed to bypass the shortened URL.');
            }
            await interaction.editReply(`; bypassed URL:\n\`\`\`${originalUrl}\`\`\``);
        } catch (error) {
            console.error("Error expanding URL:", error);
            await interaction.editReply({ content: errMessage });
        }
    }
};