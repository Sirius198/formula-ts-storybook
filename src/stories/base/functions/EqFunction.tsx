import { useEffect, useState } from "react";
import { fnItems, FunctionItem, FunctionParameter } from "../../../utils/function";
import { Formula } from "../Formula";
import { FormulaContainer } from "../FormulaContainer";
import EqFnBool from "./EqFnBool";
import EqFnDate from "./EqFnDate";
import EqFnHeader from "./EqFnHeader";
import EqFnNumber from "./EqFnNumber";
import EqFnText from "./EqFnText";

interface EqFunctionProps {
    func_id: number;
}

const mockup_get_func_parameters = (func_id: number): FunctionItem => {
    return fnItems.find(t => t.id === func_id)!;
};

export const EqFunction = ({ func_id }: EqFunctionProps) => {

    const [loadedFuncParameters, setLoadedFuncParameters] = useState<boolean>(false);
    const [parameters, setParameters] = useState<FunctionParameter[]>([]);

    // Trying to get function data from server, this is just a mockup
    useEffect(() => {
        const fndata = mockup_get_func_parameters(func_id);
        setLoadedFuncParameters(true);
        setParameters(fndata.params);
    }, []);

    if (!loadedFuncParameters) return (<div>Loading...</div>);

    return (
        <>
            <FormulaContainer name="repl">
                <div className="inline-block">
                    <EqFnHeader name="Replace" />

                    {/* Map according to parameter type */}
                    {parameters.map((param, index) => {
                        if (param.type === 'text') return <EqFnText key={index} />
                        if (param.type === 'number') return <EqFnNumber key={index} />
                        if (param.type === 'boolean') return <EqFnBool key={index} />
                        if (param.type === 'date') return <EqFnDate key={index} />
                    })}
                </div>
            </FormulaContainer>
        </>
    )
};

export default EqFunction;