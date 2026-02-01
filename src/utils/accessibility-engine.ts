/**
 * @fileoverview Server-side AI orchestration for accessibility metadata.
 * @module utils/accessibility-engine
 */

import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import cloudinary from './cloudinary';

/**
 * @description Zod schema for input validation.
 * Ensures data crossing the network boundary is strictly typed.
 */
const UploadSchema = z.object({
    fileUri: z.string(),
    language: z.string().optional().default('en'),
});

/**
 * Server function to handle the AI-driven upload pipeline.
 * .inputValidator() is the correct method name in v1.157.16.
 */
export const uploadImageAction = createServerFn({ method: 'POST' })
    .inputValidator(UploadSchema)
    .handler(async ({ data }) => {
        // data is now fully typed as { fileUri: string; language: string }
        const { fileUri, language } = data;

        try {
            const result = await cloudinary.uploader.upload(fileUri, {
                detection: 'captioning',
                raw_convert: `google_translate:${language}`,
                folder: 'auto-inclusive-web',
            });

            const altText = result.info?.detection?.captioning?.data?.caption || "Accessible image description.";

            return {
                publicId: result.public_id,
                secureUrl: result.secure_url,
                altText,
            };
        } catch (error) {
            console.error('[Server Function Error]:', error);
            throw new Error('Cloudinary AI processing failed.');
        }
    });