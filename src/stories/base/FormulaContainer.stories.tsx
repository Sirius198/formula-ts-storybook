import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormulaContainer } from './FormulaContainer';
import { EqExpression } from '../components/EqExpression';

export default {
    title: 'Base/FormulaContainer',
    component: FormulaContainer,
    argTypes: {
        name: { control: 'text' },
        // label: 
    },
} as ComponentMeta<typeof FormulaContainer>;

const Template: ComponentStory<typeof FormulaContainer> = (args) => <FormulaContainer {...args}></FormulaContainer>;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Button',
};