import React from 'react';
import Profile from './Profile';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-20">
            <Link href="/">
                <h1 className="text-xl font-bold">TimestampYT</h1>
            </Link>

            <Profile />
        </div>
    );
};

export default Navbar;
