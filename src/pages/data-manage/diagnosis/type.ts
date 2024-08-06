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

export type AddTaskParams = {
  /**
   * 查询参数，后面多种导出 可能会有不同的传参 必须是json
   */
  config: Config;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 任务名称
   */
  name: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 任务导出类型，目前只有0
   */
  type: number;
  [property: string]: any;
}

/**
* 查询参数，后面多种导出 可能会有不同的传参 必须是json
*/
export type Config = {
  keyValue: KeyValue[];
  [property: string]: any;
}

export type KeyValue = {
  deviceId?: number;
  deviceName?: string;
  key?: string;
  name?: string;
  [property: string]: any;
}