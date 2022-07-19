import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Formula } from './Formula';

export default {
    title: 'Base/Formula',
    component: Formula,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Formula>;

const Template: ComponentStory<typeof Formula> = (args) => <Formula {...args} ><h1>Ok</h1></Formula>;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Button',
};