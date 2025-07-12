import { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addUserOption(option =>
            option.setName('target').setDescription('The member whose avatar to show').setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        // Fetch the user from the options, or default to the command sender
        const user = interaction.options.getUser('target') || interaction.user;
        const fetchedUser = await user.fetch(); // Fetch user to ensure banner retrieval

        try {
            // Avatar URL (preserve GIF if animated)
            const avatarURL = user.displayAvatarURL({
                extension: user.avatar?.startsWith('a_') ? 'gif' : 'png',
                size: 4096
            });

            // Banner URL (preserve GIF if animated, only if available)
            const bannerURL: string = fetchedUser.banner
                ? fetchedUser.bannerURL({
                    extension: fetchedUser.banner.startsWith('a_') ? 'gif' : 'png', // Force PNG/GIF
                    size: 4096,
                }) ?? ''
                : '';

            // Banner only if available
            const buttons = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Avatar')
                        .setURL(avatarURL)
                        .setStyle(ButtonStyle.Link)
                );

            if (bannerURL) {
                buttons.addComponents(
                    new ButtonBuilder()
                        .setLabel('Banner')
                        .setURL(bannerURL)
                        .setStyle(ButtonStyle.Link)
                );
            }

            await interaction.editReply({ components: [buttons] });
        } catch (error) {
            console.error('Error fetching member avatar:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};