import { createServerFn } from '@tanstack/react-start';
import cloudinary from './cloudinary';

export const fetchGallery = createServerFn({ method: 'GET' })
    .handler(async () => {
        try {
            // Fetch resources with context enabled to see the saved AI captions
            const result = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'inclusive_web_assets/',
                context: true,
                max_results: 30,
            });

            console.log('--- GALLERY ENGINE DEBUG LOG ---');
            console.log(`Found ${result.resources.length} assets.`);

            return result.resources.map((asset: any) => {
                /**
                 * LOGGING: This will print the 'custom' metadata object for every asset.
                 * If this is empty in your logs, the 'On-success script' isn't firing.
                 */
                console.log(`Asset: ${asset.public_id} | Metadata:`, asset.context?.custom);

                return {
                    publicId: asset.public_id,
                    url: asset.secure_url,
                    // We look for the 'caption' key saved by your Dashboard script
                    alt: asset.context?.custom?.caption || 'Processing AI Description...',
                };
            });
        } catch (error: any) {
            console.error('GALLERY FETCH ERROR:', error.message);
            return [];
        }
    });