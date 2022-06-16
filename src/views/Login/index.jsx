import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import cookie from 'react-cookies';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Toast from '@/components/Toast';
import eventBus from '@/utils/eventBus';
import SvgIcon from '@/assets/icons/SvgIcon';

const Login = props => {
    const router = useHistory();
    const { setLoginStatus } = props;

    const [type, setType] = useState(false);
    const [userName, setuserName] = useState('admin');
    const [userPassword, setuserPassword] = useState('123456');

    const login = async () => {
        if (userName.trim().length <= 0) {
            Toast.error('输入框不可以为空');
            return;
        }
        if (userPassword.trim().length <= 0) {
            Toast.error('输入框不可以为空');
            return;
        }
        if (userPassword.trim().length < 6) {
            Toast.error('密码不能少于6位数');
            return;
        }

        let params = {
            userName: userName.trim(),
            userPassword: userPassword.trim(),
        };

        const cookieData = new Date();
        cookieData.setTime(cookieData.getTime() + 1 * 2 * 60 * 60 * 1000); // 默认2小时后稻妻
        cookie.save('userId', 123213, { path: '/', expires: cookieData });
        cookie.save('userToken', 123123, { path: '/', expires: cookieData });
        Toast.success('登录成功');
        setLoginStatus(true);
        router.push({ pathname: '/home' });
        eventBus.emit('setIndex', 0);

        // const { data: res } = await adminLogin(params);
        // if (res.status !== 200) {
        //     Toast.error(res.msg);
        //     return;
        // } else {
        //     console.log(res);
        //     const cookieData = new Date();
        //     cookieData.setTime(cookieData.getTime() + 1 * 2 * 60 * 60 * 1000); // 默认2小时后稻妻
        //     cookie.save('userId', res.data._id, { path: '/', expires: cookieData });
        //     cookie.save('userToken', res.token, { path: '/', expires: cookieData });

        //     Toast.success('登录成功');
        //     setLoginStatus(true);
        //     router.push({ pathname: '/user' });
        //     eventBus.emit('setIndex', 0);
        // }
    };

    return (
        <Grid
            container
            sx={{
                height: '100%',
                background: React.$theme.background[100],
            }}
        >
            <Grid
                item
                xs={4.5}
                sx={{
                    height: '100%',
                    display: { xs: 'none', md: 'block', lg: 'block' },
                }}
            ></Grid>
            <Grid
                item
                xs={12}
                md={3}
                lg={3}
                sx={{
                    height: '100%',
                    p: 3,
                    pb: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box className="login">
                    <Box
                        className="container"
                        sx={{
                            p: 3,
                            background: React.$theme.background[50],
                        }}
                    >
                        <form>
                            <Box
                                sx={{
                                    mt: 1,
                                    mb: 2.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <SvgIcon
                                    name={React.$theme.mode === 'dark' ? 'logol' : 'logo'}
                                    style={{ height: 27 }}
                                />
                            </Box>
                            <Box sx={{ mt: 3, mb: 3 }}>
                                <OutlinedInput
                                    size="small"
                                    placeholder="用户"
                                    value={userName}
                                    onChange={e => setuserName(e.target.value)}
                                    onKeyUp={e => {
                                        if (e.key === 'Enter') {
                                            login();
                                        }
                                    }}
                                    sx={{
                                        mb: 3,
                                        width: '100%',
                                        height: 42,
                                        fontSize: '15px ',
                                    }}
                                />
                                <OutlinedInput
                                    size="small"
                                    placeholder="密码"
                                    value={userPassword}
                                    onChange={e => setuserPassword(e.target.value)}
                                    onKeyUp={e => {
                                        if (e.key === 'Enter') {
                                            login();
                                        }
                                    }}
                                    type={type ? 'text' : 'password'}
                                    sx={{
                                        width: '100%',
                                        fontSize: '15px',
                                        height: 42,
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setType(!type)}>
                                                {type ? (
                                                    <VisibilityOff sx={{ height: 20 }} />
                                                ) : (
                                                    <Visibility sx={{ height: 20 }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Button
                                disableElevation
                                variant="contained"
                                size="large"
                                onClick={login}
                                sx={{
                                    width: '100%',
                                    mt: 0.8,
                                    mb: 1.5,
                                }}
                            >
                                登录
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={4.5}
                sx={{
                    height: '100%',
                    display: { xs: 'none', md: 'block', lg: 'block' },
                }}
            ></Grid>
        </Grid>
    );
};

export default Login;
