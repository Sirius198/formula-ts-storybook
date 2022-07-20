import { PencilIcon, CheckIcon } from '@heroicons/react/solid';
import React from 'react';

interface EqLayoutProps {
    children: React.ReactNode;
}

export const EqLayout = ({ children }: EqLayoutProps) => {
    const fakeColumnNames = ['A', 'B', 'C', 'A', 'B', 'C'];
    return (
        <div>
            <header className="relative">
                <button className='border-[1px] px-4 py-1.5 rounded border-zinc-800 absolute top-2.5 left-2 text-xs text-bold'>Cancel</button>
                <button className='border-[1px] px-4 py-1.5 rounded border-zinc-800 absolute top-2.5 right-2 text-xs text-bold bg-teal-600 border-teal-600 text-white'>Save</button>
                <span className='absolute right-[90px] text-green-600 top-4 text-xs'>Automatically saved <CheckIcon className='w-3 h-3 mt-0.5 inline' /></span>

                <p className='text-zinc-700 text-[13px] font-bold text-center bg-zinc-100 p-4 border-[1px] border-zinc-200'>My Awesome Column Name <PencilIcon className='w-4 h-4 mt-1 inline' /></p>
                <div className='p-2 text-xs text-left bg-white'>Add as many building blocks as you need, use themas variables for other building blocks and then select your final formula</div>
            </header>

            <div className='fixed top-[87px] right-0 w-[120px] bg-white bottom-0'>
                <ul>
                    <li className='p-2 border-b-[1px] border-zinc-200 text-sm'>Column Names</li>

                    {/* Column Names */}
                    {fakeColumnNames.map((value, index) => (
                        <li key={index} className='p-2 border-b-[1px] border-zinc-200 text-xs'>{value}</li>
                    ))}
                </ul>
            </div>

            <div className='mr-[120px] p-5 relative pl-[150px]'>
                {children}
            </div>
        </div>
    )
};