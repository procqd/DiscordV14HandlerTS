import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import { isValidHttpUrl } from '../../functions/UrlValidation';
import { errMessage } from '../../../config.json';
import dotenv from 'dotenv';

dotenv.config()

export const command = {
    data: new SlashCommandBuilder()
        .setName('shrink')
        .setDescription('Takes long URLs and squeezes them into fewer characters.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Enter the URL to shrink')
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

        const urlToShorten = interaction.options.getString('url', true) as string;
        const apiKey = process.env.BITLY_API_KEY;

        if (!apiKey) {
            console.error('Bitly API Key is missing.');
            return interaction.reply({ content: 'Configuration error. Contact the bot support team by joining support server try **/support**.' });
        }

        // Validate URL using the built-in URL class;
        if (!isValidHttpUrl(urlToShorten)) {
            return interaction.reply({ content: 'You must provide a valid URL!' });
        }

        await interaction.deferReply({ flags: 64 });

        try {
            const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ long_url: urlToShorten }),
            });

            const data = await response.json();

            if (response.ok && data.link) {
                await interaction.editReply(`; your shortened URL:\n\`\`\`${data.link}\`\`\``);
            } else {
                throw new Error(data.description || "Unknown error from Bitly API.");
            }
        } catch (error) {
            console.error("Error shortening URL:", error);
            await interaction.editReply({ content: errMessage });
        }
    }
};