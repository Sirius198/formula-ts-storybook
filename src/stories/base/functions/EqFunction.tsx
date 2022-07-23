import { useEffect, useState } from "react";
import { fnItems, FunctionItem, FunctionParameter } from "../../../utils/function";
import { Formula } from "../Formula";
import { FormulaContainer, FormulaProps } from "../FormulaContainer";
import EqFnBool from "./EqFnBool";
import EqFnDate from "./EqFnDate";
import EqFnHeader from "./EqFnHeader";
import EqFnNumber from "./EqFnNumber";
import EqFnText from "./EqFnText";

interface EqFunctionProps extends FormulaProps {
    func_id: number;
}

const mockup_get_func_parameters = (func_id: number): FunctionItem => {
    return fnItems.find(t => t.id === func_id)!;
};

export const EqFunction = ({ func_id, name = 'function' }: EqFunctionProps) => {

    const [loadedFuncParameters, setLoadedFuncParameters] = useState<boolean>(false);
    const [parameters, setParameters] = useState<FunctionParameter[]>([]);
    const [fnName, setFnName] = useState<string>('');
    const [formulaColor, setFormulaColor] = useState('blue');

    // Trying to get function data from server, this is just a mockup
    useEffect(() => {
        setLoadedFuncParameters(true);
        // const fndata = mockup_get_func_parameters(func_id);
        // setParameters(fndata.params);
        loadFunction(func_id);
    }, []);

    const loadFunction = (fid: number) => {
        const fx = fnItems.find(t => t.id === fid)!;
        setParameters(fx.params);
        setFnName(fx.name);
        setFormulaColor(
            fx.return == 'Text' ? 'pink' :
            fx.return == 'Number' ? 'blue' :
            fx.return == 'Date' ? 'orange' :
            fx.return == 'Boolean' ? 'amber' :
            'teal'
        );
    };

    if (!loadedFuncParameters) return (<div>Loading...</div>);

    return (
        <>
            <FormulaContainer name={name} color={formulaColor as any}>
                <div className="inline-block">
                    <EqFnHeader name={fnName} onChange={loadFunction} />

                    {/* Map according to parameter type */}
                    {parameters.map((param, index) => {
                        if (param.type === 'String') return <EqFnText key={index} />
                        if (param.type === 'Number') return <EqFnNumber key={index} />
                        if (param.type === 'Boolean') return <EqFnBool key={index} />
                        if (param.type === 'Date') return <EqFnDate key={index} />
                    })}
                </div>
            </FormulaContainer>
        </>
    )
};

export default EqFunction;
