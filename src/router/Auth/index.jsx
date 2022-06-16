// 路由守卫验证
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from '@/views/Layout';
import Login from '@/views/Login';

const Auth = props => {
    // 获取登录条件
    const { loginStatus } = props;

    // 拿到当前路径，
    const { pathname } = location;

    // 如果为登录状态，前往登录页，重定向到首页，其他情况不做拦截
    if (loginStatus) {
        return (
            <Switch>
                <Route
                    path={import.meta.env.VITE_ROUTE_LAYOUT}
                    render={() => <Layout {...props} />}
                ></Route>
                <Redirect to={import.meta.env.VITE_ROUTE_LAYOUT} />
            </Switch>
        );
    }
    // 非登录情况，检查路由是否存在，若存在即前往登录页，不存在就 404
    else {
        return (
            <Switch>
                <Route
                    path={import.meta.env.VITE_ROUTE_LOGIN}
                    render={() => <Login {...props} />}
                ></Route>
                <Redirect to={import.meta.env.VITE_ROUTE_LOGIN} />
            </Switch>
        );
    }
};

export default Auth;
