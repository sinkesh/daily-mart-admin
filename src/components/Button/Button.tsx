export {}; // <-- makes this a module

import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <button className="btn" onClick={onClick}>{text}</button>;
};

export default Button;
