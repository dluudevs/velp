import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/utils";

type Params = {
  text: string,
  latitude: string,
  longitude: string,
}

const INITIAL_PARAMS = {
  text: "",
  latitude: "43.89134216308594",
  longitude: "-79.31005859375",
};

const SearchField = () => {
  const [params, setParams] = useState<Params>(INITIAL_PARAMS)
  const [searchValue, setSearchValue] = useState("");
  // debounce returns a function that gets passed to useCallback
  const getSearchResults = useCallback(
    debounce((p: Params) => {
      const url = process.env.NEXT_PUBLIC_CORS_PROXY + process.env.NEXT_PUBLIC_YELP_AUTOCOMPLETE + new URLSearchParams(p).toString();
      fetch(url, {
        method: "GET",
        headers: {
          authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }),
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // can we combine these two useEffects?
  useEffect(() => {
    setParams({ ...params, text: searchValue })
  }, [searchValue]);

  useEffect(() => {
    if ( ! params.text || ! params.latitude ) {
      return 
    }
    getSearchResults(params);
  }, [params])

  return (
    <div>
      <input
        type="text"
        placeholder="Find"
        value={searchValue}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchField;
