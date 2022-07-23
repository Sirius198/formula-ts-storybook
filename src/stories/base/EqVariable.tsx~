import React, { useState, Fragment, useRef, KeyboardEvent, useEffect, RefObject } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition, Popover } from '@headlessui/react'
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ReactComponent as EnterCustomNumberSvg } from '../assets/icons/enter-custom-data.svg';
import { ReactComponent as EnterCustomTextSvg } from '../assets/icons/enter-custom-text.svg';
import { ReactComponent as EnterCustomDateSvg } from '../assets/icons/enter-date.svg';
import { ReactComponent as MyZoomIcon } from '../assets/icons/zoom.svg';
import { ReactComponent as NumberColumnSvg } from '../assets/icons/number-column.svg';
import { ReactComponent as TextColumnSvg } from '../assets/icons/text-column0.svg';
import { ReactComponent as DateColumnSvg } from '../assets/icons/date-column.svg';
import { StaticTimePicker } from '@mui/x-date-pickers';

interface EqVariableProps {
    type?: string;
    className?: string;
}

const borderColors = {
    'numeric': 'border-blue-200',
    'text': 'border-fuchsia-200',
    'date': 'border-orange-200',
};
const fakeColumns = ['Homework', 'Participation', 'Midterm Exam', 'Final Exam'];

// When the user input custom number or text, this function receives outside click event and let it finish editing
function ClickAwayListener(inputEl: RefObject<HTMLInputElement>) {
    const [clickedAway, setClickedAway] = useState(false)
    useEffect(() => {
        function handleClickOutside({ target }: MouseEvent) {
            if (inputEl.current && !inputEl.current.contains(target as Node)) {
                setClickedAway(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener('mouseup', () => { setClickedAway(false) })
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return clickedAway;
}
export const EqVariable = ({
    type = 'numeric',
    className
}: EqVariableProps) => {

    const columns = fakeColumns;

    const [searchString, setSearchString] = useState<string>('');
    const [editing, setEditing] = useState<boolean>(false);
    const [displayValue, setDisplayValue] = useState<string>(columns[0]);
    const [editingValue, setEditingValue] = useState<string>('');
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState<boolean>(false);
    const [dateVal, setDateVal] = useState<Date>(new Date());
    const [timeVal, setTimeVal] = useState<Date>(new Date());
    const [inputKeyError, setInputKeyError] = useState<boolean>(false);
    const inputEl = useRef<HTMLInputElement>(null);

    const clicked = ClickAwayListener(inputEl);
    useEffect(() => {
        clicked && finishEditing()
    }, [clicked]);

    const isNumeric = type === 'numeric';
    const isText = type === 'text';
    const isDate = type === 'date';

    // Event handler when user enter custom number
    const onEnterCustomNumber = () => {
        setEditing(true);
        setEditingValue('');
        setTimeout(() => {
            inputEl.current?.select();
        }, 10);
    };

    // Finish editing variable number or text
    const finishEditing = () => {
        setEditing(false);
        if (editingValue != '')
            setDisplayValue(editingValue);
    };

    // Event handler when user enter custom data
    const onInputKeydown = (e: KeyboardEvent) => {

        let regex = /[a-zA-Z]|[^$,\.\d]/;
        if (isNumeric && e.key.length == 1 && regex.test(e.key)) {
            setInputKeyError(true);
            setTimeout(() => {
                setInputKeyError(false);
            }, 500)
            e.preventDefault();
        }
        if (e.key == 'Enter') {
            finishEditing();
        }
    };

    // When the user set data and time value
    const setDateAndTime = () => {
        setIsDatePickerModalOpen(false);
        setDisplayValue(dateVal.getDate() + '/' + dateVal.getMonth() + '/' + dateVal.getFullYear());
    };

    let tt = className + ' inline-block relative rounded-full bg-white text-xs px-2 py-1 pr-8 mr-1 border-3 ';
    tt += borderColors[type as keyof typeof borderColors];

    return (
        <>
            {/* Editing mode */}
            {editing && <>
                <div className={tt}>
                    <span className='invisible min-h-5'>{editingValue == '' ? '1' : editingValue}</span>

                    <input
                        ref={inputEl}
                        type='text'
                        className='border-0 rounded-full focus:outline-0 text-blue absolute top-0 left-2 bottom-0 right-4 min-h-4'
                        value={editingValue}
                        onChange={(e) => { setEditingValue(e.target.value); }}
                        onKeyDown={onInputKeydown}
                    />

                    <Transition
                        show={inputKeyError}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <span className='absolute top-[100%] mt-1 bg-white p-1 w-[max-content]'>
                            Please input number
                        </span>
                    </Transition>
                </div>
            </>}

            {/* Normal mode */}
            {!editing && <Popover className="relative inline-block mr-1">
                <Popover.Button className={tt}>

                    <span className='text-zinc-700'>{displayValue}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Popover.Panel className="absolute z-10 top-8 bg-white shadow-lg w-[max-content] max-w-100 text-left">
                        {({ close }) => (
                            <ul>
                                <li className='px-4 py-2 font-bold text-xs'>Select Data</li>
                                <li className='px-4 py-2 font-bold text-xs border-y-[1px] border-y-zinc-200'>
                                    <MyZoomIcon className='w-3 h-4' />
                                    <input
                                        type='text'
                                        className='outline-0 pl-2 font-light'
                                        placeholder='Search'
                                        value={searchString} onChange={(e) => setSearchString(e.target.value)}
                                    />
                                </li>

                                {/* Show normal dropdown menu */}
                                {searchString == '' && <>

                                    {/* Other */}
                                    <li className='pl-4 py-1 text-xs text-zinc-400'>Other</li>

                                    {isNumeric && <>
                                        <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                            onClick={() => { onEnterCustomNumber(); close(); }}
                                        >
                                            <EnterCustomNumberSvg className='w-6 h-6 mr-2 bg-blue-200 rounded-full p-1' />Enter Custom Number
                                        </li>
                                    </>}

                                    {isText && <>
                                        <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                            onClick={() => { onEnterCustomNumber(); close(); }}
                                        >
                                            <EnterCustomTextSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />Enter Custom Text
                                        </li>
                                    </>}

                                    {isDate && <>
                                        <li
                                            className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                            onClick={() => { setIsDatePickerModalOpen(true); close(); }}
                                        >
                                            <EnterCustomDateSvg className='w-6 h-6 mr-2 bg-orange-200 rounded-full p-1' />Select Date
                                        </li>
                                    </>}

                                    {/* Columns */}
                                    {columns.map((value, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 hover:bg-teal-50 text-xs leading-6 hover:cursor-pointer'
                                            onClick={() => { setDisplayValue(value); close(); }}
                                        >
                                            {isNumeric && <NumberColumnSvg className='w-6 h-6 mr-2 bg-blue-200 rounded-full p-1' />}
                                            {isText && <TextColumnSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />}
                                            {isDate && <DateColumnSvg className='w-6 h-6 mr-2 bg-orange-200 rounded-full p-1' />}
                                            {value}
                                        </li>
                                    ))}

                                </>}

                                {/* Show filtered columns */}
                                {searchString != '' && <>
                                    {columns.filter(col => col.toLocaleLowerCase().indexOf(searchString.toLowerCase()) != -1).map((value, index) => (
                                        <li
                                            key={index}
                                            className='px-4 py-2 hover:bg-teal-50 text-xs leading-6 hover:cursor-pointer'
                                            onClick={() => { setDisplayValue(value); close(); }}
                                        >
                                            {isNumeric && <NumberColumnSvg className='w-5.5 h-5.5 mr-2' />}
                                            {isText && <TextColumnSvg className='w-5.5 h-5.5 mr-2' />}
                                            {isDate && <DateColumnSvg className='w-5.5 h-5.5 mr-2' />}
                                            {value}
                                        </li>
                                    ))}
                                </>}
                            </ul>
                        )}
                    </Popover.Panel>
                </Transition>
            </Popover>}

            {/* If it is a date variable, it appends date & time selection modal */}
            {isDate &&
                <Transition appear show={isDatePickerModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsDatePickerModalOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md min-w-[650px] transform overflow-hidden bg-white p-0 text-left align-middle shadow-xl transition-all">
                                        <div className='grid grid-cols-2'>

                                            {/* DatePicker */}
                                            <div className='border-r-[1px] border-r-zinc-200'>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <StaticDatePicker
                                                        onChange={(v) => setDateVal(v!)}
                                                        value={dateVal}
                                                        displayStaticWrapperAs="desktop"
                                                        renderInput={() => (<></>)}
                                                    />
                                                </LocalizationProvider>
                                            </div>

                                            {/* TimePicker */}
                                            <div className='border-r-[1px] border-r-zinc-200'>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <StaticTimePicker
                                                        onChange={(v: Date | null) => setTimeVal(v!)}
                                                        value={timeVal}
                                                        displayStaticWrapperAs="mobile"
                                                        renderInput={() => (<></>)}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className='p-2 border-t-[1px] border-t-zinc-200 text-right'>
                                            <button onClick={() => setDateAndTime()} className='p-2 bg-teal-700 text-white text-xs rounded-sm'>Set Date & Time</button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            }
        </>
    );
};

export default EqVariable;