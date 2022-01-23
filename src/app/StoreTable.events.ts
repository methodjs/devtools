import { getSelectedStoreKey, setSelectedStoreKey } from './stores';

export function selectStore(key: string) {
  const current = getSelectedStoreKey();
  if (key === current) {
    setSelectedStoreKey(null);
  } else {
    setSelectedStoreKey(key);
  }
}
