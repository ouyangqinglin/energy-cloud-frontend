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
  'GET /api/accounts/list': {
    msg: '操作成功',
    code: 200,
    total: 3,
    data: [
      {
        id: '1',
        account: '123132@qq.com',
        userName: '王欢喜',
        role: '客户',
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
        role: '客户',
        phone: '1231231321',
        serviceOrganization: '深圳工程部',
        状态: 1,
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
        role: '客户',
        phone: '1231231321',
        serviceOrganization: '深圳工程部',
        状态: 0,
        note: '',
        updateTime: '2023-4-20 14:00:00',
        createTime: '2023-4-20 14:00:00',
        creator: '王欢喜2',
        operator: '王欢喜2',
      },
    ],
  },
};
