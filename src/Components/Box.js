import styled from 'styled-components'
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  shadow,
  compose,
} from 'styled-system';

export default styled('div')(
  compose(
    typography,
    space,
    layout,
    color,
    flexbox,
    border,
    position,
    shadow,
  )
)