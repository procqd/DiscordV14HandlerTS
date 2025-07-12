import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, TextChannel } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Nuke the current text channel.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),

    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.channel as TextChannel;
        if (!channel) {
            return interaction.reply('This command can only be used in a text channel.');
        }

        const botMember = await interaction.guild?.members.fetchMe();
        if (!botMember) {
            return interaction.reply('Failed to retrieve bot information.');
        }

        // Check if the bot has the required permissions
        const botPermissions = channel.permissionsFor(botMember);
        if (
            !botPermissions?.has(PermissionsBitField.Flags.ManageChannels) ||
            !botPermissions?.has(PermissionsBitField.Flags.ViewChannel) ||
            !botPermissions?.has(PermissionsBitField.Flags.SendMessages)
        ) {
            return interaction.reply('I need the **Manage Channels**, **View Channel**, and **Send Messages** permissions to execute this command.');
        }

        await interaction.deferReply({ flags: 64 });

        try {
            const channelPosition = channel.position;
            const parent = channel.parent;

            // Clone the channel
            const clonedChannel = await channel.clone();
            await clonedChannel.setPosition(channelPosition);
            if (parent) await clonedChannel.setParent(parent);

            // Send a message in the new channel before deleting the original
            await clonedChannel.send(`; nuked by **${interaction.user.username}** <t:${Math.floor(Date.now() / 1000)}:R>`);

            // Delete the original channel
            await channel.delete();
        } catch (error) {
            console.error('An error occurred while nuking this channel:', error);
            await interaction.followUp({ content: errMessage }).catch(() => {});
        }
    }
};