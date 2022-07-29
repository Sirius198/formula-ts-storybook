import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon, MinusIcon, XIcon } from '@heroicons/react/solid';
import { ReactComponent as DivideSvg } from '../../assets/icons/operator-divide.svg';
import { ReactComponent as PercentSvg } from '../../assets/icons/operator-percent.svg';
import { Dropdown } from '@restart/ui';

interface ArithmeticOperatorProps {
    op?: string;
}

const OPERATORS = ['+', '-', '*', '/', '%'];

const HeroOperatorIcon = ({ op }: ArithmeticOperatorProps) => {

    const style = 'text-white h-5 w-5 fill-white p-0.5';
    if (op === '+') return <PlusIcon className={style} />
    if (op === '-') return <MinusIcon className={style} />
    if (op === '*') return <XIcon className={style} />
    if (op === '/') return <DivideSvg className={style} />
    if (op === '%') return <PercentSvg className={style} />
    return <>{op}</>;
};

export const ArithmeticOperator = ({ op = '+' }: ArithmeticOperatorProps) => {

    const [operator, setOperator] = useState<string>(op);

    return (
        // <Popover className="relative inline-block mr-1">
        //     <Popover.Button className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 outline-0 rounded-full text-[20px] w-11 h-8 flex pl-1 pt-1.5">
        //         <HeroOperatorIcon op={operator} />
        //         <ChevronDownIcon
        //             className="text-white h-4 w-4 mt-[3px] transition duration-150 ease-in-out group-hover:text-opacity-80"
        //             aria-hidden="true"
        //         /></Popover.Button>

        //     <Popover.Panel className="absolute z-10 bg-white drop-shadow-lg p-3 rounded-full top-10 left-0">
        //         {({ close }) => (
        //             <div className="flex">
        //                 {OPERATORS.map((value, index) => (
        //                     <button key={index} className='bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 outline-0 w-6 h-6 rounded-full pt-[2px]'
        //                         onClick={() => { close(); setOperator(value); }}>
        //                         <HeroOperatorIcon op={value} />
        //                     </button>
        //                 ))}
        //             </div>
        //         )}

        //     </Popover.Panel>
        // </Popover>
        <span>
            <Dropdown>
                <Dropdown.Toggle>
                    {(props) => (
                        <button
                            {...props}
                            className="bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 outline-0 rounded-full text-[20px] w-11 h-8 flex pl-1 pt-1.5"
                        >
                            <HeroOperatorIcon op={operator} />
                            <ChevronDownIcon
                                className="text-white h-4 w-4 mt-[3px] transition duration-150 ease-in-out group-hover:text-opacity-80"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu flip offset={[0, 8]}>
                    {(menuProps, meta) => (
                        <ul
                            {...menuProps}
                            className="absolute z-10 bg-white drop-shadow-lg p-3 rounded-full top-[3.2rem] left-0"
                            style={{
                                transition: "visibility 500ms, opacity 500ms",
                                visibility: meta.show ? "visible" : "hidden",
                                opacity: meta.show ? "1" : "0",
                            }}
                        >
                            {OPERATORS.map((value, index) => (
                                <Dropdown.Item key={index} className='bg-[#A78BFA] hover:bg-[#8B5CF6] text-white border-0 outline-0 w-6 h-6 rounded-full pt-[2px]'
                                    onClick={() => { setOperator(value); }}>
                                    <HeroOperatorIcon op={value} />
                                </Dropdown.Item>
                            ))}
                        </ul>
                    )}
                </Dropdown.Menu>
            </Dropdown >
        </span>
    );
};

export default ArithmeticOperator;
