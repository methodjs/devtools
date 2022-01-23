import React from 'react';
import { createQuery } from '@methodjs/store';
import { JsonView } from './components/JsonView';
import { getSelectedStoreKey, getStores } from './stores';

function query() {
  const stores = getStores();
  const selectedStoreKey = getSelectedStoreKey();
  const store = stores.find(c => c.key === selectedStoreKey);
  return store?.value;
}

const useSelectedStoreValue = createQuery(query, [
  'DevToolsStores',
  'DevToolsSelectedStoreKey',
]);

export function ValueDetail() {
  const selectedStoreValue = useSelectedStoreValue();
  if (selectedStoreValue === undefined) {
    return null;
  }
  return (
    <article>
      <JsonView json={selectedStoreValue} />
    </article>
  );
}
