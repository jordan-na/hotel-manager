import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const useQuery = (onSearch) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const [searching, setSearching] = useState(false);
   const [query, setQuery] = useState({});

   useEffect(() => {
      const newQuery = {};
      for (const [key, value] of searchParams.entries()) {
         newQuery[key] = value;
      }
      setQuery(newQuery);
   }, [searchParams]);

   useEffect(() => {
      for (const key in query) {
         if (query[key].trim().length > 0) {
            setSearching(true);
            return;
         }
      }
      setSearching(false);
   }, [query]);

   useEffect(() => {
      if(!searching) return;
      let queryString = "";
      for (const key in query) {
         if (query[key].trim().length === 0) {
            continue;
         }
         queryString += `${key}=${query[key]}&`;
      }
      while (queryString.charAt(queryString.length - 1) === "&") {
         queryString = queryString.substr(0, queryString.length - 1);
      }
      onSearch(queryString);
   }, [searching, query, onSearch])

   const removeFromSearchParamsHandler = (key) => {
      const newSearchParams = { ...query };
      let numValidQueries = 0;
      for (const key in newSearchParams) {
         if (newSearchParams[key].trim().length > 0) {
            numValidQueries++;
         }
      }
      if (numValidQueries === 1) {
         setSearchParams({});
      } else {
         newSearchParams[key] = "";
         setSearchParams(newSearchParams);
      }
   };

   return {
      searching,
      query,
      removeFromSearchParamsHandler,
   };
};

export default useQuery;