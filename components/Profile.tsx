'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import useUser from '@/app/hook/useUser';
import Image from 'next/image';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { protectedPath } from '@/lib/constants';

const Profile = () => {
    const { isFetching, data } = useUser();
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    if (isFetching) {
        return <></>;
    }

    const goToSubscription = () => {
        router.push('/subscription');
    };

    const handleLogout = async () => {
        const supabase = supabaseBrowser();
        queryClient.clear();

        await supabase.auth.signOut();

        router.refresh();

        if (protectedPath.includes(pathname)) {
            router.replace('/auth?next=' + pathname);
        }
    };

    return (
        <>
            <div>
                {!data?.id ? (
                    <Link href="/auth" className="animate-fade">
                        <Button variant="outline">Sign In</Button>
                    </Link>
                ) : (
                    <>
                        {data?.image_url ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-4 items-center">
                                        <Image
                                            src={data.image_url || ''}
                                            alt={data.display_name || ''}
                                            width={50}
                                            height={50}
                                            className="rounded-full animate-fade ring-2 cursor-pointer"
                                        />
                                        <div className="text-sm">
                                            <h1>{data.display_name}</h1>
                                            <h1>{data.email}</h1>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[15rem]">
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={goToSubscription}
                                    >
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer"
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div
                                className="h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold cursor-pointer"
                                onClick={handleLogout}
                            >
                                <h1>{data.email}</h1>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
