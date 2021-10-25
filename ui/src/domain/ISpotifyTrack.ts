import IArtist from "./IArtist";

export default interface ISpotifyTrack {
    artists: IArtist[];
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_urls: {
        spotify: string;
    }
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}