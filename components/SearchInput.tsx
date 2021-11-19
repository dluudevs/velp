// create a searchInput with autocomplete
import React, { useEffect } from "react";
import { Box, Input } from "@chakra-ui/react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  autocomplete: { id: string, searchTerm: string }[];
  [x: string]: any;
};

const SearchInput = ({
  onChange,
  value,
  placeholder,
  autocomplete,
  ...styles
}: Props) => {
  useEffect(() => {
    console.log(autocomplete);
  }, [autocomplete]);

  return (
    <Box {...styles} pos="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {autocomplete.length ? (
        <Box as="ul" pos="absolute" top="100%" left="0" right="0">

        </Box>
      ) : null}
    </Box>
  );
};

export default SearchInput;
