import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
import { TrashIcon, PlusIcon } from '@heroicons/react/solid';
import ComparisionOperator from '../base/operator/ComparisionOperator';
import { ReactComponent as Trash0Icon } from '../assets/icons/trash0.svg';
import EqVariable from '../base/EqVariable';
import { FormulaContainer } from '../base/FormulaContainer';

interface EqCaseProps {
    onRemove: (index: number) => void;
    index: number;
}

const EqCase = ({ onRemove, index }: EqCaseProps) => {

    return (
        <div className='p-2 border-b-[1px] border-b-zinc-200'>
            <span className='mx-1 text-zinc-700 text-xs'>IF</span>
            <EqVariable />
            <ComparisionOperator />
            <EqVariable />
            <span className='mr-2 text-zinc-700 text-xs'>THEN</span>
            <EqVariable type='text' />

            <button onClick={() => onRemove(index)} className='text-zinc-700 hover:text-zinc-400 h-full mx-2'>
                <Trash0Icon className='mt-1.5' />
            </button>
        </div>
    )
};

interface EqSwitchCaseProps { }

export const EqSwitchCase = ({ }: EqSwitchCaseProps) => {

    // Set cases at State
    const [cases, setCases] = useState(['a', 'b']);

    const addCase = () => {
        setCases([...cases, '']);
    };

    const removeCase = (index: number) => {
        setCases([
            ...cases.slice(0, index),
            ...cases.slice(index + 1, cases.length)
        ]);
    };

    return (
        <FormulaContainer name={'title'} color='gray' backgroundColor='bg-white'>
            <div className='inline-block bg-whie'>
                {cases.map((ec, index) => (
                    <EqCase onRemove={removeCase} key={index} index={index} />
                ))}

                <button className='block w-full p-2 border-b-[1px] border-b-zinc-200 text-zinc-700 hover:bg-stone-100 text-sm' onClick={addCase}>
                    <PlusIcon className='w-4 h-4 text-zinc-700 mt-[2px] mr-1.5' /> Add Case
                </button>

                <div className='p-2'>
                    <span className='mr-1 text-xs'>ELSE</span>
                    <EqVariable type='text' />
                </div>
            </div>
        </FormulaContainer>
    );
};
