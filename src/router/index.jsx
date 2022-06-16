import Home from '@/views/Layout/Home';
import Order from '@/views/Layout/Order';

export const routeMap = [
    {
        id: 0,
        title: '首页',
        auth: true,
        path: '/home',
        component: Home,
        children: [],
    },
    {
        id: 1,
        title: '订单管理',
        auth: true,
        path: '/order',
        component: Order,
        children: [],
    },
];
