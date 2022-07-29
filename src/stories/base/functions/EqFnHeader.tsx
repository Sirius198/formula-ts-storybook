import React, { useState, Fragment } from 'react';
import PropTypes, { string } from 'prop-types';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { ReactComponent as FxSvg } from '../../assets/icons/fx.svg';
import { ReactComponent as MyZoomIcon } from '../../assets/icons/zoom-dark.svg';
import parse from 'html-react-parser';
import { fnItems, fnTree, FunctionItem, FunctionTree } from '../../../utils/function';

interface EqFnDropdownProps {
    cat: FunctionTree;
    onSwitch: (id: number) => void;
}

// Use recursive function to implment tree structure of function category
const EqFnDropdown = ({ cat, onSwitch }: EqFnDropdownProps) => {

    const subItems = fnTree.filter(t => t.parent == cat.id);
    // let leaves: FunctionItem[] = [];

    // Leaves
    if (subItems.length == 0) {
        const leaves = fnItems.filter(t => t.parent === cat.id);
        return (
            <>
                <button className='text-left w-44 border-0'>
                    {cat.name}
                    {leaves.length != 0 && <ChevronRightIcon className='w-4 h-4 mt-1 absolute right-2' />}
                </button>
                {/* Shows buttons which transform function */}
                {leaves.length != 0 &&
                    <ul className='absolute -right-[2px] top-0 min-w-[150px] transition border-2 border-zinc-600 rounded-md bg-zinc-600'>
                        {leaves.map((value, index) => (
                            <li className='relative bg-zinc-600 hover:bg-zinc-700 px-4 py-2 text-[13px]' key={index}>
                                <Listbox.Option value='1' className='text-left w-44 border-0 hover:cursor-pointer' onClick={() => onSwitch(value.id)}>
                                    {value.name} <br /> <label className='text-xs'>{value.desc}</label>
                                </Listbox.Option>
                            </li>
                        ))}
                    </ul>
                }
            </>
        )
    }

    // Used EqFnDropdown component again when it is a subcategory
    return (
        <>
            <button className='text-left w-[max-content] border-0'>
                {cat.name}
                {/* Shows caret when it has submenus */}
                {(subItems.length != 0) &&
                    <><ChevronRightIcon className='w-4 h-4 mt-1 absolute right-2' /></>
                }
            </button>
            {(subItems.length != 0) &&
                <ul className='absolute -right-[2px] top-0 min-w-[150px] transition border-2 border-zinc-600 rounded-md bg-zinc-600'>
                    {subItems.map((value, index) => (
                        <li className='relative bg-zinc-600 hover:bg-zinc-700 px-4 py-2 text-[13px]' key={index}>
                            <EqFnDropdown cat={value} onSwitch={onSwitch} />
                        </li>
                    ))}
                </ul>
            }
        </>
    )
};

interface HighlightSpanProps {
    text: string;
    filter: string;
}

const HighlightSpan = ({ text, filter }: HighlightSpanProps) => {
    const regex = new RegExp(filter, 'gi');
    const index = text.search(regex);
    if (index == -1)
        return <>{text}</>;

    return <>
        {
            parse(
                text.substring(0, index) +
                '<span class="bg-amber-300 text-zinc-700">' + text.substring(index, index + filter.length) + '</span>' +
                text.substring(index + filter.length, text.length)
            )
        }
    </>;
};

interface EqFnHeaderProps {
    name: string;
    onChange: (id: number) => void;
}

// Displays a menu of functions and change formula if you click a function
export const EqFnHeader = ({ name, onChange }: EqFnHeaderProps) => {

    const [searchStr, setSearchStr] = useState<string>('');

    const filterFn = ({ name, desc, duplicate }: FunctionItem) => {
        if (duplicate)
            return false;
        if (name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1 || desc.toLowerCase().indexOf(searchStr.toLowerCase()) != -1)
            return true;
        return false;
    };

    const switchFunc = (fid: number) => {
        onChange(fid);
        setSearchStr('');
    };

    return (
        <Listbox value='1' onChange={() => { }}>
            <span className="relative fxmenu">
                <Listbox.Button className='bg-zinc-600 rounded-full px-2 py-[5px] text-white relative text-sm'>
                    <FxSvg className='w-4 h-4 mr-1 mt-0.5 fill-white' />
                    <span className='text-xs'>{name}</span>
                    <ChevronDownIcon className='w-3 h-3 ml-1 mt-1' />
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-1 w-full border-2 border-zinc-600 rounded-lg bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-[max-content] min-w-[230px]">
                        <li className='bg-zinc-600 px-4 py-2 border-b-[1px] border-b-zinc-700 leading-6'>
                            <MyZoomIcon className='w-4 h-4 mt-1' />
                            <input type='text' value={searchStr} onChange={e => setSearchStr(e.target.value)} className='bg-transparent border-0 outline-0 text-white pl-1' placeholder='Search' />
                        </li>

                        {/* If search string is empty, just show all functions in a tree */}
                        {searchStr == '' && fnTree.filter((t) => t.parent == 0).map((value, index) => (
                            <li key={index} className='relative bg-zinc-600 hover:bg-zinc-700 px-4 py-2 text-white z-10 text-[13px]'>
                                <EqFnDropdown cat={value} onSwitch={switchFunc} />
                            </li>
                        ))}

                        {/* Filter only functions(not category) with name and description  */}
                        {searchStr != '' && fnItems.filter(t => filterFn(t)).map((leaf, index) => (
                            <li key={index} className='bg-zinc-600 hover:bg-zinc-700 px-4 py-2 text-white z-10 text-[13px]'>
                                <Listbox.Option value='1' className='text-left w-[max-content1]' onClick={() => switchFunc(leaf.id)}>
                                    <HighlightSpan text={leaf.name} filter={searchStr} /><br />
                                    <HighlightSpan text={leaf.desc} filter={searchStr} />
                                </Listbox.Option>
                            </li>
                        ))}
                    </Listbox.Options>
                </Transition>
            </span>
        </Listbox>
    );
};

export default EqFnHeader;
