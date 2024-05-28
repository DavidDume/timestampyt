import Stripe from 'stripe';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { subscriptionId } = await req.json();
        console.log(subscriptionId);

        if (!subscriptionId) {
            throw new Error('Subscription ID is missing');
        }

        const stripe = new Stripe(process.env.STRIPE_SK!);
        const deletedSubscription = await stripe.subscriptions.cancel(
            subscriptionId
        );

        return new Response(JSON.stringify(deletedSubscription), {
            status: 200,
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        return new Response('Failed to cancel subscription', { status: 500 });
    }
}
