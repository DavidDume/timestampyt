// pages/api/getTranscript.ts

import type { NextRequest } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import ytdl from 'ytdl-core';

export const GET = async (req: NextRequest, res: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;

        const videoId = searchParams.get('videoId');

        if (!videoId) {
            throw new Error('Video ID is missing');
        }
        let info = await ytdl.getInfo(videoId);

        // Fetch transcript for the video
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);

        const res = { info, transcript };

        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.error('Error fetching followers:', error);
        return new Response('Failed to fetch transcript', { status: 500 });
    }
};
