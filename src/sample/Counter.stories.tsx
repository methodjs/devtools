import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Counter } from './Counter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Sample/Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Counter> = () => <Counter />;

export const Basic = Template.bind({});
