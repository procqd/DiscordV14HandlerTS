import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { formatUptime } from '../../functions/formatUptime';
import { errMessage } from '../../../config.json';
import os from 'os';

export const command = {
    data: new SlashCommandBuilder()
        .setName('properties')
        .setDescription('Check how bot is doing!'),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: 64 });

        // RAM usage in MB and total system RAM in GB
        const ramUsageMB = process.memoryUsage().heapUsed / 1024 / 1024;
        const totalRAMGB = os.totalmem() / 1024 / 1024 / 1024; // Convert total RAM to GB
        const ramUsage = `**${ramUsageMB.toFixed(2)}** MB / **${totalRAMGB.toFixed(2)}** GB`;

        const numCpus = os.cpus().length; // Get the number of CPUs
        const botUptimeFormatted = formatUptime(interaction.client.uptime); // Bot uptime
        const systemUptimeFormatted = formatUptime(os.uptime() * 1000); // System uptime

        // CPU load (1-minute average)
        const cpuLoad = os.loadavg()[0]; // 1-minute load average
        const cpuLoadFormatted = `**${cpuLoad.toFixed(2)}%**`;

        try {
            const properties = new EmbedBuilder()
                .setTitle('Bot resources usage:')
                .setThumbnail(interaction.client.user.displayAvatarURL({ extension: interaction.client.user.avatar?.startsWith("a_") ? "gif" : "png", }))
                .addFields(
                    {
                        name: 'Uptime',
                        value: `﹐  Bot **:** ${botUptimeFormatted}\n` +
                            `﹐  System **:** ${systemUptimeFormatted}`
                    },
                    {
                        name: 'System',
                        value: `﹐  RAM Usage **:** ${ramUsage}\n` +
                            `﹐  Number of CPU's **:** **${numCpus}**\n` +
                            `﹐  CPU Load (1-min avg) **:** ${cpuLoadFormatted}`
                    },
                )
                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ extension: interaction.user.avatar?.startsWith("a_") ? "gif" : "png" }) })
                .setTimestamp();
            await interaction.editReply({ embeds: [properties] });
        } catch (error) {
            console.error('Error fetching bot properties:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};