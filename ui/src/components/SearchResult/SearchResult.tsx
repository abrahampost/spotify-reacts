import React from 'react';

import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

import ISearchResult from '../../domain/ISearchResult';

import './SearchResult.scss';
import { RoutePaths } from '../../routing/Routes';
import { Rating } from '@material-ui/lab';

export const SearchResult = ({result, small}: {result: ISearchResult, small?: boolean}) => {

    const largestImage = result.images.reduce((prev, curr) => {
        if (curr && prev && (curr.width * curr.height) > (prev.width * prev.height)) {
            return curr;
        }

        return prev;
    }, result.images.length > 0 ? result.images[0] : undefined);

    const goToSpotify = () => {
        window.location.href = result.external_urls.spotify;
    }

    return (
        <Card key={result.id} className={['search-result', small ? 'small' : undefined].join(' ')}>
            <CardMedia
                className="album-art"
                image={largestImage?.url || 'https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg'}
                onClick={goToSpotify}
                title={`album art and spotify link for ${result.name}`}
                role="link"
                />
            <CardContent className="info">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                        <div>
                            <Typography variant="h6"><a href={`${RoutePaths.ALBUMS}/${result.id}`}>{result.name}</a></Typography>
                            { small ? null : <Typography variant="body2">{result.artists.map(artist => artist.name).join(', ')}</Typography> }
                            <Typography variant="body2" className="released">Released {result.release_date}</Typography>
                            { small ? null : <div role="link" onClick={goToSpotify} className="spotify-link" />  }
                        </div>
                        { typeof result.rating === 'number' ?
                            <>
                                <div className="title"><Rating value={result.rating} precision={.25} readOnly />
                                    &nbsp;{result?.rating}/5</div>
                            </> : (small ? null : <div className="title">No reviews</div>)
                        }
                    </Grid>
            </CardContent>
        </Card>
    )
}