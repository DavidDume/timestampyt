import Profile from '@/components/Profile';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    // any props that come into the component
}

export default function Sidebar({ children }: Props) {
    return (
        <div className="flex h-screen">
            <div className="flex flex-col items-center bg-gray-900 px-4 py-6 text-white">
                <Link className="mb-8 flex items-center" href="/dashboard">
                    <span className="ml-2 text-xl font-bold">TimeStampYT</span>
                </Link>
                <nav className="flex flex-col items-start space-y-4">
                    <Link
                        className="flex items-center space-x-2 hover:text-gray-400"
                        href="/dashboard"
                    >
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        className="flex items-center space-x-2 hover:text-gray-400"
                        href="/dashboard/yourtimestamps"
                    >
                        <span>Your Timestamps</span>
                    </Link>
                </nav>
                <div className="mt-auto flex items-center space-x-4">
                    <Profile />
                </div>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
