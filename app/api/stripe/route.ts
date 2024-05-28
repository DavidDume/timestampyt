import Stripe from 'stripe';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        const subId = searchParams.get('subId');

        if (!subId) {
            throw new Error('Sub ID is missing');
        }

        const stripe = new Stripe(process.env.STRIPE_SK!);
        const subscription = await stripe.subscriptions.retrieve(subId);

        return new Response(JSON.stringify(subscription), { status: 200 });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return new Response('Failed to fetch subscription', { status: 500 });
    }
}
