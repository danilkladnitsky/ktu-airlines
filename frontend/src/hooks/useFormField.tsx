import { ChangeEventHandler, useState } from 'react';

// eslint-disable-next-line max-len
type SetField<P extends object> = (property: keyof P) => {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
};

export function useFormField<P extends object>(
  initialState: P,
): [
    fields: P,
    setField: SetField<P>,
    resetFields: () => void
    ] {
  const [fields, setValues] = useState({ ...initialState });

  return [
    fields,
    (name: keyof P) =>
      ({
        onChange: (event) => setValues((fields: P) => ({
          ...fields,
          [name]: event.target.value,
        })),
      })
    ,
    () => {
      setValues(initialState);
    },
  ];
}
