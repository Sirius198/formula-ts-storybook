import { Popover } from '@headlessui/react';
import React, { useState, Fragment } from 'react';
import { ReactComponent as HierarchySvg } from '../assets/icons/main-btn-1.svg';
import { ReactComponent as PlusMinusSvg } from '../assets/icons/main-btn-3.svg';
import { ReactComponent as SwitchSmSvg } from '../assets/icons/main-btn-2.svg';
import { ReactComponent as FuncSvg } from '../assets/icons/fx.svg';
import { ClassNames } from '@emotion/react';

interface EqToolbarProps {
    className?: string;
    onAddExp: () => void;
    onAddSwitchCase: () => void;
    onAddIfThenElse: () => void;
    onAddFunction: () => void;
}

// Toolbar with buttons that create formulas
export const EqToolbar = ({
    className = '',
    onAddExp,
    onAddSwitchCase,
    onAddIfThenElse,
    onAddFunction
}: EqToolbarProps) => {
    return (
        <div className={`inline-block p-3 bg-white rounded-full ${className}`}>
            <Popover className="relative block">
                <Popover.Button>
                    <button className="w-10 h-10 bg-teal-500 rounded-full active:outline-0">
                        <HierarchySvg className='text-white w-4 h-4 mt-0 fill-white inline' />
                    </button>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 left-[150%] top-0">
                    {({ close }) => (

                        <div className="bg-white p-1.5 rounded-full shadow-lg flex">
                            <button className="w-8 h-8 bg-teal-500 rounded-full" onClick={() => { close(); onAddIfThenElse(); }}>
                                <HierarchySvg className='text-white w-4 h-4 mt-0.5 fill-white inline' />
                            </button>

                            <button className="w-8 h-8 bg-teal-500 rounded-full" onClick={() => { close(); onAddSwitchCase(); }}>
                                <SwitchSmSvg className='text-white w-4 h-4 mt-0.5 fill-white inline' />
                            </button>
                        </div>
                    )}
                </Popover.Panel>
            </Popover>

            <button className="w-10 h-10 bg-violet-400 rounded-full block my-1" onClick={() => onAddExp()}>
                <PlusMinusSvg className='text-white w-4 h-4 mt-0.5 fill-white inline' />
            </button>

            <button className="w-10 h-10 bg-zinc-500 rounded-full block my-1 mx-0" onClick={() => onAddFunction()}>
                <FuncSvg className='text-white w-4 h-4 mt-0.5 fill-white inline' />
            </button>
        </div>
    );
};

export default EqToolbar;