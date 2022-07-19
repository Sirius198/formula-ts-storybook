import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArithmeticOperator } from './ArithmeticOperator';

export default {
    title: 'Base/ArithmeticOperator',
    component: ArithmeticOperator,
    argTypes: {
    },
} as ComponentMeta<typeof ArithmeticOperator>;

const Template: ComponentStory<typeof ArithmeticOperator> = (args) => <ArithmeticOperator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    
};