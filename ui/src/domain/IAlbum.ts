import IArtist from "./IArtist";
import ISpotifyImage from "./ISpotifyImage";
import ISpotifyTrack from "./ISpotifyTrack";

interface Copyright {
    text: string;
    type: string;
}

export default interface IAlbum {
    album_type: string;
    artists: IArtist[];
    averageReview: number;
    copyrights: Copyright[];
    external_ids: { 
        upc: string
    },
    external_urls: { 
        spotify: string;
    },
    genres: string[];
    href: string;
    id: string;
    images: ISpotifyImage[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    tracks: {
        href: string;
        items: ISpotifyTrack[];
        limit: number;
        offset: number;
        total: number;
    },
    type: string;
    uri: string;
}