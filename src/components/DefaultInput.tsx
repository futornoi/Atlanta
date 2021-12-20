import React, { ChangeEvent } from 'react';
import '../styles/DefaultInput.scss';

interface IDefaultInput {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: () => (e: ChangeEvent<HTMLInputElement>) => void;
}

const DefaultInput:React.FC<IDefaultInput> = (
  {
    className,
    placeholder,
    type,
    onChange,
    value
  }) => {
  return (
    <div className={`${className ?? ''} default-input`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange()}
      />
    </div>
  );
};

export default DefaultInput;
