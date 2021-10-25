import React from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { RoutePaths } from '../routing/Routes';
import { login } from '../services/authService';
import { userAtom } from '../state/userAtom';
import { useQueryParams } from '../util/useQuery';

export const Login = () => {
    const query = useQueryParams();
    const history = useHistory();
    const setUser = useSetRecoilState(userAtom);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: { username: string, password: string }) => {
        let result = await login(data.username, data.password);
        if (result.status === 200) {
            setUser(result.data);
            let redirectUrl = query.get('redirect');
            if (redirectUrl) {
                history.push(redirectUrl);
            } else {
                history.push(RoutePaths.HOME);
            }
        }
    }

    return (
        <div className="login">
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4">
                            Login
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
    );
}