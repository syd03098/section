import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select, Option, OptionList, Button } from '../unstable_select';
import { cx, css } from '@emotion/css';

export default {
    title: 'unstable_select',
    component: Select,
} as ComponentMeta<typeof Select>;

const options = [
    {
        value: 1,
        displayName: 'one',
    },
    {
        value: 2,
        displayName: 'two',
        disabled: true,
    },
    {
        value: 3,
        displayName: 'three',
    },
];

const Template: ComponentStory<typeof Select> = (args: any) => (
    <Select {...args}>
        <Button>select...</Button>
        <OptionList
            className={cx([
                css`
                    border: 1px solid #e2e2e2;
                    margin: 0;
                    padding: 8px 0;
                    list-style: none;
                `,
            ])}
        >
            {options.map((option) => (
                <Option key={option.displayName} value={option.value}>
                    {option.displayName}
                </Option>
            ))}
        </OptionList>
    </Select>
);

export const Playground = Template.bind({});
Playground.args = {};
