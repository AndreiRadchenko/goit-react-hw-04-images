import * as style from './Button.styled';

const Button = ({ onClick, children }) => {
  return (
    <style.Button type="button" onClick={onClick}>
      {children}
    </style.Button>
  );
};

export default Button;
