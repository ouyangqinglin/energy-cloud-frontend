import { Request, Response } from 'express';

export default {
  'GET /api/station/all': {
    msg: '操作成功',
    code: 200,
    rows: [
      {
        id: '1',
        name: '示范站示范站示范站',
        createTime: '2023-05-04 11:00:12',
        deliveryTime: '2023-05-05 14:04:12',
        country: '中国',
        province: '广东',
        city: '深圳',
        serviceCompany: '深圳永泰深圳永泰深圳永泰深圳永泰深圳永泰深圳永泰',
        status: 0,
        operator: '管理员',
        updateTime: '2023-05-02 09:04:12',
      },
    ],
  },
  'GET /api/stations': {
    msg: '操作成功',
    code: 200,
    rows: [
      {
        id: '1',
        name: '示范站示范站示范站',
        createTime: '2023-05-04 11:00:12',
        deliveryTime: '2023-05-05 14:04:12',
        country: '中国',
        province: '广东',
        city: '深圳',
        serviceCompany: '深圳永泰深圳永泰深圳永泰深圳永泰深圳永泰深圳永泰',
        status: 0,
        operator: '管理员',
        updateTime: '2023-05-02 09:04:12',
      },
    ],
    total: 1,
  },
  'DELETE /api/station/1': {
    msg: '操作成功',
    code: 200,
  },
  'POST /api/station': {
    msg: '操作成功',
    data: 1,
  },
};
