import { createQuery } from '@methodjs/store';
import dayjs from 'dayjs';
import React from 'react';
import { getFilter, getStores, Store } from './stores';

function query(): Store[] {
  const { nameFilter, activatedFilter } = getFilter();
  const stores = getStores().filter(
    c =>
      (c.key.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()) ||
        c.payload?.action
          ?.toLocaleLowerCase()
          .includes(nameFilter.toLocaleLowerCase())) &&
      (activatedFilter === null || c.activated === activatedFilter),
  );
  return stores;
}

const useStoresQuery = createQuery(query, ['DevToolsFilter', 'DevToolsStores']);

export function Table() {
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
            ({ key, transactionId, updated, activated, payload, value }) => (
              <tr
                key={key}
                style={activated ? {} : { backgroundColor: '#eee' }}
              >
                <th>
                  <input type={'checkbox'} checked={false} />
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
