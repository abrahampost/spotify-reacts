import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { RoutePaths } from '../../routing/Routes';
import { userAtom } from '../../state/userAtom';

import { logout } from '../../services/authService';

import { AppBar, Button, Toolbar, Typography, Container } from '@material-ui/core';

import './Header.scss';

export const Header = () => {
    const history = useHistory();
    const [ user, setUser ] = useRecoilState(userAtom);

    const onLogout = async () => {
        await logout();
        setUser(null);
        history.push(RoutePaths.HOME);
    }
    
    return (
        <AppBar position="static" className="header">
            <Container fixed>
                <Toolbar>
                    <Typography role="link" variant="h6" onClick={() => history.push(RoutePaths.HOME)}>
                        <Button color="inherit">Spotify-Reacts</Button>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}