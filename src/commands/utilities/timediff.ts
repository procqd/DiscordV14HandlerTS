import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { timediffFunction } from '../../functions/formatUptime';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('timediff')
        .setDescription('Calculates the time difference between two objects (messages..) using snowflake.')
        .addStringOption(option =>
            option.setName('obj_1')
                .setDescription('The ID of the first (earlier) object')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('obj_2')
                .setDescription('The ID of the second (later) object (defaults to now)')
                .setRequired(false)),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: 64 });

        try {
            const firstObjectId = interaction.options.getString('obj_1') ?? '';
            const secondObjectId = interaction.options.getString('obj_2') ?? '';

            if (!/^\d+$/.test(firstObjectId)) {
                return interaction.editReply('Invalid first object ID.');
            }
            if (secondObjectId && !/^\d+$/.test(secondObjectId)) {
                return interaction.editReply('Invalid second object ID.');
            }

            const snowflakeToTimestamp = (snowflake: string) => Number((BigInt(snowflake) >> 22n) + 1420070400000n);

            const time1 = snowflakeToTimestamp(firstObjectId);
            const time2 = secondObjectId ? snowflakeToTimestamp(secondObjectId) : interaction.createdTimestamp;

            if (time1 > time2) {
                return interaction.editReply('The first object should be the earlier one.');
            }

            const formattedTimeDiff = timediffFunction(time2, time1);

            await interaction.editReply(`; time difference: ${formattedTimeDiff}`);

        } catch (error) {
            console.error('Error occurred while calculating the time difference:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};


