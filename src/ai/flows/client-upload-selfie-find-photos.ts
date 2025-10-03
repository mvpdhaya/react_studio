'use server';

/**
 * @fileOverview An AI agent that finds photos of a client from an event based on a selfie.
 *
 * - findPhotos - A function that handles the photo finding process.
 * - FindPhotosInput - The input type for the findPhotos function.
 * - FindPhotosOutput - The return type for the findPhotos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindPhotosInputSchema = z.object({
  selfieDataUri: z
    .string()
    .describe(
      "A selfie photo of the client, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  eventId: z.string().describe('The ID of the event.'),
});
export type FindPhotosInput = z.infer<typeof FindPhotosInputSchema>;

const FindPhotosOutputSchema = z.object({
  fileIds: z.array(z.string()).describe('The IDs of the files that match the selfie.'),
});
export type FindPhotosOutput = z.infer<typeof FindPhotosOutputSchema>;

export async function findPhotos(input: FindPhotosInput): Promise<FindPhotosOutput> {
  return findPhotosFlow(input);
}

const findPhotosPrompt = ai.definePrompt({
  name: 'findPhotosPrompt',
  input: {schema: FindPhotosInputSchema},
  output: {schema: FindPhotosOutputSchema},
  prompt: `You are an AI assistant helping clients find their photos from an event.

You will receive a selfie of the client and the event ID.

Your task is to identify the photos from the event that are most likely to be of the client in the selfie.

Return a list of file IDs of the matched photos.

Selfie: {{media url=selfieDataUri}}
Event ID: {{{eventId}}}
`,
});

const findPhotosFlow = ai.defineFlow(
  {
    name: 'findPhotosFlow',
    inputSchema: FindPhotosInputSchema,
    outputSchema: FindPhotosOutputSchema,
  },
  async input => {
    const {output} = await findPhotosPrompt(input);
    return output!;
  }
);
