import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EqFunction from './EqFunction';

export default {
    title: 'Base/Function',
    component: EqFunction,
    argTypes: {
    },
} as ComponentMeta<typeof EqFunction>;

const Template: ComponentStory<typeof EqFunction> = (args) => <EqFunction {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    func_id: 811,
};
