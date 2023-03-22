import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, List } from "@material-ui/core";
import SearchTitle from './SearchTitle';
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchSearchResults} from '../features/searchResultsSlice'
import { AppDispatch } from '../features/store';
import SearchResultItem from './SearchResultItem';

export interface SearchResults {
  results: [],
  loading: boolean,
  error: null,
  searchTerm: string,
  displayCount: number,
  header:string
}

const SearchBar = () => {
  const [header, setHeader] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const data = useSelector((state: SearchResults) => state);
  //console.log(data);
  const [displayCount, setDisplayCount] = useState<number>(10);
  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let search = searchTerm.trim();
   
    if (search.length > 0) {
       dispatch(fetchSearchResults(search));
     } else {
       search="null";
       dispatch(fetchSearchResults(search));
     }
   };
  
  const handleLoadMore = () => {
    setTimeout(() => {
      setDisplayCount(displayCount + 10);
    },1000);
  };

  useEffect(() => {
    let search = searchTerm.trim();
    if (search === '') {
      setHeader('');
    } else if (search!='' && data.results.length === 0)  {
      setHeader(`No results found for "${searchTerm}"`);
    } else {
      setHeader(`Results for "${searchTerm}" (${data.results.length} results found)`);
    }
    
  }, [data, searchTerm]);

  useEffect(() => {
    dispatch(fetchSearchResults('null'));
  }, [dispatch]);

  return (
    <div className="searchWrapper">
      <SearchTitle/>
      <form onSubmit={handleFormSubmit} className="searchBarWrapper">
        <TextField className="searchBar"
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button className="searchButton" variant="contained" color="primary" type="submit" style={{borderRadius: '0'}}>
          Search
        </Button>
      </form>
      <Typography variant="h6">{header}</Typography>
      <InfiniteScroll 
        dataLength={displayCount}
        next={handleLoadMore}
        hasMore={data.results.length > displayCount}
        loader={<h4>Loading...</h4>}
      >
        <List className="listWrapper" >
          {data.results.slice(0, displayCount).map((item:any) => (
            <SearchResultItem key={item.trackId} result={item} />
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default SearchBar;
