import { EuiFieldNumber, EuiFormRow } from '@elastic/eui';
import React from 'react';

const MeetingMaximumUserField = ({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        placeholder="Maximum People"
        min={1}
        max={50}
        value={value}
        onChange={(e) => {
          const num = Number(e.target.value);
          if (!e.target.value.length || isNaN(num) || num <= 0) {
            setValue(1);
          } else if (num > 50) {
            setValue(50);
          } else {
            setValue(num);
          }
        }}
      />
    </EuiFormRow>
  );
};

export default MeetingMaximumUserField;
