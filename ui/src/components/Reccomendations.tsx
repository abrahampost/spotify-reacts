import React from 'react';

import IAlbum from '../domain/IAlbum';
import { useQuery } from 'react-query';
import Loader from './Loader';
import { getArtistAlbums } from '../services/albumService';
import { SearchResult } from './SearchResult';

export const Reccomendations = ({ artistId, artistName, albumId } : { artistId: string, artistName: string, albumId: string}) => {

    const { isLoading, isError,  data } = useQuery<IAlbum[]>(['getReccomendations', artistId, albumId], () => getArtistAlbums(artistId, albumId));

    return (
        isError ? <p>There was an error in our reccomendation engine</p> :
            <div className="datum">
                <div className="title">
                    Other albums by {artistName}
                </div>
                <div className="value">
                    { isLoading ? 
                        <Loader /> :
                        data?.map((album) => <SearchResult key={album.id} result={album} small />)
                    }
                </div>
            </div>
    )
}