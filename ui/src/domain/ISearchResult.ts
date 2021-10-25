import IArtist from "./IArtist";
import ISpotifyImage from "./ISpotifyImage";

export default interface ISearchResult {
    album_type: string;
    artists: IArtist[],
    external_urls: {
        spotify: string;
    },
    href: string,
    id: string,
    images: ISpotifyImage[],
    name: string,
    release_date: string,
    total_tracks: number,
    uri: string;
    rating?: number | null;
}