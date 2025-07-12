import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('List the recent images posted in this channel.')
        .addStringOption(option =>
            option.setName('order')
                .setDescription('Choose the order of images')
                .setRequired(true)
                .addChoices(
                    { name: 'Oldest to Newest', value: 'oldest' },
                    { name: 'Newest to Oldest', value: 'newest' }
                )
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: 64 });

        const order = interaction.options.getString('order'); // Get sorting order
        const channel = interaction.channel as TextChannel;
        let messages: any;

        try {
            messages = await channel.messages.fetch({ limit: 100 });
        } catch (error) {
            console.error('Error fetching messages:', error);
            return interaction.editReply({ content: errMessage });
        }

        const imageMessages = messages
            .filter((msg: { attachments: { size: number; }; embeds: any[]; }) => msg.attachments.size > 0 || (msg.embeds.length > 0 && msg.embeds.some((embed: { image: any; }) => embed.image)))
            .map((msg: { guildId: number; channelId: number; id: any; }, index: any) => {
                const jumpLink = `[Jump To](https://discord.com/channels/${msg.guildId}/${msg.channelId}/${msg.id})`;
                return jumpLink;
            });

        if (imageMessages.length === 0) {
            return interaction.editReply('No recent image messages found.');
        }

        const orderedMessages = order === 'oldest' ? imageMessages.reverse() : imageMessages;
        const header = `; recent image messages : ${order === 'oldest' ? 'oldest → newest' : 'newest → oldest'} ;\n`;

        // Add numbering to the image messages
        const numberedMessages = orderedMessages.map((message: any, index: number) => `**#${index + 1}** ${message}`);
        await interaction.editReply(header + numberedMessages.join('\n'));
    }
};