import { $http } from './config.jsx';

// 获取用户列表
export const apiUserlist = data => $http({ url: '/api/userlist', method: 'get', data });

// 创建 clash 规则
export const apiCreateClashRule = data =>
    $http({ url: '/api/createclashrule', method: 'post', data });
