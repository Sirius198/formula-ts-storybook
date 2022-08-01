import { useEffect, useState } from "react";
import { fnItems, FunctionItem, FunctionParameter } from "../../../utils/function";
import { Formula } from "../Formula";
import { FormulaContainer, FormulaProps } from "../FormulaContainer";
import EqFnBool from "./EqFnBool";
import EqFnDate from "./EqFnDate";
import EqFnHeader from "./EqFnHeader";
import EqFnNumber from "./EqFnNumber";
import EqFnText from "./EqFnText";
import EqFnArray from "./EqFnArray";
import EqFnParam from "./EqFnParam";
import { PlusIcon } from "@heroicons/react/solid";
import EqFnCustomConvert from "./custom/EqFnCustom_Convert";

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
    const [variableParams, setVariableParams] = useState<number[]>([]);

    // Trying to get function data from server, this is just a mockup
    useEffect(() => {
        setLoadedFuncParameters(true);
        // const fndata = mockup_get_func_parameters(func_id);
        // setParameters(fndata.params);
        loadFunction(func_id);
    }, []);

    const loadFunction = (fid: number) => {
        const fx = fnItems.find(t => t.id === fid)!;
        setParameters([]);
        setParameters([...fx.params]);
        setFnName(fx.name);
        setFormulaColor(
            fx.return == 'Text' ? 'pink' :
                fx.return == 'Number' ? 'blue' :
                    fx.return == 'Date' ? 'orange' :
                        fx.return == 'Boolean' ? 'amber' :
                            'teal'
        );

        let vp = [];
        for (var i = 0; i < fx.params.length; i++) {
            vp.push(0);
            if (fx.params[i].variable == true) {
                vp[i] = 1;
            }
        }
        setVariableParams(vp);
    };

    const removeParam = (index: number) => {
        let t = [...variableParams];
        t[index]--;
        setVariableParams(t);
    };

    const addVariableParamCount = (index: number) => {
        let t = [...variableParams];
        t[index]++;
        setVariableParams(t);
    };

    if (!loadedFuncParameters) return (<div>Loading...</div>);

    return (
        <>
            <FormulaContainer name={name} color={formulaColor as any}>
                <div className="inline-flex items-center">
                    <EqFnHeader name={fnName} onChange={loadFunction} />

                    {/* 'Convert' function is exception */}
                    {fnName == 'CONVERT' ? <EqFnCustomConvert params={parameters} /> :
                        parameters.map((param, index) => {

                            if (param.variable) {
                                return (
                                    <>
                                        {Array(variableParams[index]).fill(0).map((_, idx) => (
                                            <EqFnParam key={idx} param={param} onRemove={() => removeParam(index)}
                                                vary_idx={idx + 1}
                                                showRemoveButton={variableParams[index] != 1 && idx != 0} />
                                        ))}

                                        <button
                                            className='bg-[#71717A] w-4 h-4 rounded-full'
                                            onClick={() => addVariableParamCount(index)}
                                        >
                                            <PlusIcon className='w-3 h-3 text-white mt-[2px]' />
                                        </button>
                                    </>
                                );
                            }

                            return (
                                <EqFnParam key={index} param={param} onRemove={() => removeParam(index)} />
                            )

                            if (param.type === 'String') return <EqFnText key={index} paramName={param.name} paramOptional={param.optional} onRemove={() => removeParam(index)} />
                            if (param.type === 'Number') return <EqFnNumber key={index} paramName={param.name} paramOptional={param.optional} onRemove={() => removeParam(index)} />
                            if (param.type === 'Boolean') return <EqFnBool key={index} paramName={param.name} paramOptional={param.optional} onRemove={() => removeParam(index)} />
                            if (param.type === 'Date') return <EqFnDate key={index} paramName={param.name} paramOptional={param.optional} onRemove={() => removeParam(index)} />
                            if (param.type === 'Array') return <EqFnArray key={index} paramName={param.name} paramOptional={param.optional} onRemove={() => removeParam(index)} />
                        })}
                </div>
            </FormulaContainer>
        </>
    )
};

export default EqFunction;
