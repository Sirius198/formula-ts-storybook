import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useState, Fragment, useEffect } from 'react';
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

    const [toggleVisible, setToggleVisible] = useState(0);

    useEffect(() => {
        // If this is optional param, set toggleVisible to 1 or -1
        if (param?.toggleVisible)
            setToggleVisible(1);
    }, []);

    const onClickRemoveButton = () => {
        if (toggleVisible == 0) {
            onRemove && onRemove();
        }
        else {
            setToggleVisible(-1);
        }
    };

    if (param.type == "Boolean")
        return (<EqFnBool paramName={param.name} defaultvalue={param.default as boolean} />);

    const bgColor = param.type == "Number" ? "bg-blue-200" :
        param.type == "String" ? "bg-fuchsia-200" :
            param.type == "Date" ? "bg-orange-200" :
                param.type == "Array" ? "bg-teal-200" :
                    param.type == "All" ? "bg-white" : "";

    if (toggleVisible == -1) {
        return (
            <button
                className='bg-[#71717A] w-4 h-4 rounded-full mr-2'
                onClick={() => setToggleVisible(1)}
            >
                <PlusIcon className='w-3 h-3 text-white mt-[2px]' />
            </button>
        )
    }
    return (
        <span className={`pl-3 ${bgColor} rounded-full inline-flex items-center mx-1`}>
            <span className='text-xs'>{param.name}{vary_idx && <>{vary_idx}</>}</span>
            <EqVariable
                type={param.type}
                className='border-r-0 ml-2'
                numberfrom={param.min}
                numberend={param.max}
                defaultnumber={param.default as number}
                values={param.values}
                hidecol={param.hideCol}
                param={param}
            />
            {/* {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />} */}

            {(showRemoveButton || toggleVisible != 0) && <button
                className='bg-[#71717A] w-4 h-4 rounded-full mr-2'
                onClick={onClickRemoveButton}
            >
                <XIcon className='w-3 h-3 text-white mt-[2px]' />
            </button>}
        </span>
    );
};

export default EqFnParam;
