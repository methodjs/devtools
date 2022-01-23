import React, { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { useLogs, useSelectedStoreKey } from './stores';
import { JsonView } from './components/JsonView';

export function LogTable() {
  const selectedStoreKey = useSelectedStoreKey();
  const [expandedLogs, setExpandedLogs] = useState<number[]>([]);
  const logs = useLogs();
  if (selectedStoreKey === null) {
    return null;
  }
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type={'checkbox'}
                checked={expandedLogs.length > 0}
                value={'expandedLogs'}
                onChange={() => {
                  if (expandedLogs.length > 0) {
                    setExpandedLogs([]);
                  }
                }}
              />
            </th>
            <th>Transaction</th>
            <th>Updated</th>
            <th>Action</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(({ transactionId, updated, payload, value }) => (
            <Fragment key={transactionId}>
              <tr>
                <th>
                  <input
                    type={'checkbox'}
                    checked={expandedLogs.includes(transactionId)}
                    value={transactionId}
                    onChange={() => {
                      if (expandedLogs.includes(transactionId)) {
                        setExpandedLogs(
                          expandedLogs.filter(c => c !== transactionId),
                        );
                      } else {
                        setExpandedLogs([...expandedLogs, transactionId]);
                      }
                    }}
                  />
                </th>
                <td>{transactionId}</td>
                <td>{updated ? dayjs(updated).format('HH:mm:ss') : ''}</td>
                <td>{payload?.action || ''}</td>
                <td>{JSON.stringify(value)}</td>
              </tr>
              {expandedLogs.includes(transactionId) && (
                <tr>
                  <td colSpan={5}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <article
                        style={{
                          marginTop: '0.5rem',
                          marginBottom: 0,
                          display: 'flex',
                          flex: 1,
                        }}
                      >
                        <JsonView json={value} />
                      </article>
                      {payload !== null &&
                        payload !== undefined &&
                        Object.keys(payload).filter(key => key !== 'action')
                          .length > 0 && (
                          <article
                            style={{
                              marginTop: '0.5rem',
                              marginLeft: '0.5rem',
                              marginBottom: 0,
                              display: 'flex',
                              flex: 1,
                            }}
                          >
                            <JsonView json={payload} />
                          </article>
                        )}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
}
