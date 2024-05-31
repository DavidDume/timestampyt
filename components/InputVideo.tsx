'use client';

import useUser from '@/app/hook/useUser';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { VideoInfo } from '@/lib/types/VideoInfo';
import { extractVideoId } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { PiLinkLight } from 'react-icons/pi';
import { Button } from './ui/button';
import TimeStampCard from '@/app/dashboard/components/TimeStampCard';
import Link from 'next/link';

const InputVideo = () => {
    const { data: user } = useUser();

    const [ytLink, setYtLink] = useState('');
    const [transcript, setTranscipt] = useState('');
    const [video, setVideo] = useState<VideoInfo>();
    const [timestamps, setTimestamps] = useState('');
    const initialRender = useRef(true);
    const [loading, setLoading] = useState(false);

    async function fetchTranscript(url: string) {
        setLoading(true);

        let videoId = extractVideoId(url);
        if (!videoId) {
            console.log('invalid url');
            return;
        }

        const response = await fetch(`/api/getTranscript?videoId=${videoId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch transcript');
        }

        let res = await response.json();
        //console.log(res.transcript);

        let text = '';
        res.transcript.forEach((element: any) => {
            text = text + ' ' + element.text;
        });

        setTranscipt(text);
        let thumbnail = res.info.videoDetails.thumbnails[0].url;
        let baseUrl = thumbnail.split('?')[0];
        thumbnail = baseUrl.replace('hqdefault', 'maxresdefault'); //this gets the best quality

        setVideo({
            lengthSeconds: res.info.videoDetails.lengthSeconds,
            thumbnail,
            title: res.info.videoDetails.title,
            video_url: res.info.videoDetails.video_url,
            timestamp: '',
        });
    }

    const saveToDB = async (
        yt_link: string,
        img_url: string,
        yt_title: string,
        timestamp: string
    ) => {
        const supabase = await supabaseBrowser();

        // Check if the user is logged in
        if (!user) return;

        const userId = user.id;

        // Upsert (insert or update) the record in the database
        const { data, error } = await supabase
            .from('timestamps')
            .upsert(
                { yt_link, img_url, yt_title, timestamp, user_id: userId },
                { onConflict: 'yt_link, user_id' }
            )
            .select();

        if (error) return error;
    };

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else if (video) {
            getTimestamps();
        }
    }, [video]);

    if (
        !user?.subscription?.end_at ||
        user?.subscription?.end_at < new Date().toISOString()
    ) {
        return (
            <div className="text-center">
                You need to{' '}
                <Link className="underline" href={'/subscription'}>
                    subscribe
                </Link>{' '}
                to use this feature
            </div>
        );
    }

    async function getTimestamps() {
        const transcriptInfo = {
            text: transcript,
            videoLength: video?.lengthSeconds,
        };

        //console.log(transcriptInfo);
        const response = await fetch('/api/generateTimestamps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transcriptInfo),
        });
        const res = await response.json();
        setTimestamps(res.content);

        if (video && response.ok) {
            saveToDB(ytLink, video.thumbnail, video.title, res.content);
        }

        if (!response.ok) {
            throw new Error('Failed to fetch timestamps');
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex gap-2 p-2 mx-auto w-max my-12">
                <div className="flex items-center gap-2 bg-slate-600 p-1 rounded-md w-[450px] ">
                    <PiLinkLight />
                    <input
                        type="text"
                        placeholder="Paste YouTube Link"
                        className="bg-transparent outline-none w-full"
                        onChange={(e) => setYtLink(e.target.value)}
                        value={ytLink}
                    />
                </div>

                <Button
                    className="border px-2 py-1 rounded-md"
                    onClick={() => fetchTranscript(ytLink)}
                >
                    Save
                </Button>
            </div>
            <div className="mx-auto w-[70%]">
                {loading ? (
                    <div className="text-center">Hang in there...</div>
                ) : (
                    video && (
                        <TimeStampCard
                            video={video}
                            timestamps={timestamps}
                            setTimestamps={setTimestamps}
                        />
                    )
                )}
            </div>
        </>
    );
};

export default InputVideo;
