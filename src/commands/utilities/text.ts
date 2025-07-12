import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import {
    encryptAES, decryptAES,
    encryptChaCha20, decryptChaCha20
} from '../../functions/text';
import {
    convertToASCII, convertFromASCII,
    convertToUnicode, convertFromUnicode
} from '../../functions/text';
import { errMessage } from '../../../config.json';
import { readFileSync } from 'fs';

export const command = {
    data: new SlashCommandBuilder()
        .setName('text')
        .setDescription('Encrypt, decrypt, or convert text')
        .addSubcommand(subcommand =>
            subcommand.setName('encrypt')
                .setDescription('Encrypt text using AES or ChaCha20')
                .addStringOption(option =>
                    option.setName('text').setDescription('The text to encrypt').setRequired(true))
                .addStringOption(option =>
                    option.setName('algorithm')
                        .setDescription('Encryption algorithm (aes, chacha)')
                        .setRequired(true)
                        .addChoices(
                            { name: 'AES', value: 'aes' },
                            { name: 'ChaCha20', value: 'chacha' }
                        ))
                .addStringOption(option =>
                    option.setName('key').setDescription('Secret key (optional)').setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName('decrypt')
                .setDescription('Decrypt text encrypted with AES or ChaCha20')
                .addStringOption(option =>
                    option.setName('text').setDescription('The encrypted text to decrypt').setRequired(true))
                .addStringOption(option =>
                    option.setName('key').setDescription('Secret key (required)').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('ascii')
                .setDescription('Convert text to ASCII binary or vice versa')
                .addStringOption(option =>
                    option.setName('text').setDescription('Text or ASCII binary').setRequired(true))
                .addBooleanOption(option =>
                    option.setName('reverse').setDescription('Reverse conversion').setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand.setName('unicode')
                .setDescription('Convert text to Unicode or vice versa')
                .addStringOption(option =>
                    option.setName('text').setDescription('Text or Unicode').setRequired(true))
                .addBooleanOption(option =>
                    option.setName('reverse').setDescription('Reverse conversion').setRequired(false))),

    async execute(interaction: ChatInputCommandInteraction) {
        // Load permissions
        const permissions = JSON.parse(readFileSync('premium.json', 'utf-8'));
        if (!permissions.allowedUserIds.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'This command is for premium users only. Please upgrade to gain access.',
                flags: 64,
            });
        }

        await interaction.deferReply({ flags: 64 });

        const subcommand = interaction.options.getSubcommand();
        const text = interaction.options.getString('text', true);

        try {
            if (subcommand === 'encrypt') {
                const algorithm = interaction.options.getString('algorithm', true);
                const key = interaction.options.getString('key') || 'default_secret';

                const encryptedText = algorithm === 'aes' ? encryptAES(text, key) : encryptChaCha20(text, key);
                await interaction.editReply({ content: encryptedText });
                return;
            }

            if (subcommand === 'decrypt') {
                let key = interaction.options.getString('key', true);
                if (key === '_') key = 'default_secret'; // used for nonsecret-text;
                const decryptedText = text.startsWith('aes:') ? decryptAES(text, key) : decryptChaCha20(text, key);
                await interaction.editReply({ content: decryptedText });
                return;
            }

            if (subcommand === 'ascii') {
                const reverse = interaction.options.getBoolean('reverse') || false;
                const result = reverse ? convertFromASCII(text) : convertToASCII(text);
                await interaction.editReply({ content: result });
                return;
            }

            if (subcommand === 'unicode') {
                const reverse = interaction.options.getBoolean('reverse') || false;
                const result = reverse ? convertFromUnicode(text) : convertToUnicode(text);
                await interaction.editReply({ content: result });
                return;
            }
        } catch (error) {
            console.error('Error occurred while encrypting, decrypting text:', error);
            await interaction.editReply({ content: errMessage });
        }
    }
};