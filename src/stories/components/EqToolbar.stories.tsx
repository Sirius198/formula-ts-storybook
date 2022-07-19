import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EqToolbar from './EqToolbar';

export default {
    title: 'Components/Toolbar',
    component: EqToolbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EqToolbar>;

const Template: ComponentStory<typeof EqToolbar> = (args) => <EqToolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};