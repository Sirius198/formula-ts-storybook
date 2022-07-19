import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import EqVariable from '../EqVariable';

interface EqFnNumberProps {
    paramName?: string;
}

export const EqFnNumber = ({ paramName = 'VALUE' }: EqFnNumberProps) => {
    const fakeColumns = ['Homework', 'Participation', 'Midterm Exam', 'Final Exam'];
    const [selected, setSelected] = useState(0);

    return (
        <span className="pl-3 bg-blue-200 rounded-full inline-block mx-1">
            <span className='mr-2 text-xs'>{paramName}</span>

            <EqVariable type='numeric' className='mr-0 border-r-0' />
        </span>
    );
};

export default EqFnNumber;