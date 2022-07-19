import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon, XIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react'
import ComparisionOperator from '../base/operator/ComparisionOperator';
import { ReactComponent as Trash0Icon } from '../assets/icons/trash0.svg';
import EqVariable from '../base/EqVariable';
import { Formula } from '../base/Formula';
import { FormulaContainer } from '../base/FormulaContainer';

// ANY/ALL condition
const CondDropdown = () => {

    const conds = ['ANY', 'ALL'];
    const [selected, setSelected] = useState(conds[0]);

    return (
        <span className='mr-1 inline-block'>
            <Listbox value={selected} onChange={setSelected}>
                <span className="relative">
                    <Listbox.Button className={`relative cursor-default hover:cursor-pointer p-1 pr-6 text-xs rounded-full leading-2`}>
                        <span className="text-zinc-700">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-[max-content]">
                            {conds.map((value, index) => (
                                <Listbox.Option key={index} value={value} className='px-4 py-2 hover:bg-teal-50 text-zinc-700 text-xs text-left'>
                                    {value}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </span>
            </Listbox>
        </span>
    );
};

interface EqIfProps {
    isFirst?: boolean;
    isLast?: boolean;
    st_index: number;
    addSentence: React.MouseEventHandler<HTMLButtonElement>;
    removeSentence: (id: number) => void;
}

const EqIf = ({ isFirst = false, isLast = false, addSentence, removeSentence, st_index }: EqIfProps) => {

    const [conditions, setConditions] = useState(['', '']);
    const ifType = isFirst ? 'IF' : (isLast ? 'ELSE' : 'ELSE IF');
    const topLineStyle = isFirst ? 'left-[50%] w-1/2' : (isLast ? 'left-0 w-1/2' : 'left-0 w-full');

    const addCondition = () => {
        setConditions([...conditions, '']);
    };

    const removeCondition = (index: number) => {
        setConditions([
            ...conditions.slice(0, index),
            ...conditions.slice(index + 1, conditions.length)
        ])
    };

    const dropMe = () => {
        if (!isFirst && !isLast)
            removeSentence(st_index);
    };

    return (
        <div className={`relative px-4 h-[fit-content] ${!isLast ? 'min-w-[350px]' : 'min-w-[100px]'}`}>
            <div className={`absolute top-2.5 ${topLineStyle} h-0.5 bg-zinc-500 z-1`}></div>
            <div className='absolute left-[50%] top-1 bottom-0 w-0.5 bg-zinc-500'></div>

            {/* Shows plus button if it is a first if_case */}
            {isFirst &&
                <button className='absolute bg-cyan-300 rounded-full w-5 h-5 right-0' onClick={addSentence}>
                    <PlusIcon className='w-4 h-4 mt-[2px]' />
                </button>
            }

            <div className='text-center'>
                <button className='bg-emerald-500 mb-5 mx-auto rounded-full px-2.5 relative text-white text-[13px]' onClick={dropMe}>
                    <span>{ifType}</span>
                    {!isFirst && !isLast && <XIcon className='w-3 h-3 mt-1 ml-1.5' />}
                </button>
            </div>

            {/* If it is not last element, show cases */}
            {!isLast && <>
                <div className='rounded-[20px] bg-stone-300 p-1 relative'>
                    <div className='p-2.5 text-sm text-zinc-700'><CondDropdown /> of the following conditions are met</div>

                    <div className='bg-white rounded-[20px]'>
                        {conditions.map((value, index) => (
                            <div className='border-b-[1px] border-b-stone-200 p-2' key={index}>
                                <EqVariable type='numeric' />
                                <ComparisionOperator />
                                <EqVariable />

                                {(index != 0 || conditions.length != 1) && <button onClick={() => removeCondition(index)} className='text-zinc-700 hover:text-zinc-400 h-full mx-2'>
                                    <Trash0Icon className='mt-1.5' />
                                </button>}
                            </div>
                        ))}

                        <button className='block w-full p-2 text-sm text-zinc-700 hover:bg-gray-100 rounded-b-[20px]' onClick={addCondition}>
                            <PlusIcon className='w-3 h-3 mt-1' /> Add Condition
                        </button>
                    </div>
                </div>

                <div className='text-center relative mt-5 text-[13px]'>
                    <span className='rounded-full bg-emerald-500 px-2 py-1 text-white'>THEN</span>
                </div>

            </>}

            <div className='text-center relative mt-5'>
                <EqVariable type='text' />
            </div>
        </div>
    )
};

interface EqIfThenElseProps {
    title?: string
};

export const EqIfThenElse = ({
    title = 'if_then_else#1'
}: EqIfThenElseProps) => {

    const [sentences, setSentences] = useState(['', '']);

    const addSentence = () => {
        setSentences([
            sentences[0],
            '',
            ...sentences.slice(1, sentences.length)
        ]);
    };
    const removeSentence = (index: number) => {
        console.log(index);
        setSentences([
            ...sentences.slice(0, index),
            ...sentences.slice(index + 1, sentences.length)
        ]);
    };

    return (
        <FormulaContainer name={title} color='gray'>
            {sentences.map((value, index) => (
                <EqIf isFirst={index == 0} isLast={index == sentences.length - 1}
                    st_index={index} key={index}
                    addSentence={addSentence} removeSentence={removeSentence} />
            ))}
        </FormulaContainer>
    );
};

export default EqIfThenElse;