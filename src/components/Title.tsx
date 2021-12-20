import React from 'react';
import '../../src/styles/Title.scss';

interface ITitle {
  className?: string;
}

const Title:React.FC<ITitle> = ({children, className}) => {
  return (
    <h1 className={`${className ?? ''} default-title`}>{children}</h1>
  );
};

export default Title;
