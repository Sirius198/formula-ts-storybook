import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import EqVariable from '../EqVariable';
import { OptionalParamRemoveButton } from './OptionalParamRemoveButton';

interface EqFnArrayProps {
    paramName?: string;
    paramOptional?: string;
    onRemove?: () => void;
}

export const EqFnArray = ({ paramName = 'VALUE', paramOptional = '', onRemove }: EqFnArrayProps) => {
    const fakeColumns = ['Homework', 'Participation', 'Midterm Exam', 'Final Exam'];
    const [selected, setSelected] = useState(0);

    return (
        <span className="pl-3 bg-teal-200 rounded-full inline-block mx-1">
            {/* <span className='mr-2 text-xs'>{paramName}</span> */}
            {paramOptional==='true'?
              <span className="relative">
                  <label className='text-xs'>{paramName}</label>
                  <label className='absolute text-[0.45rem] bottom-[-0.9rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>optional</label>                  
              </span> :
              <span className='text-xs'>{paramName}</span>
            }

            <EqVariable type='array' className='border-r-0 ml-2' />
            {paramOptional === 'true' && <OptionalParamRemoveButton onClick={() => onRemove && onRemove()} />}
        </span>
    );
};

export default EqFnArray;