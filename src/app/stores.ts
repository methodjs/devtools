import {
  createDevToolsBehavior,
  createStore,
  Information,
  Mapper,
} from '@methodjs/store';

export interface Filter {
  nameFilter: string;
  activatedFilter: boolean | null;
}
export type Store = Information & {
  value: any;
};

function initializeValue(): Filter {
  return {
    nameFilter: '',
    activatedFilter: null,
  };
}
const mapper: Mapper<Filter, Partial<Filter>> = (next, current) => {
  return { ...current, ...next };
};
export const [useFilter, setFilter, getFilter] = createStore<
  Filter,
  Partial<Filter>
>(initializeValue, {
  key: 'DevToolsFilter',
  mapper,
});
export const [useStores, setStores, getStores] = createStore<Store[]>([], {
  key: 'DevToolsStores',
});

window.__METHODJS_DEV_TOOLS_WORKER__ = {
  updateStoreInformation: (information, value) => {
    console.log(information);
    const next = { ...information, value };
    setStores(current => {
      if (!current.some(c => c.key === next.key)) {
        return [...current, next];
      }
      return current.map(c => {
        if (c.key === next.key) {
          return next;
        }
        return c;
      });
    });
  },
};

const [startDevToolsBehavior] = createDevToolsBehavior(
  key => !key.startsWith('DevTools'),
);
startDevToolsBehavior();
