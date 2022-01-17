// import { createDevToolsBehavior } from '@methodjs/store';

// window.__METHODJS_DEV_TOOLS_WORKER__ = {
//   updateStoreInformation: (information, value) =>
//     console.log({ ...information, value }),
// };

// const [startDevToolsBehavior] = createDevToolsBehavior(key => key !== 'Stores');
// startDevToolsBehavior();


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}