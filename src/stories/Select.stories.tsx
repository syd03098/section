import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from '../select';
import { Theme } from '../select/Select';

export default {
    title: 'select',
    component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: any) => (
    <Select<number> {...args} />
);

const options = [
    {
        value: 1,
        displayName: 'one',
    },
    {
        value: 2,
        displayName: 'two',
    },
    {
        value: 3,
        displayName: 'three',
    },
    {
        value: 4,
        displayName: 'four',
    },
    {
        value: 5,
        displayName: 'five',
        disabeld: true,
    },
    {
        value: 6,
        displayName: 'six',
    },
    {
        value: 7,
        displayName: 'seven',
    },
    {
        value: 8,
        displayName: 'eight',
    },
    {
        value: 9,
        displayName: 'nine',
        disabled: true,
    },
    {
        value: 10,
        displayName: 'ten',
    },
    {
        value: 11,
        displayName: 'eleven',
        disabled: true,
    },
    {
        value: 12,
        displayName: 'twelve',
    },
    {
        value: 13,
        displayName: 'thirteen',
    },
];

export const Playground = Template.bind({});
Playground.args = {
    options,
    initialValue: undefined,
    native: false,
    theme: Theme.Primay,
    placeholder: '다른 사장님들은',
};
