'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import useUser from '@/app/hook/useUser';
import { useRouter } from 'next/navigation';
import { checkout } from '@/lib/actions/stripe';
import { loadStripe } from '@stripe/stripe-js';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';

const Checkout = ({ priceId }: { priceId: string }) => {
    const { data: user } = useUser();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (user?.id) {
            setLoading(true);
            const data = JSON.parse(
                await checkout(
                    user.email,
                    priceId,
                    location.origin + location.pathname
                )
            );
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
            const res = await stripe?.redirectToCheckout({
                sessionId: data.id,
            });
            if (res?.error) {
                alert('Fail to checkout');
            }
            setLoading(false);
        } else {
            router.push('/auth?next=' + location.pathname);
        }
    };

    return (
        <Button className="" onClick={handleCheckout}>
            Getting Started
            <AiOutlineLoading3Quarters
                className={cn('animate-spin', loading ? 'block' : 'hidden')}
            />
        </Button>
    );
};

export default Checkout;
