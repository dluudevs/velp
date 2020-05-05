import React from 'react'
import Input from '../Form/Input'
import Label from '../Form/Label'
import Box from '../Box'

const SearchBar = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Label 
        htmlFor="search"
        mr="12px"
        // maybe create a variant for the styles below
        fontWeight="700"
        lineHeight="23px"
      >
        Find
      </Label>
      <Input 
        name="search" 
        placeholder="burgers, barbers, spas, handymen"
        border="none"
      />
    </Box>
  )
}

export default SearchBar;