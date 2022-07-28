import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';

interface EqFnBoolProps {
    paramName?: string;
    paramOptional?: string;
    onRemove?: () => void;
    defaultvalue?: boolean;
}

export const EqFnBool = ({ paramName = 'BY EACH', paramOptional = '', onRemove, defaultvalue }: EqFnBoolProps) => {

    const [isChecked, setChecked] = useState(defaultvalue == true);

    return (
        <span className="p-0.5 pl-3 pr-1.5 bg-zinc-300 rounded-full inline-block mx-1 align-item-center">
            {/* <span className='mr-2 text-xs'>{paramName}</span> */}
            {paramOptional==='true'?
              <span className="relative">
                  <span className='text-xs align-text-top'>{paramName}</span>
                  <span className='absolute text-[0.5rem] bottom-[-0.85rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>optional</span>                  
              </span> :
              <span className='text-xs align-text-top'>{paramName}</span>
            }

            <Switch
                checked={isChecked}
                onChange={setChecked}
                className={`${isChecked ? 'bg-green-700' : 'bg-zinc-700'}  ml-2 relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${isChecked ? 'translate-x-3' : 'translate-x-0'} pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />}
        </span>
    );
};

export default EqFnBool;