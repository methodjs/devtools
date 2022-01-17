import { ChangeEvent } from 'react';
import { setFilter } from './stores';

export function onChangeNameFilter(e: ChangeEvent<HTMLInputElement>) {
  setFilter({ nameFilter: e.target.value }, { action: 'onChangeNameFilter' });
}

export function onChangeActivatedFilter() {
  setFilter(
    ({ activatedFilter }) => {
      if (activatedFilter === true) {
        return { activatedFilter: false };
      }
      if (activatedFilter === null) {
        return { activatedFilter: true };
      }
      return { activatedFilter: null };
    },
    { action: 'onChangeActivatedFilter' },
  );
}
