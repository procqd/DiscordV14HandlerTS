import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, GuildMember } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban someone')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason to ban'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason') || 'no reason specified';  // Get the reason for the ban

        if (!member || !(member instanceof GuildMember)) return;

        try {
            // Ban the member, deleting a week's worth of messages
            await member.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason });
            await interaction.editReply(`**${member.user.tag}** has been banned.`);
        } catch (error) {
            console.error('Error occurred while banning a member:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};