import React from 'react'
import InputWithLabel from '../Form/InputWithLabel'

const SearchBar = () => {
  return (
    <InputWithLabel
      label="Find"
      htmlFor="search"
      inputProps={{
        name: 'search',
        placeholder: 'burgers, spas, handymen...',
        border: 'none',
      }}
    />
  )
}

export default SearchBar;