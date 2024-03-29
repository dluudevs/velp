import React, { useState, useEffect, useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import { uuid } from 'uuidv4';

import { debounce } from "../utils/utils";

import SearchInput from "./SearchInput";

type Params = {
  text: string;
  latitude: string;
  longitude: string;
};

type LocationObj = {
  type: string;
  position: { lat: number; lon: number };
  score: number;
  [key: string]: any;
};

const INITIAL_PARAMS = {
  text: "",
  latitude: "43.89134216308594",
  longitude: "-79.31005859375",
};

const SearchField = () => {
  const [params, setParams] = useState<Params>(INITIAL_PARAMS);
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [autocompleteLocations, setAutocompleteLocations] = useState([]);
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

  // debounce returns a function that gets passed to useCallback
  const fetchSearchResults = useCallback(
    debounce((p: Params) => {
      const url =
        process.env.NEXT_PUBLIC_CORS_PROXY +
        process.env.NEXT_PUBLIC_YELP_AUTOCOMPLETE +
        new URLSearchParams(p).toString();
      fetch(url, {
        method: "GET",
        headers: {
          authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
        // improve debounce function to return a promise.json()
        .then((res) => res.json())
        .then((data) => {
          const { businesses, terms } = data;
          const searchWords = [];
          businesses?.forEach((b: { id: string, name: string }) => searchWords.push({ id: b.id, searchTerm: b.name }));
          terms?.forEach((term: { text: string }) =>
            searchWords.push({ id: uuid(), searchTerm: term.text })
          );
          console.log(searchWords)
          setAutocompleteSearch(searchWords);
        });
    }),
    []
  );

  const fetchAutoCompleteResults = useCallback(
    debounce((query: string) => {
      const url = `${process.env.NEXT_PUBLIC_TOMTOM_SEARCH}/search/${query}.json?extendedPostalCodesFor=Addr&key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&language=en-US`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const addresses = data.results
            .filter(
              (location: LocationObj) => location.type === "Point Address"
            )
            .sort((a: LocationObj, b: LocationObj) =>
              a.score > b.score ? -1 : 1
            ) 
            .map((add: LocationObj) => {
              const { id } = add;
              const { streetNumber, streetName, localName, countrySubdivision, countryCode } = add.address;
            
              return {
                id,
                searchTerm: `${streetNumber} ${streetName}, ${localName}, ${countrySubdivision}, ${countryCode}`
              }
          });
          setAutocompleteLocations(addresses);
        });
    }, 500),
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationValue(value);
    fetchAutoCompleteResults(value);
    // calls the autocomplete api with a list of options
    // when an option is selected, store the coords in state and set it in params
  };

  useEffect(() => {
    setParams({ ...params, text: searchValue });
  }, [searchValue]);

  useEffect(() => {
    if (!params.text || !params.latitude) {
      return;
    }
    // create state variable to prompt user location needs to be entered
    fetchSearchResults(params);
  }, [params]);

  return (
    <div>
      <Flex as="form">
        <SearchInput
          placeholder="Find"
          value={searchValue}
          onChange={onSearchChange}
          autocomplete={autocompleteSearch}
          mr={4}
        />
        <SearchInput
          placeholder="Location"
          value={locationValue}
          onChange={onLocationChange}
          autocomplete={autocompleteLocations}
        />
      </Flex>
    </div>
  );
};

export default SearchField;
