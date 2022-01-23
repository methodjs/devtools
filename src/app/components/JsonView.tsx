import React from 'react';

const UNDEFINED_STYLE = {
  color: '#ddd',
};
const NULL_STYLE = {
  color: '#ddd',
};
const STRING_STYLE = {
  color: 'orange',
};
const PRIMARY_STYLE = {
  color: 'blue',
};
const FUNCTION_STYLE = {
  color: 'black',
};
const KEY_STYLE = {
  color: 'brown',
};

export function UndefinedView() {
  return <span style={UNDEFINED_STYLE}>undefined</span>;
}

export function NullView() {
  return <span style={NULL_STYLE}>null</span>;
}

interface StringViewProps {
  value: string;
}
export function StringView(props: StringViewProps) {
  const { value } = props;
  return <span style={STRING_STYLE}>{`"${value}"`}</span>;
}

interface PrimaryViewProps {
  value: number | bigint | boolean | Date;
}
export function PrimaryView(props: PrimaryViewProps) {
  const { value } = props;
  return <span style={PRIMARY_STYLE}>{`${value.toString()}`}</span>;
}

interface FunctionViewProps {
  value: any;
}
export function FunctionView(props: FunctionViewProps) {
  const { value } = props;
  return <span style={FUNCTION_STYLE}>{`${value.toString()}`}</span>;
}

interface KeyViewProps {
  value: string;
}
export function KeyView(props: KeyViewProps) {
  const { value } = props;
  return <span style={KEY_STYLE}>{`${value}: `}</span>;
}

interface ValueViewProps {
  value: any;
}
export function ValueView(props: ValueViewProps) {
  const { value } = props;
  if (value === undefined || value === null) {
    return (
      <>
        {value === undefined && <UndefinedView />}
        {value === null && <NullView />}
      </>
    );
  }
  if (Array.isArray(value)) {
    return <ArrayView array={value} />;
  }
  if (
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean' ||
    value instanceof Date
  ) {
    return <PrimaryView value={value} />;
  }
  if (typeof value === 'string') {
    return <StringView value={value} />;
  }
  if (typeof value === 'function') {
    return <FunctionView value={value} />;
  }
  return <ObjectView object={value} />;
}

interface ObjectViewProps {
  object: Record<string, any>;
}
export function ObjectView(props: ObjectViewProps) {
  const { object } = props;
  return (
    <div>
      <p>{'{'}</p>
      {Object.keys(object).map(key => {
        const value = object[key];
        return (
          <p key={key} style={{ marginLeft: '1rem' }}>
            <KeyView value={key} />
            <ValueView value={value} />
          </p>
        );
      })}
      <p>{'}'}</p>
    </div>
  );
}

interface ArrayViewProps {
  array: any[];
}
export function ArrayView(props: ArrayViewProps) {
  const { array } = props;
  return (
    <div>
      <p>{'['}</p>
      {array.map((value, i) => {
        return (
          <p key={i} style={{ marginLeft: '1rem' }}>
            <KeyView value={i.toString()} />
            <ValueView value={value} />
          </p>
        );
      })}
      <p>{']'}</p>
    </div>
  );
}

export interface JsonViewProps {
  json: any;
}

export function JsonView(props: JsonViewProps) {
  const { json } = props;
  return <ValueView value={json} />;
}
