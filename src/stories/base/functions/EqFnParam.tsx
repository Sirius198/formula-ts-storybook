import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useState, Fragment } from 'react';
import { FunctionParameter } from '../../../utils/function';
import EqVariable from '../EqVariable';
import EqFnBool from './EqFnBool';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';

interface EqFnParamProps {
    type: string;
    param: FunctionParameter;
    onRemove?: () => void;
    showRemoveButton?: boolean;
    vary_idx?: number;
}

export const EqFnParam = ({ param, onRemove, showRemoveButton, vary_idx }: EqFnParamProps) => {

    if (param.type == "Boolean")
        return (<EqFnBool paramName={param.name} defaultvalue={param.default as boolean} />);

    const bgColor = param.type == "Number" ? "bg-blue-200" :
        param.type == "String" ? "bg-fuchsia-200" :
            param.type == "Date" ? "bg-orange-200" :
                param.type == "Array" ? "bg-teal-200" :
                    param.type == "All" ? "bg-white" : "";
    return (
        <span className={`pl-3 ${bgColor} rounded-full inline-flex items-center mx-1`}>
            <span className='text-xs'>{param.name}{vary_idx && <>{vary_idx}</>}</span>
            <EqVariable type={param.type} className='border-r-0 ml-2' numberfrom={param.min} numberend={param.max} defaultnumber={param.default as number} stringvalues={param.values} hidecol={param.hideCol} />
            {/* {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />} */}

            {showRemoveButton && <button
                className='bg-[#71717A] w-4 h-4 rounded-full mr-2'
                onClick={() => onRemove && onRemove()}
            >
                <XIcon className='w-3 h-3 text-white mt-[2px]' />
            </button>}
        </span>
    );
};

export default EqFnParam;
