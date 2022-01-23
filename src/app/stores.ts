import {
  createDevToolsBehavior,
  createStore,
  Information,
  Mapper,
  MapperPayload,
} from '@methodjs/store';

export interface Filter {
  nameFilter: string;
  activatedFilter: boolean | null;
  preserveLog: boolean;
}
export type Store = Information & {
  value: any;
};

function initializeValue(): Filter {
  return {
    nameFilter: '',
    activatedFilter: null,
    preserveLog: false,
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

export const [useSelectedStoreKey, setSelectedStoreKey, getSelectedStoreKey] =
  createStore<string | null>(null, {
    key: 'DevToolsSelectedStoreKey',
  });

interface Log {
  key: string;
  transactionId: number;
  updated: Date;
  value: any;
  payload: MapperPayload | null;
}
export const [useLogs, setLogs, getLogs] = createStore<Log[]>([], {
  key: 'DevToolsLogs',
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
    const { preserveLog } = getFilter();
    const selectStoreKey = getSelectedStoreKey();
    if (preserveLog === true || selectStoreKey === information.key) {
      if (information.updated !== null) {
        const current = getLogs();
        if (
          !current.some(
            c =>
              c.key === information.key &&
              c.transactionId === information.transactionId,
          )
        ) {
          setLogs(current => [
            ...current,
            {
              key: information.key,
              transactionId: information.transactionId,
              updated: information.updated,
              payload: information.payload,
              value,
            },
          ]);
        }
      }
    }
  },
};

const [startDevToolsBehavior] = createDevToolsBehavior(
  key => !key.startsWith('DevTools'),
);
startDevToolsBehavior();
