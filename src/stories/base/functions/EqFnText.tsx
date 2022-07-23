import React, { useState, Fragment } from 'react';
import EqVariable from '../EqVariable';

interface EqFnTextProps {
    paramName?: string;
}

export const EqFnText = ({ paramName = 'TEXT' }: EqFnTextProps) => {

    return (
        <span className="pl-3 bg-fuchsia-200 rounded-full inline-block mx-1">
            <span className='mr-2 text-xs'>{paramName}</span>

            <EqVariable type='text' className='border-r-0' />
        </span>
    );
};

export default EqFnText;
