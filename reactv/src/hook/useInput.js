import React, { useState } from 'react';

export default function useInput({ type }) {
  const [value, setValue] = useState('');
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );

  return [value, setValue, input];
}
