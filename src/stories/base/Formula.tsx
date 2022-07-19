import React, { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { DotsVerticalIcon, PencilIcon, XIcon } from '@heroicons/react/solid';
import { Popover } from '@headlessui/react';

interface FormulaProps {
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * Button contents
     */
    label: string;
}
/*
    This is all formula container with title and border.
*/
export const Formula = ({
    backgroundColor,
    label
}: FormulaProps) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [displayTitle, setDisplayTitle] = useState<string>(label);
    const [editingText, setEditingText] = useState<string>('');
    const inputEl = useRef<HTMLInputElement>(null);

    // This is outside click listener and finish editing when the user click outside of <input />
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (inputEl.current && !inputEl.current.contains(event.target)) {
                finishEditing();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputEl]);

    const liStyle = 'px-4 py-2 hover:bg-teal-50 hover:cursor-pointer';
    const borderStyle = 'bg-red-100';

    const onRename = (close: any) => {
        setEditing(true);
        setEditingText(displayTitle);
        close();

        setTimeout(() => inputEl.current?.select(), 10);
    };

    const finishEditing = () => {
        setEditing(false);
        if (editingText !== '')
            setDisplayTitle(editingText);
    };

    const onRenameKeydown = (e: KeyboardEvent) => {
        if (e.key == 'Enter')
            finishEditing();
    };

    return (
        <span className={`${borderStyle} relative px-1.5 py-0.5 rounded-t-[5px] text-xs text-zinc-700 inline-block`}>
            <span className={`${editing ? 'invisible' : ''}`}>{!editing ? displayTitle : editingText}</span>
            {editing &&
                <input
                    type='text'
                    ref={inputEl}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={onRenameKeydown}
                    className='absolute top-0 right-0 left-0 bottom-0 bg-transparent pl-1.5 focus:outline-0'
                />
            }

            <Popover className={`relative inline-block ${editing ? 'invisible' : ''}`}>
                <Popover.Button className='focus:outline-0'><DotsVerticalIcon className='w-3 h-3 mt-0.5 ml-2' /></Popover.Button>

                <Popover.Panel className="absolute z-10">
                    {({ close }) => (

                        <div className="bg-white">
                            <ul className='w-[max-content]'>
                                <li className={liStyle} onClick={() => onRename(close)}><XIcon className='w-4 h-4 mr-2' />Rename</li>
                                <li className={liStyle}><XIcon className='w-4 h-4 mr-2' />Unselect as final formula</li>
                                <li className={liStyle}><XIcon className='w-4 h-4 mr-2' />Delete</li>
                            </ul>
                        </div>
                    )}
                </Popover.Panel>


            </Popover>
        </span>
    );
}
