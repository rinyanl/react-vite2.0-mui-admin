import React, { useState, useMemo, useEffect } from 'react';
import Auth from '@/router/Auth';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { themeText, themeBg } from './theme.jsx';

const Theme = props => {
    const [isDark, setTheme] = useState(localStorage.theme || 'light');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDark,
                    text: themeText(isDark),
                    background: themeBg(isDark),
                    primary: {
                        main: '#3175ED',
                        darker: '#3175ED',
                        light: '#FFFFFF',
                        dark: '#2B67D1',
                    },
                    success: {
                        main: '#52CC55',
                        darker: '#52CC55',
                        light: '#FFFFFF',
                        dark: '#4BCCA4',
                    },
                    error: {
                        main: '#FA4D4B',
                        darker: '#FA4D4B',
                        light: '#FFFFFF',
                        dark: '#DB6365',
                    },
                    info: {
                        main: '#3297FA',
                        darker: '#3297FA',
                        light: '#FFFFFF',
                        dark: '#DB6365',
                    },
                    warning: {
                        main: '#EC9046',
                        darker: '#EC9046',
                        light: '#FFFFFF',
                        dark: '#D98440',
                    },
                },
            }),
        [isDark]
    );

    React.$theme = theme.palette;

    useEffect(
        props => {
            localStorage.theme = isDark;
        },
        [isDark]
    );

    return (
        <ThemeProvider theme={theme}>
            <Auth {...props} isDark={isDark} setTheme={setTheme} />
        </ThemeProvider>
    );
};

export default Theme;
