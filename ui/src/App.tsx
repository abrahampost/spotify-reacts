import React, { Suspense } from 'react';
import { Header } from './components/Header';
import { Routes } from './routing/Routes';
import Loader from './components/Loader'

import { Container } from '@material-ui/core';

import './styles/app.scss';

function App() {
  return (
    <div className="App">
        <Header />
        <Container fixed>
            <Suspense fallback={<Loader />}>
                <Routes />
            </Suspense>
        </Container>
    </div>
  );
}

export default App;
