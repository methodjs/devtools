import React from 'react';
import { Header } from './Header';
import { LogTable } from './LogTable';
import { StoreTable } from './StoreTable';
import { ValueDetail } from './ValueDetail';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
      <Header />
      <StoreTable />
      <ValueDetail />
      <LogTable />
    </div>
  );
}
