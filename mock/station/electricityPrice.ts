export default {
  'GET /api/electricityPrice/rules': {
    msg: '操作成功',
    code: 200,
    data: {
      rules: [
        { id: '1', name: '规则一' },
        { id: '2', name: '规则二' },
        { id: '3', name: '规则三' },
      ],
    },
  },
  'GET /api/electricityPrice/market/list': {
    msg: '操作成功',
    code: 200,
    data: [
      {
        ruleName: '123',
        effectiveTime: '2023/12/23 12:00',
        updateTime: '2023/12/23 12:00',
        operator: '王欢喜',
        status: '1',
      },
    ],
  },
};
