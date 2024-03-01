import React from "react";

export const SearchContext = React.createContext({
  search: "",
  setSearch: (search: string) => {},
});
