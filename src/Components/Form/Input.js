import React, { useState } from 'react';
import styled from 'styled-components';
import { border } from 'styled-system';
import css from '@styled-system/css';
import PropTypes from 'prop-types';

const Input = ({ className, ...inputProps }) => {
  const [input, setInput] = useState('');

  return (
    <input
      className={className}
      type="input"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      {...inputProps}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Input)(
  {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    lineHeight: '23px',
  },
  css({
    fontSize: 'regular',
    fontFamily: 'default',
    color: 'black',

    '&::placeholder': {
      color: 'lightGrey',
    },
  }),
  border
);
