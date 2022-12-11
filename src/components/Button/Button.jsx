import * as style from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <style.Button type="button" onClick={onClick}>
      {children}
    </style.Button>
  );
};

Button.propType = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
