import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Dropdown } from '@restart/ui';

interface ComparisionOperatorProps {
    op?: string;
}

interface ComparisionOp {
    text: string;
    value: string;
}

const COMPARISION_TYPES: ComparisionOp[] = [
    { text: 'Less Than', value: 'LT' },
    { text: 'Less Than or Equals', value: 'LTE' },
    { text: 'Is', value: 'IS' },
    { text: 'Greater Than', value: 'GT' },
    { text: 'Greater Than or Equals', value: 'GTE' },
];

export const ComparisionOperator = ({
    op = 'LT',
}: ComparisionOperatorProps) => {

    const [opValue, setOpValue] = useState(op);

    // Get Operator Text from Value
    const getOpText = (value: string) => {
        const t: ComparisionOp = COMPARISION_TYPES.find((ct) => ct.value == value)!;
        return t.text;
    };

    return (
        <span className='inline-block mr-1'>
            {/* <Listbox value={opValue} onChange={setOpValue}>
                <span className="relative">
                    <Listbox.Button className={`relative cursor-default hover:cursor-pointer bg-white px-2 py-1 pr-10 text-[11px] border-3 border-stone-300 rounded-full leading-2`}>
                        <span className="text-zinc-700">{getOpText(opValue)}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 overflow-auto
                            bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-[max-content]">
                            {COMPARISION_TYPES.map((ct, index) => (
                                <Listbox.Option key={ct.value} value={ct.value} className="px-4 py-2 hover:bg-teal-50 text-zinc-700 text-xs hover:cursor-pointer">
                                    {ct.text}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </span>
            </Listbox> */}
            <Dropdown>
                <Dropdown.Toggle>
                    {(props) => (
                        <button {...props} className={`relative cursor-default hover:cursor-pointer bg-white px-2 py-1 pr-10 text-[11px] border-3 border-stone-300 rounded-full leading-2`}>
                            <span className="text-zinc-700">{getOpText(opValue)}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </button>
                    )}
                </Dropdown.Toggle>
                <Dropdown.Menu flip offset={[0, 8]}>
                    {(menuProps, meta) => (
                        <ul
                            {...menuProps}
                            className="absolute z-10 mt-1 max-h-60 overflow-auto
                            bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-[max-content]"
                            style={{
                                transition: "visibility 500ms, opacity 500ms",
                                visibility: meta.show ? "visible" : "hidden",
                                opacity: meta.show ? "1" : "0",
                            }}
                        >
                            {COMPARISION_TYPES.map((ct, index) => (
                                <li key={ct.value}>
                                    <Dropdown.Item
                                        className="px-4 py-2 hover:bg-teal-50 text-zinc-700 text-xs hover:cursor-pointer w-full text-left"
                                        onClick={() => setOpValue(ct.value)}
                                    >
                                        {ct.text}
                                    </Dropdown.Item>
                                </li>
                            ))}
                        </ul>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </span>
    )
};

export default ComparisionOperator;