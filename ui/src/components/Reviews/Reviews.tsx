import React from "react";
import { useQuery } from "react-query";
import { getReviews } from "../../services/albumService";
import Loader from "../Loader";
import { Review } from "./Review";
import { Typography } from "@material-ui/core";


import './Review.scss';
import IReviewAPIResponse from "../../domain/IReviewAPIResponse";

interface ReviewsProps {
    albumId: string;
}

export const Reviews = ({ albumId }: ReviewsProps) => {
    const { isLoading, isError, isLoadingError,  data } = useQuery<IReviewAPIResponse>(['getReviews', albumId], () => getReviews(albumId));

    if (isError || isLoadingError) {
        return <div className="error">An error has occured</div>;
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Typography variant="h6" className="review-title">Reviews</Typography>
            {data?.reviews?.map(review => <Review key={review.id} review={review} />) }
            {data?.reviews?.length === 0 && <p>None yet. Be the first!</p>}
        </>
    );
}