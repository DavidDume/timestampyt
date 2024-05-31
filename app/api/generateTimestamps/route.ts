// pages/api/getTranscript.ts

import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export const POST = async (req: NextRequest, res: NextRequest) => {
    try {
        const transcriptInfo = await req.json();
        const videoSec =
            transcriptInfo.videoLength - (transcriptInfo.videoLength / 60) * 60;
        const videoMin = transcriptInfo.videoLength / 60;
        //console.log(transcriptInfo);
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `Generate timestamp titles for a ${videoMin} minutes and ${videoSec} second long YouTube video. Format: mm:ss Title.`,
                },
                {
                    role: 'user',
                    content: transcriptInfo.text,
                },
            ],
        });
        //console.log(response.choices[0].message);
        return new Response(JSON.stringify(response.choices[0].message), {
            status: 200,
        });
    } catch (e) {
        console.error('Error generating timestamps:', e);
        return new Response('Failed to fetch transcript', { status: 500 });
    }
};
