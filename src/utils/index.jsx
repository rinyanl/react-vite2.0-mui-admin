import Toast from '@/components/Toast';

// 分离search参数
export const qsParse = () => {
    let transtr = location.search;
    transtr = transtr.replace('?', '');

    let authstr = /.*?&.*/;
    let obj = {};

    if (authstr.test(transtr)) {
        let str1 = transtr.split('&');
        str1.map(m => {
            let temp = m.split('=');

            if (!obj[temp[0]]) {
                obj[temp[0]] = temp[1];
            }
        });
    } else {
        let str1 = transtr.split('=');
        obj[str1[0]] = str1[1];
    }

    return obj;
};
