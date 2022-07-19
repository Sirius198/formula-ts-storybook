import React, { useState, Fragment } from 'react';
import EqVariable from '../EqVariable';

interface EqFnDateProps {
    paramName?: string;
}

export const EqFnDate = ({ paramName = 'START DATE' }: EqFnDateProps) => {
    const fakeColumns = ['Exam Date', 'Start Date', 'End Date'];

    return (
        <span className="pl-3 bg-orange-200 rounded-full inline-block mx-1">
            <span className='mr-2 text-xs'>{paramName}</span>

            <EqVariable type='date' className='mr-0 border-r-0' />
        </span>
    );
};

export default EqFnDate;