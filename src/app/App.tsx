import React from 'react';
import { Header } from './Header';
import { Table } from './Table';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
      <Header />
      <Table />
    </div>
  );
}
