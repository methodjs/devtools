import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Counter } from './sample/Counter';
import { App } from './app/App';

function DevTools() {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
      <div style={{ display: 'flex' }}>
        <Counter />
      </div>
      <div style={{ display: 'flex' }}>
        <App />
      </div>
    </div>
  );
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'DevTools/Counter',
  component: DevTools,
} as ComponentMeta<typeof DevTools>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DevTools> = () => <DevTools />;

export const Basic = Template.bind({});
