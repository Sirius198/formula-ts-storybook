import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ComparisionOperator from './ComparisionOperator';

export default {
    title: 'Base/ComparisionOperator',
    component: ComparisionOperator,
    argTypes: {
    },
} as ComponentMeta<typeof ComparisionOperator>;

const Template: ComponentStory<typeof ComparisionOperator> = (args) => <ComparisionOperator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    
};