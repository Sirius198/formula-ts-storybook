import { useState } from "react";
import EqFunction from "../stories/base/functions/EqFunction";
import { EqExpression } from "../stories/components/EqExpression";
import EqIfThenElse from "../stories/components/EqIfThenElse";
import { EqLayout } from "../stories/components/EqLayout";
import { EqSwitchCase } from "../stories/components/EqSwitchCase";
import EqToolbar from "../stories/components/EqToolbar";

interface FormulaBaseType {
    type: 'expression' | 'switch' | 'ifthenelse' | 'function';
    title: string;
}

export const SimplePage = () => {
    const [formulas, setFormulas] = useState<FormulaBaseType[]>([]);

    const onAddExpression = () => {
        const x: FormulaBaseType = {
            type: 'expression',
            title: 'asdf'
        };

        setFormulas([...formulas, x]);
    };

    const onAddSwitchCase = () => {
        const x: FormulaBaseType = {
            type: 'switch',
            title: 'asdf'
        };

        setFormulas([...formulas, x]);
    };

    const onAddIfThenElse = () => {
        const x: FormulaBaseType = {
            type: 'ifthenelse',
            title: 'if_then_else#1'
        };

        setFormulas([...formulas, x]);
    };

    const onAddFunction = () => {
        const x: FormulaBaseType = {
            type: 'function',
            title: 'function#1'
        };

        setFormulas([...formulas, x]);
    };

    return (
        <EqLayout>
            <EqToolbar
                className="absolute left-10 top-10"
                onAddExp={onAddExpression}
                onAddSwitchCase={onAddSwitchCase}
                onAddIfThenElse={onAddIfThenElse}
                onAddFunction={onAddFunction}
            />

            {formulas.map((formula, index) => (
                <div key={index} className='mb-8'>
                    {formula.type == 'expression' && <EqExpression name={formula.title} key={index} />}
                    {formula.type == 'switch' && <EqSwitchCase name={formula.title} key={index} />}
                    {formula.type == 'ifthenelse' && <EqIfThenElse name={formula.title} key={index} />}
                    {formula.type == 'function' && <EqFunction name={formula.title} func_id={1} key={index} />}
                </div>
            ))}
        </EqLayout>
    )
};