import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';
import { FunctionParameter } from '../../../utils/function';

interface EqFnInputParamProps {
    param: FunctionParameter
}

export const EqFnInputParam = ({ param }: EqFnInputParamProps) => {

    // const [isChecked, setChecked] = useState(defaultvalue == true);
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (param.default)
            setDisplayValue(param.default.toString());
    }, [param]);

    return (
        <span className="p-0.5 pl-3 pr-1.5 bg-white rounded-full inline-block mr-1 ml-2 my-[3px] align-item-center leading-[17px]">
            <input type={'text'} className="text-xs m-0.5 outline-0 hover:outline-0 w-16" value={displayValue} onChange={e => setDisplayValue(e.target.value)} />
        </span>
    );
};

export default EqFnInputParam;