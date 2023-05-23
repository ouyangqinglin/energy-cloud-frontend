export const CREATE_TIME = {
  title: '创建时间',
  dataIndex: 'createTime',
  valueType: 'dateRange',
  render: (_, record) => <span>{record.createTime}</span>,
  search: {
    transform: (value) => {
      return {
        beginTime: value[0],
        endTime: value[1],
      };
    },
  },
  width: 150,
};
