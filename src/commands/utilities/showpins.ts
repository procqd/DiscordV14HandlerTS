import { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType, TextChannel, Message } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('showpins')
        .setDescription('Easily browse all pinned messages in order.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to view pinned messages from')
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText))
        .addStringOption(option =>
            option.setName('order')
                .setDescription('Sort order: oldest or newest')
                .setRequired(false)
                .addChoices({ name: 'Oldest to Newest', value: 'oldest' }, { name: 'Newest to Oldest', value: 'newest' })),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: 64 });

        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const order = (interaction.options.getString('order') as 'oldest' | 'newest') || 'newest';

        if (!channel || !(channel instanceof TextChannel)) return;

        try {
            const pinnedMessages = await channel.messages.fetchPinned();

            if (pinnedMessages.size === 0) {
                return interaction.editReply({
                    content:
                        channel.id === interaction.channelId
                            ? 'No pinned messages found in this channel.'
                            : `No pinned messages found in <#${channel.id}>.`
                });
            }

            const sortedMessages = pinnedMessages.sort((a: Message, b: Message) =>
                order === 'oldest'
                    ? Number(BigInt(a.id) - BigInt(b.id))
                    : Number(BigInt(b.id) - BigInt(a.id))
            );

            const pinnedList = sortedMessages.map((msg: Message) => {
                const jumpLink = `[Jump](https://discord.com/channels/${msg.guildId}/${msg.channelId}/${msg.id})`;
                const content = msg.content || (msg.attachments.size > 0 ? '[Attachment 📎]' : '[No text]');
                return `**${msg.author.username}:** ${content}\n${jumpLink}`;
            });

            const header = `;  pinned messages ; <#${channel.id}> ;`;
            const chunks: string[] = [];
            let currentChunk = header;

            for (const message of pinnedList) {
                if (currentChunk.length + message.length + 2 > 2000) {
                    chunks.push(currentChunk);
                    currentChunk = message;
                } else {
                    currentChunk += `\n\n${message}`;
                }
            }

            if (currentChunk.length > 0) chunks.push(currentChunk);

            await interaction.editReply(chunks[0]);
            for (let i = 1; i < chunks.length; i++) {
                await interaction.followUp(chunks[i]);
            }
        } catch (error) {
            console.error('Error fetching pinned messages:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};