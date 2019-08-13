import React, { useEffect, useRef } from 'react';

import useField from '../useField';

interface Props<T> {
  name: string;
  label?: string;
  multiline?: T;
}

type InputProps = JSX.IntrinsicElements['input'] & Props<false>;
type TextAreaProps = JSX.IntrinsicElements['textarea'] & Props<true>;

export default function Input({
  name,
  label,
  multiline = false,
  ...rest
}: InputProps | TextAreaProps) {
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const {
 fieldName, registerField, defaultValue, error,
} = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: 'value' });
    }
  }, [ref.current, fieldName]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    defaultValue,
  };

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      {multiline ? (
        <textarea {...props as TextAreaProps} />
      ) : (
        <input {...props as InputProps} />
      )}

      {error && <span>{error}</span>}
    </>
  );
}
