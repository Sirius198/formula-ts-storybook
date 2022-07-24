import React, { useState, Fragment } from 'react';
import EqVariable from '../EqVariable';

interface EqFnDateProps {
    paramName?: string;
    paramOptional?: string;
}

export const EqFnDate = ({ paramName = 'START DATE', paramOptional = '' }: EqFnDateProps) => {
    const fakeColumns = ['Exam Date', 'Start Date', 'End Date'];

    return (
        <span className="pl-3 bg-orange-200 rounded-full inline-block mx-1">
            {/* <span className='mr-2 text-xs'>{paramName}</span> */}
            {paramOptional==='true'?
              <span className="relative">
                  <label className='text-xs'>{paramName}</label>
                  <label className='absolute text-[0.5rem] bottom-[-0.85rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>optional</label>                  
              </span> :
              <span className='mr-2 text-xs'>{paramName}</span>
            }

            <EqVariable type='date' className='border-r-0 ml-2' />
        </span>
    );
};

export default EqFnDate;