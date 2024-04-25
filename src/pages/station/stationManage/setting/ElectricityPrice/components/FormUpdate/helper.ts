import dayjs from 'dayjs';
import moment from 'moment';

export const timeList = (() => {
  const timeIntervals = [];
  // 设置初始时间为今天的凌晨 00:00
  const startTime = moment().startOf('day');
  // 循环24小时，每次增加半小时
  for (let i = 0; i < 48; i++) {
    // 将当前时间添加到数组
    timeIntervals.push({
      label: startTime.format('HH:mm'),
      value: startTime.format('HH:mm:ss'),
      id: i,
    });
    // 增加30分钟
    startTime.add(30, 'minutes');
  }
  timeIntervals.push({ label: '24:00', value: '23:59:00', id: timeIntervals.length });
  return timeIntervals;
})();

export const isWholeDay = (times: { ts: Date; tn: Date }[]) => {
  if (!Array.isArray(times) || times.length <= 0) {
    return false;
  }

  // 排序，按时间小到大
  const sortedTimes = times
    .map(({ ts, tn }) => ({
      ts: dayjs(ts).unix(),
      tn: dayjs(tn).unix(),
    }))
    .sort((a, b) => a.ts - b.ts);

  let start = 0;
  let end = 0;
  const oneDayDuration = dayjs().endOf('d').subtract(1, 'm').diff(dayjs().startOf('d'), 's');

  return sortedTimes.some(({ ts, tn }) => {
    // 时间存在间隔
    if (ts > end) {
      if (end - start >= oneDayDuration) {
        return true;
      }
      start = ts;
      end = tn;
    } else {
      if (tn > end) {
        end = tn;
      }
    }
    return end - start >= oneDayDuration;
  });
};

const TimeCollections = class {
  value = new Map<string, [Date, Date]>();
  reset = () => {
    this.value.clear();
  };
  update = (key: string, _value: any) => {
    this.value.set(key, _value);
  };
  get = (key: string) => {
    return this.value.get(key);
  };
  remove = (key: string) => {
    this.value.delete(key);
  };
};
export const timeStore = new TimeCollections();
