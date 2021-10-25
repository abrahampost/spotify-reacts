import React from 'react';
import { TextField } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { SearchResult } from '../components/SearchResult';
import { searchAlbums } from '../services/albumService';
import ISearchResult from '../domain/ISearchResult';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../util/useQuery';
import { NewReleases } from '../components/NewReleases';

export const Home = () => {
    const history = useHistory();
    const queryParams = useQueryParams();

    const [ searchTerm, setSearchTerm ] = useState(() => {
        return queryParams.get('query') || '';
    });


    const { isError, data: searchResults, refetch } = useQuery<ISearchResult[] | null>(['searchAlbums', queryParams], () => {
        if (searchTerm) {
            return searchAlbums(searchTerm)
        }
        return null;
    }, {
        suspense: true
    });

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
    const handleEnterKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            history.push({
                pathname: history.location.pathname,
                search: '?' + new URLSearchParams({ query: searchTerm })
            })
            refetch();
        }
    }

    if (isError) {
        return <div className="error">An error has occured fetching data</div>;
    }

    return (
        <div className="home">
            <TextField
                label="Album search"
                variant="outlined"
                className="album-search"
                InputProps={{
                    endAdornment: <SearchIcon /> 
                }}
                onChange={handleSearchTermChange}
                onKeyPress={handleEnterKeypress} />
            { searchResults === null && <div className="no-results">Search above to review an album</div>}
            { searchResults?.length === 0 && <div className="no-results">No albums found</div>}
            { searchResults?.map(result => (<SearchResult key={result.id} result={result} />)) }
            <NewReleases />
        </div>
    )
}