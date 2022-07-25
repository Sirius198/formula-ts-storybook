import React, { useState, Fragment } from 'react';
import EqVariable from '../EqVariable';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';

interface EqFnTextProps {
    paramName?: string;
    paramOptional?: string;
    onRemove?: () => void;
}

export const EqFnText = ({ paramName = 'TEXT', paramOptional = 'false', onRemove }: EqFnTextProps) => {
    return (
        <span className="pl-3 bg-fuchsia-200 rounded-full inline-block mx-1">
            {paramOptional === 'true' ?
                <span className="relative">
                    <label className='text-xs'>{paramName}</label>
                    <label className='absolute text-[0.45rem] bottom-[-0.9rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>optional</label>
                </span>
                :
                <span className='text-xs'>{paramName}</span>
            }
            <EqVariable type='text' className='border-r-0 ml-2' />
            {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />}
        </span>
    );
};

export default EqFnText;
