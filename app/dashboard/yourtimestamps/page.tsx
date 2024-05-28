'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { supabaseBrowser } from '@/lib/supabase/browser';
import useUser from '@/app/hook/useUser';
import TimeStampCard from '../components/TimeStampCard';
import { VideoInfo } from '@/lib/types/VideoInfo';
import Link from 'next/link';

const Page = () => {
    const { data: user } = useUser();

    const [timestamp, setTimestamps] = useState('');
    const [videos, setVideos] = useState<VideoInfo[] | null>(null);

    const fetchTimestamps = async () => {
        const supabase = await supabaseBrowser();

        if (!user) {
            console.error('User not authenticated');
            return null;
        }

        const userId = user.id;

        let { data, error } = await supabase
            .from('timestamps')
            .select('*')
            .eq('user_id', userId);

        //console.log(data);

        if (error) {
            console.error('Error fetching timestamps:', error);
        } else if (data) {
            const arr: VideoInfo[] = data.map((el: any) => ({
                thumbnail: el.img_url,
                title: el.yt_title,
                video_url: el.yt_link,
                timestamp: el.timestamp,
                lengthSeconds: '',
            }));
            setVideos(arr);
        }
    };

    useEffect(() => {
        fetchTimestamps();
    }, [user]);

    return (
        <Sidebar>
            <div>Your Timestamps</div>

            {videos?.length !== 0 ? (
                videos?.map((el, i) => (
                    <div key={i}>
                        <TimeStampCard
                            video={el}
                            timestamps={el.timestamp}
                            setTimestamps={setTimestamps}
                        />
                    </div>
                ))
            ) : (
                <div>
                    <h1>Nothing to see here...</h1>
                    <Link href="/dashboard" className="underline">
                        Start generating timestamps!
                    </Link>
                </div>
            )}
        </Sidebar>
    );
};

export default Page;
