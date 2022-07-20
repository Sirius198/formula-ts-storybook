import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EqSwitchCase } from './EqSwitchCase';

export default {
    title: 'Components/EqSwitchCase',
    component: EqSwitchCase,
    argTypes: {
    },
} as ComponentMeta<typeof EqSwitchCase>;

const Template: ComponentStory<typeof EqSwitchCase> = (args) => <EqSwitchCase {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Hello'
};