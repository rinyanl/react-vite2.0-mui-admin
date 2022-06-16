import React, { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Toast from '@/components/Toast';

const Home = props => {
    return (
        <Container
            disableGutters
            sx={{ maxWidth: '100% !important', m: 0, p: { xs: 0, md: 3, lg: 3 } }}
        >
            <Card
                className="buycard"
                elevation={0}
                sx={{
                    padding: { xs: '30px 24px 0', md: '20px 24px 40px', lg: '20px 24px 40px' },
                    background: React.$theme.background[50],
                }}
            >
                <Typography variant="h6" color="text.900" sx={{ mb: 2 }}>
                    首页
                </Typography>

                <Box>内容待定</Box>

                <Button
                    onClick={() => {
                        Toast.info('123123');
                    }}
                ></Button>
            </Card>
        </Container>
    );
};

export default Home;
