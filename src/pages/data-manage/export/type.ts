export type TaskInfo = {
  // id
  taskId: number;
  // 任务名称
  taskName: string;
  // 开始时间
  createTime: string;
  // 结束时间
  updateTime: string;
  // 查询参数
  query: string;
  // 任务状态
  taskStatus: number;
  // 进度
  schedule: string;
};
