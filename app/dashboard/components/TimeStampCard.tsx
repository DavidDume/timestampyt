import React from 'react';
import Image from 'next/image';
import { VideoInfo } from '@/lib/types/VideoInfo';
import { FaRegCopy } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TimeStampCardProps = {
    video: VideoInfo;
    timestamps: string | null;
    setTimestamps: (value: string) => void | null;
};

const TimeStampCard: React.FC<TimeStampCardProps> = ({
    video,
    timestamps,
    setTimestamps,
}) => {
    const copyToClipboard = async () => {
        if (timestamps) {
            try {
                await navigator.clipboard.writeText(timestamps);
                console.log('Copied to clipboard');
                toast.success('Copied to clipboard', {
                    autoClose: 800,
                });
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <>
            <ToastContainer hideProgressBar />
            <div className="flex gap-2 justify-center py-2 my-2">
                <div className="">
                    <h1 className="break-words w-[400px] pb-2">
                        {video.title}
                    </h1>
                    <Image
                        src={video.thumbnail}
                        alt={'Thumbnail'}
                        className="object-cover"
                        width={400}
                        height={400}
                    />
                </div>
                <div className="flex flex-col bg-[#111827] rounded-xl">
                    <div
                        className="flex items-center gap-2 justify-end p-2 cursor-pointer"
                        onClick={copyToClipboard}
                    >
                        Copy <FaRegCopy />
                    </div>
                    <textarea
                        name="timestamps"
                        className="h-full bg-transparent outline-none resize-none p-2"
                        value={timestamps || ''}
                        cols={50}
                        onChange={(e) => setTimestamps(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </>
    );
};

export default TimeStampCard;
