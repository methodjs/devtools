import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { App } from './App';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/App',
  component: App,
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = () => <App />;

export const Basic = Template.bind({});
