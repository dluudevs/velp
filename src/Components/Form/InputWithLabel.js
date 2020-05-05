import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Label from './Label'
import Box from '../Box'

const InputWithLabel = ({ 
  label, 
  htmlFor, 
  inputProps
}) => {
  return (
    <Box
    display="flex"
    alignItems="center"
    >
      <Label 
        htmlFor={htmlFor}
        mr="12px"
        // maybe create a variant htmlFor the styles below
        fontWeight="700"
        lineHeight="23px"
      >
        {label}
      </Label>
      <Input 
        // name="search" 
        // placeholder="burgers, barbers, spas, handymen"
        // border="none"
        {...inputProps}
      />
    </Box>
  )
}

InputWithLabel.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  inputProps: PropTypes.shape({})
}

export default InputWithLabel;