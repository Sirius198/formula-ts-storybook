import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EqExpression } from './EqExpression';

export default {
    title: 'Components/Expression',
    component: EqExpression,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EqExpression>;

const Template: ComponentStory<typeof EqExpression> = (args) => <EqExpression {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Hello'
};