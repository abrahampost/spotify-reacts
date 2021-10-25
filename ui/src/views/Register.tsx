import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { registerUser } from '../services/authService';
import { RoutePaths } from '../routing/Routes';

export const Register = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (e: { username: string, password: string }) => {
        await registerUser(e.username, e.password)
        history.push(RoutePaths.LOGIN);
    }

    return (
        <div className="register">
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4">
                            Register
                        </ Typography>
                        <TextField
                            variant="outlined"
                            label="Username"
                            type="text"
                            autoComplete="username"
                            {...register("username") } />
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password") } />
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}