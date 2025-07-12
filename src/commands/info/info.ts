import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about the server or a user.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('Get information about a server member.')
                .addUserOption(option =>
                    option.setName('target').setDescription('The member to get information about').setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Get information about the server.')
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const { options, guild } = interaction;
        try {
            if (interaction.options.getSubcommand() === 'member') {
                const user = options.getUser('target') || interaction.user; // Defaults to command sender
                const member = await guild?.members.fetch(user.id).catch(() => null); // Ensures fetching even if not cached
                const fetchedUser = await user.fetch();

                // Handle Presence & Device Info
                let status = 'Offline';
                let deviceType = 'Unknown';

                if (member?.presence) {
                    switch (member.presence.status) {
                        case 'online': status = 'Online'; break;
                        case 'idle': status = 'Idle'; break;
                        case 'dnd': status = 'Do Not Disturb'; break;
                    }

                    // Detect device type
                    const clientStatus = member.presence.clientStatus || {};
                    if (clientStatus.desktop) deviceType = 'Desktop';
                    else if (clientStatus.mobile) deviceType = 'Mobile';
                    else if (clientStatus.web) deviceType = 'Web';
                }

                // Handle Roles (Limit to 10 to prevent embed overflow)
                const roleMentions = member?.roles?.cache?.filter((role: { id: any; }) => role.id !== guild?.id)?.map((role: { toString: () => any; }) => role.toString()) || [];
                const extraRoles = roleMentions.length > 10 ? ` +${roleMentions.length - 10} more` : '';
                const rolesString = roleMentions.length > 0 ? roleMentions.slice(0, 10).join(', ') + extraRoles : 'no roles (;';

                // Handle User Avatar (Keep GIF if animated)
                const avatarURL = user.displayAvatarURL({
                    extension: user.avatar?.startsWith('a_') ? 'gif' : 'png',
                    size: 4096
                });

                // Handle User Banner (Only show if available & Keep GIF if animated)
                const bannerURL: string = fetchedUser.banner
                    ? fetchedUser.bannerURL({
                        extension: fetchedUser.banner.startsWith('a_') ? 'gif' : 'png',
                        size: 4096,
                    }) ?? ''
                    : '';

                // Construct Embed
                const profile = new EmbedBuilder()
                    .setAuthor({ name: `${user.displayName}'s Profile` })
                    .setThumbnail(avatarURL)
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ extension: interaction.user.avatar?.startsWith('a_') ? 'gif' : 'png' }) })
                    .setTimestamp()
                    .addFields(
                        {
                            name: 'User Identity',
                            value: `﹐ Username **:** ${user.username}\n` +
                                `﹐ User ID **:** [${user.id}](https://discord.com/users/${user.id}/)\n` +
                                `﹐ Bot **:** ${user.bot ? 'Yes' : 'No'}\n` +
                                `﹐ Created **:**   <t:${Math.round(user.createdAt.getTime() / 1000)}:D>; <t:${Math.round(user.createdAt.getTime() / 1000)}:R>\n`,
                        },
                        {
                            name: 'Presence',
                            value: `﹐ Status **:** ${status}\n` +
                                `﹐ Device Type **:** ${deviceType}\n`,
                        },
                        {
                            name: 'Server Member Info',
                            value: member ?
                                `﹐ Nickname **:** ${member.nickname || 'none'}\n` +
                                (user.bot ? '' : `﹐ Boosted **:** ${member.premiumSince ? 'Yes' : 'No'}\n`) +
                                `﹐ Joined **:** ${member.joinedAt ? `<t:${Math.round(member.joinedAt.getTime() / 1000)}:D>; <t:${Math.round(member.joinedAt.getTime() / 1000)}:R>` : 'Unknown'}\n` +
                                `﹐ Roles **:** ${rolesString}`
                                : 'Unfortunately, this user is not in the server.',
                        }
                    );

                // Buttons for Avatar and Banner (Banner only if available)
                const buttons = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Avatar')
                            .setURL(avatarURL || 'https://discord.com/')
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

                await interaction.editReply({ embeds: [profile], components: [buttons] });
            }

            if (interaction.options.getSubcommand() === 'server') {
                if (!guild) return await interaction.editReply('This command only works inside a server!');

                await guild.fetch();

                // Process server information as usual
                // Fetch members, emojis, and stickers
                const members = guild.members.cache;
                const boostTier = ['No Boost', 'Tier 1 (•́ᴗ•̀๑)', 'Tier 2 (✿◕‿◕)', 'Tier 3 (UwU SUGOI~)'][guild.premiumTier] || 'Unknown';

                let botCount = 0;
                let humanCount = 0;

                members.forEach((member: { user: { bot: any; }; }) => {
                    if (member.user.bot) botCount++;
                    else humanCount++;
                });

                // Count channel types
                const channels = guild.channels.cache;
                const categoryCount = channels.filter((channel: { type: number; }) => channel.type === 4).size;
                const textCount = channels.filter((channel: { type: number; }) => channel.type === 0).size;
                const voiceCount = channels.filter((channel: { type: number; }) => channel.type === 2).size;
                const totalChannelCount = channels.size;

                // Get server icon (Uses GIF if animated)
                const iconURL = guild.iconURL({
                    extension: guild.icon?.startsWith('a_') ? 'gif' : 'png',
                    size: 4096
                });

                // Get server banner (Uses GIF if animated)
                const bannerURL = guild.bannerURL({
                    extension: guild.banner?.startsWith('a_') ? 'gif' : 'png',
                    size: 4096
                });

                // Verification Info
                const verificationLevels = ['None', 'Low', 'Medium', 'High', 'Very High'];
                const verificationType = verificationLevels[guild.verificationLevel] || 'Unknown';

                // Construct Embed
                const svInfo = new EmbedBuilder()
                    .setTitle('Welcome to the Server Info Panel')
                    .setThumbnail(iconURL || '')
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ extension: 'png' }) })
                    .setTimestamp()
                    .addFields(
                        {
                            name: 'Overview',
                            value: `﹐ Server Name **:** **${guild.name}**\n` +
                                `﹐ Server ID **:** **${guild.id}**\n` +
                                `﹐ Region **:** **${guild.preferredLocale}**\n` +
                                `﹐ Created **:** <t:${Math.round(guild.createdAt.getTime() / 1000)}>; <t:${Math.round(guild.createdAt.getTime() / 1000)}:R>\n` +
                                `﹐ Owner **:** **[${guild.ownerId}](https://discord.com/users/${guild.ownerId}/)**\n` +
                                `﹐ Boosts **:** **${guild.premiumSubscriptionCount}** ( ${boostTier} )\n` +
                                `﹐ Verification Level **:** **${guild.verificationLevel}** ( **${verificationType}** )`,
                            inline: false
                        },
                        {
                            name: 'Community Info',
                            value: `﹐ All Members **:** **${guild.memberCount}** ; ( Humans **${humanCount}** - Bots **${botCount}** )\n` +
                                `﹐ All Channels **:** **${totalChannelCount}** ; ( Categories **${categoryCount}** - Text **${textCount}** - Voice **${voiceCount}** )\n` +
                                `﹐ Stickers Count **:** **${(await guild.stickers.fetch()).size}**\n` +
                                `﹐ Roles Count **:** **${guild.roles.cache.size}**\n` +
                                `﹐ Emojis Count **:** **${(await guild.emojis.fetch()).size}**`,
                            inline: false
                        }
                    );

                // Create buttons (Only add banner if available)
                const buttons = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Icon')
                            .setURL(iconURL || 'https://discord.com/') // Fallback URL if no icon
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

                await interaction.editReply({ embeds: [svInfo], components: [buttons] });
            }
        } catch (error) {
            console.error('Error in info command execution:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};