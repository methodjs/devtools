import React, { useEffect, useRef } from 'react';
import {
  onChangeActivatedFilter,
  onChangeNameFilter,
  onChangePreserveLog,
} from './Header.events';
import { useFilter } from './stores';

export function Header() {
  const { nameFilter, activatedFilter, preserveLog } = useFilter();
  const activatedFilterRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (activatedFilterRef.current === null) {
      return;
    }
    if (activatedFilter === null) {
      activatedFilterRef.current.indeterminate = true;
    } else {
      activatedFilterRef.current.indeterminate = false;
    }
  }, [activatedFilter]);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <input
        placeholder="Filter"
        value={nameFilter}
        onChange={onChangeNameFilter}
        style={{
          marginRight: '1em',
          display: 'flex',
          flex: 1,
          marginBottom: 0,
        }}
      />
      <label htmlFor="activatedFilter" style={{ marginRight: '1em' }}>
        <input
          id="activatedFilter"
          type={'checkbox'}
          checked={activatedFilter || false}
          ref={activatedFilterRef}
          onChange={onChangeActivatedFilter}
          value={'activatedFilter'}
        />
        Activated
      </label>
      <label htmlFor="preserveLog">
        <input
          id="preserveLog"
          type={'checkbox'}
          checked={preserveLog}
          onChange={onChangePreserveLog}
          value={'preserveLog'}
        />
        Preserve Log
      </label>
    </div>
  );
}
