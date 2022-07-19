import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '@heroicons/react/solid';
// import Formula from '../base/Formula';
import ArithmeticOperator from '../base/operator/ArithmeticOperator';
import { EqVariable } from '../base/EqVariable';
import { Formula } from '../base/Formula';
import { FormulaContainer } from '../base/FormulaContainer';

interface EqExpressionProps {
    // Name of formula
    title: string;
}

// This is a normal expression with operators.

export const EqExpression = ({ title = 'midterm_w' }: EqExpressionProps) => {

    const [terms, setTerms] = useState<(string | string[])[]>([
        ['Projects', 'homework_w'], '+', ['0.30', '0.50', '0.25']
    ]);

    const addTerm = () => {
        let v = JSON.parse(JSON.stringify(terms));
        v.push('+');
        v.push(['0.35', '0.65']);
        setTerms(v);
    };

    return (
        <FormulaContainer name={title}>
            <div className='inline-flex items-center'>
                {terms.map((term, index) => {
                    return (typeof term === 'string') ? <ArithmeticOperator key={index} /> : <EqVariable key={index} />
                })}
            </div>

            <button className='absolute -right-2 top-3 bg-[#71717A] w-4 h-4 rounded-full' onClick={addTerm}>
                <PlusIcon className='w-3 h-3 text-white mt-[2px]' />
            </button>
        </FormulaContainer>
    );
};
