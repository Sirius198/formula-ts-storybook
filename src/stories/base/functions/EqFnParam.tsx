import { PlusIcon, XIcon } from '@heroicons/react/solid';
import { bgcolor } from '@mui/system';
import React, { useState, Fragment, useEffect } from 'react';
import { FunctionParameter } from '../../../utils/function';
import EqVariable from '../EqVariable';
import EqFnBool from './EqFnBool';
import EqFnInputParam from './EqFnInputParam';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';

interface EqFnParamProps {
    // type: string;
    param: FunctionParameter;
    onRemove?: () => void;
    showRemoveButton?: boolean;
    vary_idx?: number;
    onChange?: (x:string) => void;
}

export const EqFnParam = ({ param, onRemove, showRemoveButton, vary_idx, onChange }: EqFnParamProps) => {

    const [stateParam, setStateParam] = useState(param);
    const [bgColor, setBgColor] = useState('');
    console.log(param);
    useEffect(() => {
        setStateParam(param);

        let t = param.type == "Number" ? "bg-blue-200" :
        param.type == "String" ? "bg-fuchsia-200" :
        param.type == "Date" ? "bg-orange-200" :
        param.type == "Array" ? "bg-teal-200" :
        param.type == "File" ? "bg-lime-200" :
        param.type == "All" ? "bg-gray-100" :
        param.type == "Boolean" ? "bg-amber-200" : "";
        // stateParam.isRegEx == true ? "bg-red-400" : "";
        if (stateParam.isRegEx == true) t = "bg-[#d4d4d8]";

        setBgColor(t);
    }, [param]);

    const [toggleVisible, setToggleVisible] = useState(0);
    const [suffixText, setSuffixText] = useState('');

    useEffect(() => {
        // If this is optional param, set toggleVisible to 1 or -1
        if (param?.toggleVisible)
            setToggleVisible(1);
        setSuffixText('');
    }, [param]);

    const onClickRemoveButton = () => {
        if (toggleVisible == 0) {
            onRemove && onRemove();
        }
        else {
            setToggleVisible(-1);
        }
    };

    // if (stateParam.type == "Boolean")
    //     return (<EqFnBool paramName={stateParam.name} defaultvalue={stateParam.default as boolean} />);

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
            {/* {(vary_idx == undefined || vary_idx == 1) ?
                <span className='text-xs'>{stateParam.name}</span>
                :
                <span className='text-xs relative'>
                    {stateParam.name}
                    <span className='absolute top-[9px] left-0 text-[10px] w-full text-center'>optional</span>
                </span>
            } */}
            {/* <span className='text-xs'>{stateParam.name}</span> */}
            <span className='text-xs w-[max-content]'>{stateParam.name}{vary_idx && <>{vary_idx}</>}</span>
            {stateParam.onlyInput ?
                <EqFnInputParam param={stateParam} /> :
                <EqVariable
                    type={stateParam.type}
                    className='border-r-0 ml-2'
                    numberfrom={stateParam.min}
                    numberend={stateParam.max}
                    defaultnumber={stateParam.default as number}
                    values={stateParam.values}
                    hidecol={stateParam.hideCol}
                    param={stateParam}
                    updateSuffixText={(x) => setSuffixText(x)}
                    onChange={onChange}
                />
            }
            {/* {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />} */}

            {/* Suffix Text */}
            {suffixText != '' && <span className='text-xs mr-2'>{suffixText}</span>}

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
