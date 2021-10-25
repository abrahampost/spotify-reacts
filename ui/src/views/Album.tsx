import React, { useState } from 'react';

import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import IAlbum from '../domain/IAlbum';
import { getAlbum } from '../services/albumService';
import { useQuery } from 'react-query';

import Reviews from '../components/Reviews';
import { ReviewForm } from '../components/Reviews/ReviewForm';
import { Rating } from '@material-ui/lab';
import { Reccomendations } from '../components/Reccomendations';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

export const Album = () => {
    const { id } = useParams<{ id: string }>();

    const [ showTracks, setShowTracks ] = useState(false);

    const { isError, isLoadingError, data: album } = useQuery<IAlbum>(['getAlbum', id], () => {
        return getAlbum(id)
    }, { suspense: true });

    if (isError || isLoadingError) {
        return <div className="error">An error has occured</div>;
    }

    const largestImage = album ? album.images?.reduce((prev, curr) => {
        if (curr && prev && (curr.width * curr.height) > (prev.width * prev.height)) {
            return curr;
        }

        return prev;
    }, album.images.length > 0 ? album.images[0] : undefined) : undefined;

    return (
        <div className="album">
            <Grid container
                justifyContent="space-between"
                align-items="center"
                spacing={3}>
                <Grid item sm={12} md={6} >
                    <Typography variant="h3">{album?.name}</Typography>
                    <div className="info">
                        <div className="datum">
                            {album?.averageReview !== null ?
                                <>
                                    <div className="title"><Rating value={album?.averageReview || 0} precision={.25} readOnly />
                                        &nbsp;{album?.averageReview}/5</div>
                                </> : <div className="title">No reviews</div>
                            }
                        </div>
                        <div className="datum emphasis">
                            <div className="value">{album?.artists?.map(artist => artist.name).join(', ')}</div>
                        </div>
                        <div className="datum">
                            <div className="title">Label</div>
                            <div className="value">{album?.label}</div>
                        </div>
                        <div className="datum">
                            <div className="title">Release Date</div>
                            <div className="value">{album?.release_date}</div>
                        </div>
                        { album?.artists?.length !== 0 && <Reccomendations artistId={album!.artists[0].id} artistName={album!.artists[0].name} albumId={album!.id} /> }
                    </div>
                </Grid>
                <Grid item sm={12} md={6}>
                    <img style={{marginBottom: 32 }} src={largestImage?.url} alt={`album art of ${album?.name}`} width="100%" />
                    <div className="show-tracks-toggle" role="button" onClick={() => setShowTracks((showTracks) => !showTracks)}><span>{showTracks ? 'Hide Tracks' : 'Show Tracks'}</span><span>{ showTracks ? <ArrowDropUp /> : <ArrowDropDown />}</span></div>
                    <div className={['tracks-dropdown', showTracks ? ' open' : ''].join(' ')}>
                        <iframe title="album preview" src={`https://open.spotify.com/embed/album/${album?.id}`} width="100%" height="100%" frameBorder="0" allow="encrypted-media"></iframe>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {album?.id && <Reviews albumId={album?.id} />}
                </Grid>
                <Grid item xs={12}>
                    {album?.id && <ReviewForm albumId={album.id} />}
                </Grid>
            </Grid>
        </div>
    );
}