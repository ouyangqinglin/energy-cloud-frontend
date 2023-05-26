export default {
  'GET /api/accounts/get/provider': {
    msg: '操作成功',
    code: 200,
    data: {
      provider: [
        { id: '1', name: '海南服务商' },
        { id: '2', name: '珠海服务商' },
        { id: '3', name: '深圳服务商' },
      ],
    },
  },
  'GET /api/accounts/get/roles': {
    msg: '操作成功',
    code: 200,
    data: [
      { id: '11', role: '客户' },
      { id: '22', role: '运维人员' },
      { id: '33', role: '服务商' },
    ],
  },
  'GET /api/accounts/list': {
    msg: '操作成功',
    code: 200,
    total: 3,
    data: [
      {
        id: '1',
        account: '123132@qq.com',
        userName: '王欢喜',
        roles: '客户',
        provider: '1',
        phone: '1231231321',
        serviceOrganization: '深圳工程部',
        status: 1,
        note: '',
        updateTime: '2023-4-20 14:00:00',
        createTime: '2023-4-20 14:00:00',
        creator: '王欢喜',
        operator: '王欢喜',
      },
      {
        id: '11',
        account: '123132@qq.com',
        userName: '王欢喜1',
        roles: '客户',
        provider: '1',
        phone: '1231231321',
        serviceOrganization: '深圳工程部',
        status: 0,
        note: '',
        updateTime: '2023-4-20 14:00:00',
        createTime: '2023-4-20 14:00:00',
        creator: '王欢喜1',
        operator: '王欢喜1',
      },
      {
        id: '111',
        account: '123131232@qq.com',
        userName: '王欢喜2',
        roles: '客户',
        provider: '1',
        phone: '1231231321',
        serviceOrganization: '深圳工程部',
        status: 1,
        note: '',
        updateTime: '2023-4-20 14:00:00',
        createTime: '2023-4-20 14:00:00',
        creator: '王欢喜2',
        operator: '王欢喜2',
      },
    ],
  },
  'GET /api/accounts/save/customerInfo': {
    msg: '操作成功',
    code: 200,
    data: {},
  },
  'GET /api/accounts/get/customerInfo': {
    msg: '操作成功',
    code: 200,
    data: {
      // provider: '1',
      // account: '123',
      // userName: 'zcg',
      phone: '12313123',
      roles: ['11'],
      status: 0,
      pw: '123132',
      note: '',
    },
  },
};
