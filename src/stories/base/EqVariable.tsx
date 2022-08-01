import React, { useState, Fragment, useRef, KeyboardEvent, useEffect, RefObject } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/solid';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ReactComponent as EnterCustomNumberSvg } from '../assets/icons/enter-custom-data.svg';
import { ReactComponent as EnterCustomTextSvg } from '../assets/icons/enter-custom-text.svg';
import { ReactComponent as EnterCustomArraySvg } from '../assets/icons/enter-custom-text.svg';
import { ReactComponent as EnterCustomDateSvg } from '../assets/icons/enter-date.svg';
import { ReactComponent as MyZoomIcon } from '../assets/icons/zoom.svg';
import { ReactComponent as NumberColumnSvg } from '../assets/icons/number-column.svg';
import { ReactComponent as TextColumnSvg } from '../assets/icons/text-column0.svg';
import { ReactComponent as DateColumnSvg } from '../assets/icons/date-column.svg';
import { ReactComponent as ArrayColumnSvg } from '../assets/icons/text-column0.svg';
import { ReactComponent as AtSvg } from '../assets/icons/at.svg';
import { ReactComponent as FxSvg } from '../assets/icons/fx.svg';
import { ReactComponent as CaretSvg } from '../assets/icons/caret.svg';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { Dropdown, Modal, UseDropdownMenuMetadata } from '@restart/ui';
import { ColumnType, fnItems, FunctionParameter, FunctionType, testVariableValidation } from '../../utils/function';

interface EqVariableProps {
    type?: string;
    className?: string;
    values?: string[] | number[];
    numberfrom?: number;
    numberend?: number;
    defaultnumber?: number | string;
    hidecol?: boolean;
    updateSuffixText?: (x: string) => void;
    param?: FunctionParameter;
    dependentParam?: string;
    onChange?: (v: string) => void;
}

const borderColors = {
    'Number': 'border-blue-200',
    'String': 'border-fuchsia-200',
    'Date': 'border-orange-200',
    'Array': 'border-teal-200',
    'All': 'border-gray-100',
    'File': 'border-lime-200',
    'Boolean': 'border-amber-200',
};
const fakeColumns: ColumnType[] = [
    { name: 'Homework', type: 'Number', icon: 'Number' },
    { name: 'Participation', type: 'Number', icon: 'Number' },
    { name: 'Midterm Exam', type: 'Number', icon: 'Number' },
    { name: 'Final Exam', type: 'Number', icon: 'Number' },
    { name: 'Email', type: 'String', icon: 'Email' },
    { name: 'Gender', type: 'String', icon: 'String' },
    { name: 'Name', type: 'String', icon: 'String' },
    { name: 'Exam Date', type: 'Date', icon: 'Date' },
    { name: 'Start Date', type: 'Date', icon: 'Date' },
    { name: 'End Date', type: 'Date', icon: 'Date' },
    { name: 'Image', type: 'File', icon: 'File' },
    { name: 'Avatar', type: 'File', icon: 'File' },
    { name: 'Approved', type: 'Boolean', icon: 'Boolean' },
    { name: 'Disabled', type: 'Boolean', icon: 'Boolean' },
    { name: 'Active', type: 'Boolean', icon: 'Boolean' },
];

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
    type = 'Number',
    className,
    numberfrom,
    numberend,
    defaultnumber,
    values,
    hidecol,
    param,
    updateSuffixText,
    dependentParam,
    onChange
}: EqVariableProps) => {

    const [searchString, setSearchString] = useState<string>('');
    const [editing, setEditing] = useState<boolean>(false);
    const [displayValue, setDisplayValue] = useState<string>(defaultnumber != undefined ? defaultnumber.toString() : fakeColumns[0].name);
    const [editingValue, setEditingValue] = useState<string>('');
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState<boolean>(false);
    const [dateVal, setDateVal] = useState<Date>(new Date());
    const [timeVal, setTimeVal] = useState<Date>(new Date());
    const [inputKeyError, setInputKeyError] = useState<boolean>(false);
    const inputEl = useRef<HTMLInputElement>(null);
    const inputOnlyEl = useRef<HTMLInputElement>(null);
    const [columns, setColumns] = useState(hidecol == true ? [] : fakeColumns);
    const [columnsForDisplay, setColumnsForDisplay] = useState<string[]>([]);
    const [fnCols, setFunctionColumns] = useState<FunctionType[]>([]);
    const [isSimpleDropdown, setIsSimpleDropdown] = useState(false);
    const [enableCustomInput, setEnableCustomInput] = useState(true);
    const [onlyInputValue, setOnlyInputValue] = useState('');
    const [suffixTextToUpdate, setSuffixTextToUpdate] = useState('');

    const clicked = ClickAwayListener(inputEl);
    useEffect(() => {
        clicked && finishEditing()
    }, [clicked]);

    // if (dependentParam) {
    //     useEffect(() => {
    //         var t: ColumnType[] = [];
    //         var unit_list: String[] = param?.categoryDropdown[dependentParam];
    //         for (var i = 0; i < unit_list.length; i++)
    //             t.push({ name: unit_list[i].toString(), type: 'String', icon: 'String' });
    //         setColumns(t);
    //         setDisplayValue(unit_list[0] as string);
    //         setIsSimpleDropdown(true);
    //     }, [dependentParam]);
    // }

    const isNumeric = type == 'Number';
    const isText = type == 'String';
    const isDate = type == 'Date';
    const isArray = type == 'Array';
    const isAll = type == 'All';
    const isBoolean = type == 'Boolean';

    useEffect(() => {
        onChange && onChange(displayValue);
    }, [displayValue]);

    useEffect(() => {

        // setDisplayValue(defaultnumber != undefined ? defaultnumber.toString() : fakeColumns[0].name);
        if (defaultnumber != undefined)
            setDisplayValue(defaultnumber.toString());
        else {
            for (var i = 0; i < fakeColumns.length; i++) {
                if (fakeColumns[i].type == type) {
                    setDisplayValue(fakeColumns[i].name);
                    break;
                }
            }
        }
        setColumns(hidecol == true ? [] : fakeColumns);
        setFunctionColumns([]);
        setIsSimpleDropdown(false);
        setColumnsForDisplay([]);
        setEnableCustomInput(true);

        // Make dropdown items
        if (param?.columns != undefined) {
            setColumns(param.columns);
            setDisplayValue(param.columns[0].name);
            setIsSimpleDropdown(true);
        }
        else if (isNumeric) {
            if (numberfrom != undefined && numberend != undefined) {
                var t: ColumnType[] = [];
                for (var i = numberfrom; i <= numberend; i++)
                    t.push({ name: i.toString(), type: 'Number', icon: "Number" });
                setColumns(t);
                if (!defaultnumber) setDisplayValue(t[0].name);
                setIsSimpleDropdown(true);
            }
            else if (values != undefined) {
                var t: ColumnType[] = [];
                for (var i = 0; i < values.length; i++)
                    t.push({ name: values[i].toString(), type: 'Number', icon: 'Number' });
                setColumns(t);
                if (!defaultnumber) setDisplayValue(t[0].name);
                setIsSimpleDropdown(true);
            }
        }
        else if (isText) {
            if (values != undefined) {
                var t: ColumnType[] = [];
                for (var i = 0; i < values.length; i++)
                    t.push({ name: values[i].toString(), type: 'String', icon: 'String' });
                setColumns(t);
                setDisplayValue(values[0] as string);
                if (!defaultnumber) setDisplayValue(t[0].name);
                setIsSimpleDropdown(true);
            }
        }

        // Make function columns
        if (param?.functions != undefined) {
            var tt = [];
            for (var i = 0; i < param.functions.length; i++) {
                const sf = fnItems.find(value => param.functions && value.id == param.functions[i].func_id);
                if (sf != undefined) {
                    tt.push({ func_id: param.functions[i].func_id, func_name: sf.name });
                }
            }
            setDisplayValue(tt[0].func_name);
            setIsSimpleDropdown(true);
            setFunctionColumns(tt);
        }

        // Make columns for display
        if (param?.values_for_display)
            setColumnsForDisplay(param.values_for_display);

        // Custom Input
        if (param?.customInput == false)
            setEnableCustomInput(false);
    }, [param, hidecol, defaultnumber]);

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
        if (editingValue != '') {

            if (param?.validate == undefined || testVariableValidation(Number(editingValue), param.validate)) {
                setDisplayValue(editingValue);
                if (updateSuffixText) {
                    updateSuffixText(suffixTextToUpdate);
                    setSuffixTextToUpdate('');
                }
            }
        }
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

    const onClickDropdownColumn = (col: ColumnType) => {
        if (col.action == 'edit') {
            onEnterCustomNumber();
        }
        else
            setDisplayValue(col.name);

        if (updateSuffixText) {
            updateSuffixText('');
            if (col.suffix != undefined)
                // updateSuffixText(col.suffix);
                setSuffixTextToUpdate(col.suffix);
            else
                // updateSuffixText('');
                setSuffixTextToUpdate('');
        }
    };

    const onOnlyInputKeyDown = () => {
        if (onlyInputValue != '') {
            if (param?.validate == undefined || testVariableValidation(Number(onlyInputValue), param.validate))
                setDisplayValue(onlyInputValue);
            setOnlyInputValue('');
        }
    };

    const columnFilter = (col_type: string): boolean => {
        if (col_type == type)
            return true;
        if (type == 'All') {
            if (col_type == 'File')
                return false;
            if (param?.supportedColumnTypes == undefined)
                return true;
            else {
                if (param.supportedColumnTypes.findIndex(sct => sct == col_type) != -1)
                    return true;
            }
        }
        return false;
    }

    let tt = className + ' inline-block relative rounded-full bg-white text-xs px-2 py-1 pr-8 border-3 ';
    if (param?.borderColor)
        tt += param.borderColor;
    else
        tt += borderColors[type as keyof typeof borderColors];
    let normalStateStyle = tt;
    tt += ' mr-1';

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
            {!editing &&
                <span className="relative inline-block mr-1">
                    <Dropdown>
                        <Dropdown.Toggle>
                            {(props) => (
                                <button {...props} className={normalStateStyle}>
                                    <span className='text-zinc-700'>{displayValue}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <CaretSvg
                                            className="h-2 w-2 text-gray-400"
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
                                    className="absolute z-10 top-8 left-3.5 bg-white shadow-lg w-[max-content] max-w-100 text-left"
                                    style={{
                                        transition: "visibility 500ms, opacity 500ms",
                                        visibility: meta.show ? "visible" : "hidden",
                                        opacity: meta.show ? "1" : "0",
                                    }}
                                >
                                    {param?.onlyInput != undefined ?
                                        <>
                                            {/* Like Find function */}
                                            <li className='px-4 py-2'>
                                                <input
                                                    type={'text'}
                                                    className="hover:outline-0 outline-0 text-xs"
                                                    placeholder='Enter custom text...'
                                                    onChange={(e) => setOnlyInputValue(e.target.value)}
                                                    value={onlyInputValue}

                                                />
                                                <Dropdown.Item className='p-1 bg-stone-200 rounded-full w-6 h-6' ref={inputOnlyEl} onClick={onOnlyInputKeyDown}>
                                                    <CheckIcon className='w-4 h-4 fill-teal-700 mt-01 hover:bg-stone-200' />
                                                </Dropdown.Item>
                                            </li>
                                        </>
                                        :
                                        <>
                                            {(!isSimpleDropdown && param?.showFilter != false) && <>
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
                                            </>}

                                            {fnCols.length > 0 && <>
                                                {fnCols.map((value, index) => (
                                                    <li key={index} className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs'>
                                                        <Dropdown.Item className='w-full text-left' onClick={() => setDisplayValue(value.func_name!)}>
                                                            <FxSvg className='w-6 h-6 mr-2 bg-stone-700 rounded-full p-1 fill-white' />
                                                            {index + 1} ({value.func_name})
                                                        </Dropdown.Item>
                                                    </li>
                                                ))}
                                            </>}

                                            {/* Show normal dropdown menu */}
                                            {searchString == '' && <>

                                                {/* Other */}
                                                {(!isSimpleDropdown && (enableCustomInput || fnCols.length > 0)) && <li className='pl-4 py-1 text-xs text-zinc-400'>Other</li>}

                                                {(isNumeric && values == undefined && !isSimpleDropdown && enableCustomInput) && <>
                                                    <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { onEnterCustomNumber(); }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomNumberSvg className='w-6 h-6 mr-2 bg-blue-200 rounded-full p-1' />Enter Custom Number
                                                        </Dropdown.Item>
                                                    </li>
                                                </>}

                                                {(isText && values == undefined && !isSimpleDropdown && enableCustomInput) && <>
                                                    <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { onEnterCustomNumber(); }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomTextSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />Enter Custom Text
                                                        </Dropdown.Item>
                                                    </li>
                                                </>}

                                                {(isAll && values == undefined && !isSimpleDropdown && enableCustomInput) && <>
                                                    <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { onEnterCustomNumber(); }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomTextSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />Enter Custom Value
                                                        </Dropdown.Item>
                                                    </li>
                                                </>}

                                                {/* Custom Array */}
                                                {(isArray && enableCustomInput) && <>
                                                    <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { onEnterCustomNumber(); }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomArraySvg className='w-6 h-6 mr-2 bg-teal-200 rounded-full p-1' />Enter Custom Text
                                                        </Dropdown.Item>
                                                    </li>
                                                </>}

                                                {(isDate && enableCustomInput) && <>
                                                    <li
                                                        className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { setIsDatePickerModalOpen(true); }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomDateSvg className='w-6 h-6 mr-2 bg-orange-200 rounded-full p-1' />Select Date
                                                        </Dropdown.Item>
                                                    </li>
                                                </>}

                                                {/* Boolean custom value */}
                                                {/* {(isBoolean && values == undefined && !isSimpleDropdown && enableCustomInput) && <>
                                                    <li className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer'
                                                        onClick={() => { }}
                                                    >
                                                        <Dropdown.Item className='w-full text-left'>
                                                            <EnterCustomNumberSvg className='w-6 h-6 mr-2 bg-amber-200 rounded-full p-1' />Enter Custom Value
                                                        </Dropdown.Item>
                                                    </li>
                                                </>} */}

                                                {/* {fnCols.length > 0 && <>
                                                    <li
                                                        className='relative px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs leading-6 hover:cursor-pointer eqv-fn'
                                                    // onClick={() => { setIsDatePickerModalOpen(true); }}
                                                    >
                                                        <div className='w-full text-left'>
                                                            <FxSvg className='w-6 h-6 mr-2 bg-stone-700 rounded-full p-1 fill-white' />Functions
                                                            <ChevronRightIcon className='absolute right-2 w-4 h-4 top-3' />
                                                        </div>

                                                        <ul className='eqv-fn-sb absolute bg-white right-0 top-0'>
                                                            {fnCols.map((value, index) => (
                                                                <li key={index} className='px-4 py-2 hover:bg-teal-50 border-b-[1px] border-b-zinc-200 text-xs'>
                                                                    <Dropdown.Item className='w-full text-left' onClick={() => setDisplayValue(value.func_name!)}>
                                                                        <FxSvg className='w-6 h-6 mr-2 bg-stone-700 rounded-full p-1 fill-white' />
                                                                        {index + 1} ({value.func_name})
                                                                    </Dropdown.Item>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                </>} */}

                                                {/* Columns */}
                                                {columns.filter(col => columnFilter(col.type)).map((value, index) => (
                                                    <li
                                                        key={index}
                                                        className='hover:bg-teal-50 text-xs leading-6 hover:cursor-pointer min-w-[100px]'
                                                        onClick={() => onClickDropdownColumn(value)}
                                                    >
                                                        <Dropdown.Item className='px-4 py-2 w-full text-left'>
                                                            {!isSimpleDropdown &&
                                                                <>
                                                                    {value.icon == "Number" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-blue-200 rounded-full p-1' />}
                                                                    {value.icon == "String" && <TextColumnSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />}
                                                                    {value.icon == "Date" && <DateColumnSvg className='w-6 h-6 mr-2 bg-orange-200 rounded-full p-1' />}
                                                                    {value.icon == "Array" && <ArrayColumnSvg className='w-6 h-6 mr-2 bg-teal-200 rounded-full p-1' />}
                                                                    {value.icon == "Email" && <AtSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />}
                                                                    {value.icon == "File" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-lime-200 rounded-full p-1' />}
                                                                    {value.icon == "Boolean" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-amber-200 rounded-full p-1' />}
                                                                </>
                                                            }
                                                            {columnsForDisplay.length > 0 ? columnsForDisplay[index] : value.name}
                                                            {/* {value.name} */}
                                                        </Dropdown.Item>
                                                    </li>
                                                ))}

                                            </>}

                                            {/* Show filtered columns */}
                                            {searchString != '' && <>
                                                {columns
                                                    .filter(col => col.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1 && columnFilter(col.type))
                                                    .map((value, index) => (
                                                        <li
                                                            key={index}
                                                            className='px-4 py-2 hover:bg-teal-50 text-xs leading-6 hover:cursor-pointer'
                                                            onClick={() => onClickDropdownColumn(value)}
                                                        >
                                                            <Dropdown.Item className='w-full text-left'>
                                                                {!isSimpleDropdown && <>
                                                                    {value.icon == "Number" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-blue-200 rounded-full p-1' />}
                                                                    {value.icon == "String" && <TextColumnSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />}
                                                                    {value.icon == "Date" && <DateColumnSvg className='w-6 h-6 mr-2 bg-orange-200 rounded-full p-1' />}
                                                                    {value.icon == "Array" && <ArrayColumnSvg className='w-6 h-6 mr-2 bg-teal-200 rounded-full p-1' />}
                                                                    {value.icon == "Email" && <AtSvg className='w-6 h-6 mr-2 bg-fuchsia-200 rounded-full p-1' />}
                                                                    {value.icon == "File" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-lime-200 rounded-full p-1' />}
                                                                    {value.icon == "Boolean" && <NumberColumnSvg className='w-6 h-6 mr-2 bg-amber-200 rounded-full p-1' />}
                                                                </>}
                                                                {value.name}
                                                            </Dropdown.Item>
                                                        </li>
                                                    ))}
                                                {fnCols.filter(col => col.func_name?.toLowerCase().indexOf(searchString.toLowerCase()) != -1).map((value, index) => (
                                                    <li
                                                        key={index}
                                                        className='px-4 py-2 hover:bg-teal-50 text-xs leading-6 hover:cursor-pointer'
                                                    >
                                                        <Dropdown.Item className='w-full text-left' onClick={() => setDisplayValue(value.func_name!)}>
                                                            <FxSvg className='w-6 h-6 mr-2 bg-stone-700 rounded-full p-1 fill-white' />
                                                            {value.func_name}
                                                        </Dropdown.Item>
                                                    </li>
                                                ))}
                                            </>}
                                        </>
                                    }

                                </ul>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </span>
            }

            {/* If it is a date variable, it appends date & time selection modal */}
            {isDate &&
                <Modal
                    show={isDatePickerModalOpen}
                    aria-labelledby="modal-1-label"
                    onHide={() => setIsDatePickerModalOpen(false)}
                    renderBackdrop={(props) => (
                        <div
                            {...props}
                            className="fixed inset-0 bg-black/30 z-[300]"
                        />
                    )}
                    className="fixed z-[301] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg p-5 min-w-[800px]"
                >
                    <div>
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
                    </div>
                </Modal>
            }
        </>
    );
};

export default EqVariable;
