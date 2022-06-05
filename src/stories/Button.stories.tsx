import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '../button'

export default {
    title: 'button',
    component: Button
} as  ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
    
}