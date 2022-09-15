// import request from '../http/request';
import { defHttp } from '@/http/axios';

export const getTableData = (params:any={}) => {
    defHttp.get({
        url: 'auth/user',
        params: {
            access_token: '9fae97ee3b60a77444e596537fcb5acfecb27f95a1f298a4f669a92584506282',
            product_name: '火花情报站'
        },
        headers: {
          ignoreCancelToken: true,
        },
    });
};
