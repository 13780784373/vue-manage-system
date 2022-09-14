import request from '../http/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};
