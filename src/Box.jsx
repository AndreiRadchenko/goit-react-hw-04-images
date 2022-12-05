import styled from 'styled-components';
import {
  typography,
  color,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
} from 'styled-system';

const Box = styled('div')(
  typography,
  color,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position
);

export default Box;
