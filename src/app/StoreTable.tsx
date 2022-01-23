import { createQuery } from '@methodjs/store';
import dayjs from 'dayjs';
import React from 'react';
import { getFilter, getSelectedStoreKey, getStores, Store } from './stores';
import { selectStore } from './StoreTable.events';

type SelectableStore = Store & { selected: boolean };

function query(): SelectableStore[] {
  const { nameFilter, activatedFilter } = getFilter();
  const selectedStoreKey = getSelectedStoreKey();
  const stores = getStores()
    .filter(
      c =>
        (c.key.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()) ||
          c.payload?.action
            ?.toLocaleLowerCase()
            .includes(nameFilter.toLocaleLowerCase())) &&
        (activatedFilter === null || c.activated === activatedFilter),
    )
    .map<SelectableStore>(c => ({
      ...c,
      selected: c.key === selectedStoreKey,
    }));
  return stores;
}

const useStoresQuery = createQuery(query, [
  'DevToolsFilter',
  'DevToolsStores',
  'DevToolsSelectedStoreKey',
]);

export function StoreTable() {
  const stores = useStoresQuery();
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Transaction</th>
            <th>Updated</th>
            <th>Activated</th>
            <th>Action</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(
            ({
              key,
              transactionId,
              updated,
              activated,
              payload,
              value,
              selected,
            }) => (
              <tr
                key={key}
                style={activated ? {} : { backgroundColor: '#eee' }}
              >
                <th>
                  <input
                    type={'checkbox'}
                    checked={selected}
                    value={key}
                    onChange={() => selectStore(key)}
                  />
                </th>
                <td>{key}</td>
                <td>{transactionId}</td>
                <td>{updated ? dayjs(updated).format('HH:mm:ss') : ''}</td>
                <td>{String(activated)}</td>
                <td>{payload?.action || ''}</td>
                <td>{JSON.stringify(value)}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </main>
  );
}
