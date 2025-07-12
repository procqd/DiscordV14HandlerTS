import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { convertImage } from '../../functions/imageConverter';
import { errMessage } from '../../../config.json';
import { extname } from 'path';
import { exec } from 'child_process';
import { unlinkSync, writeFileSync } from 'fs';
import path from 'path';
import { fetchDynamic as fetch } from '../../functions/fetchDynamic';

export const command = {
  data: new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert files and images')
    .addSubcommand(subcommand =>
      subcommand
        .setName('image')
        .setDescription('Convert an image between PNG and JPG.')
        .addAttachmentOption(option =>
          option.setName('image')
            .setDescription('Upload an image to convert')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('format')
            .setDescription('Choose the format to convert to')
            .setRequired(true)
            .addChoices(
              { name: 'PNG', value: 'png' },
              { name: 'JPG', value: 'jpeg' }
            )
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.options.getSubcommand() === 'image') {
      await interaction.deferReply({ flags: 64 });

      const image = interaction.options.getAttachment('image', true);
      const desiredFormat = interaction.options.getString('format') as 'png' | 'jpeg';

      if (!['png', 'jpeg'].includes(desiredFormat)) return;

      const fileExtension = extname(image.name).toLowerCase().replace('.', '');
      if (!['png', 'jpg', 'jpeg'].includes(fileExtension)) {
        return interaction.editReply('Please upload a PNG or JPG image.');
      }

      const currentFormat = fileExtension === 'jpeg' ? 'jpg' : fileExtension;
      if (currentFormat === desiredFormat) {
        return interaction.editReply(`The image is already in **${desiredFormat.toUpperCase()}** format.`);
      }

      try {
        const response = await fetch(image.url);
        const buffer = await response.arrayBuffer();

        const convertedBuffer = await convertImage(Buffer.from(buffer), desiredFormat);
        const tempFilePath = path.join(__dirname, `temp_converted.${desiredFormat}`);
        writeFileSync(tempFilePath, convertedBuffer);

        // Path to curl executable (use absolute if needed)
        const curlPath = `"C:\\Program Files (x86)\\GnuWin32\\curl.exe"`;

        // Upload with -k (insecure) to skip SSL cert check
        const curlCommand = `${curlPath} -k -F "file=@${tempFilePath}" -F "expires=24" https://0x0.st`;

        exec(curlCommand, (error, stdout, stderr) => {
          unlinkSync(tempFilePath); // Cleanup

          if (error) {
            console.error('Error uploading image with curl:', stderr);
            return interaction.editReply({ content: errMessage });
          }

          const fileUrl = stdout.trim();
          interaction.editReply({
            content: `Here is your converted image **(${desiredFormat.toUpperCase()})**:`,
            files: [fileUrl]
          });
        });
      } catch (error) {
        console.error('Error processing image:', error);
        await interaction.editReply({ content: errMessage });
      }
    }
  }
};