import { Box } from '@mui/material';
import React from 'react';
import PrimarySearchAppBar from '../../layouts/header/Header';
import { Footer } from '../../layouts/footer/Footer';
import { TabPanelAccountManager } from './components/TabPanelAccountManager';

export const AccountManager = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <PrimarySearchAppBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 2,
                    py: 3,
                }}
            >
                <TabPanelAccountManager />
            </Box>
            <Footer />
        </Box>
    );
};
