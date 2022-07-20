import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EqIfThenElse from './EqIfThenElse';

export default {
    title: 'Components/IfThenElse',
    component: EqIfThenElse,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EqIfThenElse>;

const Template: ComponentStory<typeof EqIfThenElse> = (args) => <EqIfThenElse {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Hello'
};