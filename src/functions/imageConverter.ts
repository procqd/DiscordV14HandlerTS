import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Converts an image to the specified format.
 * @param {Buffer} imageBuffer - The image buffer.
 * @param {string} format - The desired format ('png' or 'jpeg').
 * @returns {Promise<string>} - The file path of the converted image.
 */
export async function convertImage(imageBuffer: Buffer, format: 'png' | 'jpeg'): Promise<string> {
  const newFileName = `converted-${uuidv4()}.${format}`;
  const filePath = join(__dirname, newFileName);

  try {
    let convertedBuffer: Buffer;
    if (format === 'png') {
      convertedBuffer = await sharp(imageBuffer).png().toBuffer();
    } else if (format === 'jpeg') {
      convertedBuffer = await sharp(imageBuffer).jpeg().toBuffer();
    } else {
      throw new Error('Invalid format');
    }

    writeFileSync(filePath, convertedBuffer);
    return filePath;
  } catch (error) {
    console.error('Error converting image:', error);
    throw error;
  }
}