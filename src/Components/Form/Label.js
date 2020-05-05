import styled from 'styled-components'
import {
  compose,
  color,
  space,
  typography,
  layout,
  flexbox,
} from 'styled-system';
import css from '@styled-system/css'

export default styled('label')(
  css({
    fontSize: 'regular',
    fontFamily: 'default',
    color: 'grey'
  }),
  compose(
    color,
    space,
    typography,
    layout,
    flexbox
  )
)