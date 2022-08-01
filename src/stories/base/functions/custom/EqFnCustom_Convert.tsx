import React, { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition, Switch } from '@headlessui/react';
import EqFnParam from '../EqFnParam';
import { FunctionParameter } from '../../../../utils/function';

interface EqFnCustomProps {
    params: FunctionParameter[];
}

const CONVERT_UNITS = {
    'Weight': ['u', 'grain', 'g', 'ozm', 'lbm', 'stone', 'sg', 'cwt', 'ton', 'uk_ton'],
    'Distance': ['ang', 'Picapt', 'pica', 'in', 'ft', 'yd', 'm', 'ell', 'mi', 'survey_mi Nmi', 'ly', 'parsec'],
    'Time': ['sec', 'min', 'hr', 'day', 'yr'],
    'Pressure': ['Pa', 'mmHg', 'Torr', 'psi', 'atm'],
    'Force': ['dyn', 'pond', 'N', 'lbf'],
    'Energy': ['eV', 'e', 'J', 'flb', 'c', 'cal', 'BTU', 'Wh', 'HPh'],
    'Power': ['W', 'PS', 'HP'],
    'Magnetism': ['ga', 'T'],
    'Temperature': ['C', 'F', 'K', 'Rank', 'Reau'],
    'Volume': ['ang^3', 'Picapt^3', 'tsp', 'tspm', 'tbs', 'in^3', 'oz', 'cup', 'pt', 'uk_pt', 'qt', 'l', 'uk_qt', 'gal', 'uk_gal', 'ft^3', 'bushel', 'barrel', 'yd^3', 'm^3', 'MTON', 'GRT', 'mi^3', 'Nmi^3', 'ly^3'],
    'Area': ['ang^2', 'Picapt^2', 'in^2', 'ft^2', 'yd^2', 'm^2', 'ar', 'Morgen', 'uk_acre', 'us_acre', 'ha', 'mi^2', 'Nmi^2', 'ly^2'],
    'Information': ['bit', 'byte'],
    'Speed': ['m/hr', 'mph', 'kn', 'admkn', 'm/s'],
};

/**
 * Special component for 'CONVERT' function
 * @param param0 
 * @returns 
 */
export const EqFnCustomConvert = ({ params }: EqFnCustomProps) => {

    const [unitType, setUnitType] = useState('');
    const [unitArray, setUnitArray] = useState<string[]>(CONVERT_UNITS['Weight']);

    // When the type changes, it changes the dropdown list of units
    useEffect(() => {
        setUnitArray(CONVERT_UNITS[unitType as keyof typeof CONVERT_UNITS]);
    }, [unitType]);

    const onTypeChange = (t: string) => {
        setUnitType(t);
    };

    return (<>
        <EqFnParam param={params[0]} />
        <EqFnParam param={params[1]} onChange={onTypeChange} />
        <EqFnParam param={{...params[2], values: unitArray}} />
        <EqFnParam param={{...params[3], values: unitArray}} />
    </>);
};

export default EqFnCustomConvert;