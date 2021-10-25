import axios from "axios";
import IAlbum from "../domain/IAlbum";
import ISearchResult from "../domain/ISearchResult";
import IReviewAPIResponse from "../domain/IReviewAPIResponse";
import IReviewAPIRequest from "../domain/IReviewAPIRequest";

const ALBUM_PREFIX = '/api/album';
const ARTIST_PREFIX = '/api/artist';

export const searchAlbums = async (search: string): Promise<ISearchResult[]> => {
    let res = await axios.get(`${ALBUM_PREFIX}/search?query=${search}`);
    return res.data;
}

export const getAlbum = async (albumId: string): Promise<IAlbum> => {
    let res = await axios.get(`${ALBUM_PREFIX}/${albumId}`);
    return res.data;
}

export const getReviews = async (albumId: string): Promise<IReviewAPIResponse> => {
    let res = await axios.get(`${ALBUM_PREFIX}/${albumId}/reviews`);
    return res.data;
}

export const saveReview = async (albumId: string, review: IReviewAPIRequest): Promise<string> => {
    let res = await axios.post(`${ALBUM_PREFIX}/${albumId}/reviews`, review);
    return res.data;
}

export const getNewReleases = async (): Promise<IAlbum[]> => {
    let res = await axios.get(`${ALBUM_PREFIX}/releases`);
    return res.data;
}

export const getArtistAlbums = async (artistId: string, albumId: string): Promise<IAlbum[]> => {
    let res = await axios.get(`${ARTIST_PREFIX}/${artistId}/albums?current=${albumId}`);
    return res.data;
}
