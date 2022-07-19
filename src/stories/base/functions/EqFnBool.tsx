import React, { useState, Fragment } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react';

interface EqFnBoolProps {
    paramName?: string;
}

export const EqFnBool = ({ paramName = 'BY EACH' }: EqFnBoolProps) => {

    const [isChecked, setChecked] = useState(false);

    return (
        <span className="p-0.5 pl-3 pr-1.5 bg-zinc-300 rounded-full inline-block mx-1">
            <span className='mr-2 text-xs'>{paramName}</span>

            <Switch
                checked={isChecked}
                onChange={setChecked}
                className={`${isChecked ? 'bg-green-700' : 'bg-zinc-700'} relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${isChecked ? 'translate-x-3' : 'translate-x-0'} pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </span>
    );
};

export default EqFnBool;