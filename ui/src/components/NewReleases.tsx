import React from 'react';
import { Typography } from '@material-ui/core';

import { useQuery } from 'react-query';
import IAlbum from '../domain/IAlbum';
import { getNewReleases } from '../services/albumService';
import Loader from './Loader';
import { SearchResult } from './SearchResult';

export const NewReleases = () => {
    const { isLoading, isError,  data } = useQuery<IAlbum[]>(['getReleases'], () => getNewReleases());

    return (
        isError ? <p>Couldn't fetch new releases.</p> :
        <>
            <Typography variant="h6" style={{marginTop: 32}}>
                Looking for new music? Check out these new releases!
            </Typography>
            { isLoading ? 
                <Loader /> :
                data?.map((album) => <SearchResult key={album.id} result={album} />)
            }

        </>
    )
}