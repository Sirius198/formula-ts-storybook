import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import EqVariable from './EqVariable';

export default {
    title: 'Base/Variable',
    component: EqVariable,
    argTypes: {
        type: { control: 'select', options: ['numeric', 'text', 'date'] },
    },
} as ComponentMeta<typeof EqVariable>;

const Template: ComponentStory<typeof EqVariable> = (args) => <EqVariable {...args} />;

export const Numeric = Template.bind({});
Numeric.args = {
    type: 'numeric',
};

export const Text = Template.bind({});
Text.args = {
    type: 'text',
};

export const Date = Template.bind({});
Date.args = {
    type: 'date',
};
