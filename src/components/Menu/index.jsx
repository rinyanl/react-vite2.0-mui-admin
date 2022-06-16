import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';

import SvgIcon from '@/assets/icons/SvgIcon';

import { routeMap } from '@/router';
import eventBus from '@/utils/eventBus';

function LinkTab(props) {
    return (
        <NavLink to={props.path}>
            <Tab component="div" {...props} />
        </NavLink>
    );
}

const Menu = props => {
    const { pathname } = location;
    const router = useHistory();
    const { setHerderTitle } = props;

    const getSelectId = () => {
        let id, title, isSecond, title2;
        routeMap.map(m => {
            if (m.path === pathname || m.path === '/' + pathname.split('/')[1]) {
                id = m.id;
                title = m.title;
            }
        });

        return { id, title };
    };

    const [selectedIndex, setSelectedIndex] = useState(getSelectId().id || 0);

    const selecthandleChange = (event, newValue) => {
        setSelectedIndex(newValue);
    };

    useEffect(() => {
        eventBus.on('setIndex', val => {
            setSelectedIndex(val);
        });
        return () => {
            eventBus.removeListener('setIndex', () => {}); //移出事件总线
        };
    }, []);
    useEffect(() => {
        setHerderTitle(getSelectId());
    }, [selectedIndex]);

    const countTop = () => {
        if (selectedIndex == 0) {
            return `${46 + 1}px !important`;
        }
        if (selectedIndex == 3) {
            return `${46 * 5 + 4}px !important`;
        }
    };

    const tabsIcon = [
        <SvgIcon style={{ marginRight: '8px' }} name="m01" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m02" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m03" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m04" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m09" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m05" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m07" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m08" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m06" />,
    ];

    const tabslIcon = [
        <SvgIcon style={{ marginRight: '8px' }} name="m01-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m02-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m03-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m04-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m09-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m05-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m07-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m08-l" />,
        <SvgIcon style={{ marginRight: '8px' }} name="m06-l" />,
    ];

    return (
        <Box
            sx={{
                minWidth: { xs: 0, md: 260, lg: 260 },
                visibility: { xs: 'hidden', md: 'visible', lg: 'visible' },
                width: { xs: 0, md: 'auto', lg: 'auto' },
                height: { xs: 0, md: 'auto', lg: 'auto' },
                background: React.$theme.background[50],
            }}
        >
            <Box sx={{ mb: 1.8, color: 'red', display: 'flex', alignItems: 'center' }}>
                <AppBar
                    position="static"
                    sx={{ background: React.$theme.background[50], flex: 1 }}
                    elevation={0}
                >
                    <Box
                        sx={{
                            height: 70,
                            display: 'flex',
                            alignItems: 'center',
                            pl: 3,
                            color: React.$theme.text[900],
                        }}
                    >
                        {/* <SvgIcon
                            style={{ cursor: 'pointer' }}
                            onClick={e => {
                                router.push({ pathname: ' /info' });
                                e.stopPropagation();
                                eventBus.emit('setIndex', 0);
                            }}
                            name={React.$theme.mode === 'dark' ? 'logol' : 'logo'}
                        /> */}
                        LOGO
                    </Box>
                </AppBar>
                <Box
                    sx={{ width: '1px', height: '22px', background: React.$theme.background[200] }}
                ></Box>
            </Box>
            <Box
                className="munulist"
                sx={{ height: '100%', background: React.$theme.background[50] }}
            >
                <Tabs
                    value={selectedIndex}
                    orientation="vertical"
                    onChange={selecthandleChange}
                    aria-label="nav tabs example"
                >
                    {routeMap.map((m, i) => {
                        return (
                            <LinkTab
                                sx={{
                                    padding: '0 20px',
                                    width: '100%',
                                    color: React.$theme.text[900],
                                    lineHeight: '8px',
                                    fontWeight: 400,
                                    minHeight: '46px',
                                    justifyContent: 'flex-start',
                                }}
                                icon={React.$theme.mode === 'dark' ? tabslIcon[i] : tabsIcon[i]}
                                iconPosition="start"
                                key={m.id}
                                label={m.title}
                                path={m.path}
                                current={i}
                            />
                        );
                    })}
                </Tabs>
            </Box>
        </Box>
    );
};

export default Menu;
