import { Popover } from '@headlessui/react';
import React, { useState, Fragment } from 'react';
import { ReactComponent as HierarchySvg } from '../assets/icons/main-btn-1.svg';
import { ReactComponent as PlusMinusSvg } from '../assets/icons/main-btn-3.svg';
import { ReactComponent as SwitchSmSvg } from '../assets/icons/main-btn-2.svg';
import { ReactComponent as FuncSvg } from '../assets/icons/fx.svg';

interface EqToolbarProps { }

// Toolbar with buttons that create formulas
export const EqToolbar = ({ }: EqToolbarProps) => {
    return (
        <div className="inline-block p-3 bg-white rounded-full">
            <Popover className="relative block">
                <Popover.Button>
                    <button className="w-10 h-10 bg-teal-500 rounded-full">
                        <HierarchySvg className='text-white w-4 h-4 mt-0.5 fill-white' />
                    </button>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 left-[150%] top-0">
                    <div className="bg-white p-1.5 rounded-full shadow-lg flex">
                        <button className="w-8 h-8 bg-teal-500 rounded-full">
                            <HierarchySvg className='text-white w-4 h-4 mt-0.5 fill-white' />
                        </button>

                        <button className="w-8 h-8 bg-teal-500 rounded-full">
                            <SwitchSmSvg className='text-white w-4 h-4 mt-0.5 fill-white' />
                        </button>
                    </div>
                </Popover.Panel>
            </Popover>

            <button className="w-10 h-10 bg-violet-400 rounded-full block my-1">
                <PlusMinusSvg className='text-white w-4 h-4 mt-0.5 fill-white' />
            </button>

            <button className="w-10 h-10 bg-zinc-500 rounded-full block my-1 mx-0">
                <FuncSvg className='text-white w-4 h-4 mt-0.5 fill-white' />
            </button>
        </div>
    );
};

export default EqToolbar;