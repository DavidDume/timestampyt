'use client';

import React from 'react';
import useUser from '../hook/useUser';
import Post from './components/Post';
import Price from '@/components/subscription/price';
import Sidebar from '../dashboard/components/Sidebar';

const Page = () => {
    const { data: user, isLoading } = useUser();

    if (isLoading) {
        return <></>;
    }

    const isActive = !user?.subscription?.end_at
        ? false
        : new Date(user.subscription.end_at) > new Date();

    return (
        <Sidebar>
            <h1>This is subscription page</h1>

            <div>
                {isActive ? (
                    <Post />
                ) : (
                    <div>
                        <h1>You need to subscribe to see the data</h1>
                        <Price />
                    </div>
                )}
            </div>
        </Sidebar>
    );
};

export default Page;
