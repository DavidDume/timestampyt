'use client';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import useUser from '@/app/hook/useUser';
import Checkout from './Checkout';

export default function Price() {
    const { data: user, isLoading } = useUser();
    const prices = [
        {
            title: 'Short Content',
            description: '$6 per month',
            benefits: ['Up to 15 videos per month', 'Edit options'],
            amount: 6,
            priceId: 'price_1PK22bJahvWWjgcOw2R8e4ue',
        },
        {
            title: 'Long Content',
            description: '$9 per month',
            benefits: [
                'Up to 30 videos per month',
                'Edit options',
                'Perfect for podcasts',
                'Early access to new updates',
            ],
            amount: 9,
            priceId: 'price_1PK22oJahvWWjgcOPoIgESFE',
        },
        {
            title: 'Unlimited',
            description: '$14 per month',
            benefits: [
                'Unlimited videos per month',
                'Unlimited number of TimeStamps generations',
                'Edit options',
                'Perfect for podcasts',
                'Early access to new updates',
            ],
            amount: 9,
            priceId: 'price_1PK22oJahvWWjgcOPoIgESFE',
        },
    ];

    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {prices.map((price, i) => {
                        const isPopular = i === 1;

                        return (
                            <div
                                key={i}
                                className={cn(
                                    'border rounded-md p-5 space-y-5 flex flex-col justify-between',
                                    { 'ring-2 ring-green-500': isPopular }
                                )}
                            >
                                <div className="space-y-3">
                                    <h1 className="text-2xl font-bold">
                                        {price.title}
                                    </h1>
                                    <h1 className="text-3xl font-bold">
                                        {price.description}
                                    </h1>

                                    <div className="space-y-3">
                                        {price.benefits.map((benefit, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="space-y-3 flex items-center gap-2"
                                                >
                                                    <CheckCircle2 />
                                                    <h1 className="text-sm text-gray-400">
                                                        {benefit}
                                                    </h1>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Checkout priceId={price.priceId} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
