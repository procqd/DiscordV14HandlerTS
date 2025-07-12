import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { exec } from 'child_process';
import { errMessage } from '../../../config.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Retrieves geolocation and abuse details of an IP address.')
        .addStringOption(option =>
            option.setName('address')
                .setDescription('The IP address to lookup')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const ip = interaction.options.getString('address', true);

        // Validate IP format
        const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
        if (!ipRegex.test(ip)) {
            interaction.reply('Invalid IP address format!');
            return;
        }

        await interaction.deferReply({ flags: 64 });

        exec(`curl -s https://ipinfo.io/${ip}/json`, (error, stdout) => {
            if (error) {
                console.error('Failed to fetch IP details', error);
                interaction.editReply({ content: errMessage });
                return;
            }

            try {
                const data = JSON.parse(stdout);
                if (data.error) {
                    interaction.editReply('Invalid IP address!');
                    return;
                }

                const localTime = new Date().toLocaleString('en-US', { timeZone: data.timezone });
                const timestamp = Math.floor(new Date(localTime).getTime() / 1000);
                const abuseDetails = data.abuse ? `**.** Email **__:__** ${data.abuse.email || 'Unknown'}
    **.** Address **__:__** ${data.abuse.address || 'Unknown'}
    **.** Phone **__:__** ${data.abuse.phone || 'Unknown'}` : '**.** No abuse details available';

                interaction.editReply({
                    content: `
    __**IP Geolocation**__
    **.** City **__:__** ${data.city || 'Unknown'}
    **.** State **__:__** ${data.region || 'Unknown'}
    **.** Country **__:__** ${data.country || 'Unknown'}
    **.** Postal **__:__** ${data.postal || 'Unknown'}
    **.** Local Time **__:__** <t:${timestamp}:f>
    **.** Timezone **__:__** ${data.timezone || 'Unknown'}
    **.** Coordinates **__:__** ${data.loc || 'Unknown'}
    __**Abuse Details**__
    ${abuseDetails}
    `});
            } catch (error) {
                console.error('Invalid response from IP service:', error);
                interaction.editReply({ content: errMessage });
            }
        });
    }
};