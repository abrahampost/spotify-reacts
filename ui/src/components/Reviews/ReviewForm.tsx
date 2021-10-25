import React from 'react';
import { TextareaAutosize, Button, Typography, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useQueryClient } from 'react-query';
import { saveReview } from '../../services/albumService';
import { useForm } from 'react-hook-form';
import IReviewAPIRequest from '../../domain/IReviewAPIRequest';

interface ReviewFormProps {
    albumId: string;
}

export const ReviewForm:React.FC<ReviewFormProps> = ({ albumId }) => {
    const { register, handleSubmit, reset } = useForm();

    const queryClient = useQueryClient();

    const submitReview = async (data: IReviewAPIRequest) => {
        await saveReview(albumId, data);
        queryClient.invalidateQueries('getReviews');
        queryClient.invalidateQueries('getAlbum');
        reset();
    }

    return (
        <>
            <Typography variant="h6">Write a Review</Typography>
            <form autoComplete="false" onSubmit={handleSubmit(submitReview)}>
                <Rating
                    precision={.5}
                    defaultValue={2.5}
                    {...register('rating')} />
                <TextareaAutosize
                    minRows={4}
                    maxLength={500}
                    placeholder="Write your review!"
                    {...register('content')} />
                <TextField
                    className="user-name"
                    label="Name"
                    variant="outlined"
                    {...register('userName')}    
                />
                <Button variant="contained" type="submit">Submit Review</Button>
            </form>
        </>
    )
}