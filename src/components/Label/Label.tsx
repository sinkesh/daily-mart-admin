export {};

import React from 'react';
import './Label.css';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return <span className="label">{text}</span>;
};

export default Label;
