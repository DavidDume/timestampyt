'use client';

import React, { useEffect } from 'react';

import Price from '@/components/subscription/price';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import useUser from './hook/useUser';
import hero from '@/public/hero.png';
import Image from 'next/image';

const page = () => {
    const router = useRouter();
    const { data: user } = useUser();
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            // Replace this with your actual check
            if (user?.id) {
                console.log('User is logged in');
                router.push('/dashboard');
            }
        };

        checkUserLoggedIn();
    }, [user]);

    const benefits = [
        {
            title: 'Boost Viewer Engagement',
            description:
                'By providing clear and precise timestamps, viewers can easily find and jump to the parts of the video that interest them the most. This convenience encourages viewers to watch more segments of your video, ultimately increasing the overall watch time.',
        },
        {
            title: 'Improve SEO',
            description:
                'Search engines like Google use timestamps to understand the content of a video. By providing timestamps, you can help search engines better understand your video content, which can improve your video’s search ranking.',
        },
        {
            title: 'Save Time',
            description:
                'Manually creating timestamps for your videos can be time-consuming. TimeStampYT uses AI to automatically generate timestamps for your videos, saving you time and effort',
        },
        {
            title: 'Increase Video Views',
            description:
                'By providing timestamps, you can make your videos more accessible to viewers. This can help attract new viewers and increase the number of views on your videos.',
        },
        {
            title: 'Improve User Experience',
            description:
                'Viewers appreciate videos that are easy to navigate. By providing timestamps, you can improve the user experience of your videos and make them more enjoyable to watch.',
        },
        {
            title: 'Boost Video Revenue',
            description:
                'By increasing viewer engagement and watch time, you can boost your video revenue. TimeStampYT helps you maximize your video revenue by making your videos more engaging and accessible to viewers.',
        },
    ];

    return (
        <>
            <div className="w-[80%] mx-auto">
                <Navbar />

                <div className="text-center flex flex-col justify-center h-[600px]">
                    <h1 className="text-3xl">
                        Instantly Create Timestamps for Your YouTube Videos with
                        AI
                    </h1>
                </div>

                <div className="mb-20">
                    <h1 className="text-2xl text-center py-6">
                        Why use TimeStampYT?
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="p-2 bg-slate-600 rounded-lg"
                            >
                                <h1>{benefit.title}</h1>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <Image width={600} height={600} src={hero} alt="" />
                </div>

                <div className="py-8">
                    <Price />
                </div>
            </div>
        </>
    );
};

export default page;
