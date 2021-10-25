import React from "react";
import IReview from '../../domain/IReview';

import { Card, CardContent, Typography } from "@material-ui/core";

import './Review.scss';
import { Rating } from "@material-ui/lab";
import { formatDate } from "../../util/formatDate";

interface ReviewProps {
    review: IReview;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
    return (
        <Card key={review.id} className="review">
            <CardContent className="info">
                <div className="title">
                    <Typography variant="h6">{review.userName}</Typography>
                    <Typography variant="body2">{formatDate(review.createdAt)}</Typography>
                </div>
                <div className="rating">
                    <Rating value={review.rating} precision={.25} readOnly />
                    &nbsp;{review.rating}/5
                </div>
                <Typography variant="body2">{review.content}</Typography>
            </CardContent>
        </Card>
    )
}