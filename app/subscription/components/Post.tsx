'use client';

import useUser from '@/app/hook/useUser';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

const SHORT_CONTENT = { id: 'prod_QAMmjINkDHXDXr', price: 6 };
const LONG_CONTENT = { id: 'prod_QAMmYvUMLRGZcg', price: 9 };

const Post = () => {
    const { data: user } = useUser();

    const [subDetails, setSubDetails] = useState<any>(null);
    const [isSubCancelled, setisSubCancelled] = useState(false);

    const cancelSubscription = async () => {
        if (!user) return;

        const response = await fetch('/api/stripe/cancelSubscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscriptionId: subDetails.id,
            }),
        });

        if (response.ok) {
            // Handle successful cancellation
            console.log('Subscription cancelled');
        } else {
            // Handle error
        }
    };

    useEffect(() => {
        const fetchSubDetails = async () => {
            const supabase = await supabaseBrowser();
            if (!user) return;
            const { data, error } = await supabase
                .from('subscription')
                .select()
                .eq('email', user.email);

            if (!data) return;

            const subId = data[0].subscription_id;

            if (!subId && data[0].end_at) {
                setisSubCancelled(true);
                return;
            }

            const response = await fetch(`/api/stripe?subId=${subId}`);
            const res = await response.json();
            console.log(res);
            setSubDetails(res);
        };

        fetchSubDetails();
    }, []);

    return (
        <div>
            {subDetails ? (
                <div>
                    <h1>
                        Your plan is:
                        {subDetails.plan.product === SHORT_CONTENT.id
                            ? 'Short Content'
                            : 'Long Content'}
                    </h1>
                    <h3>
                        Your subscription ends
                        {new Date(
                            subDetails.current_period_end * 1000
                        ).toLocaleDateString()}
                    </h3>
                </div>
            ) : (
                <div></div>
            )}

            <Button onClick={cancelSubscription}>Cancel Subscription</Button>
        </div>
    );
};

export default Post;
