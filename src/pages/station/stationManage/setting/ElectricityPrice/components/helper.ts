import dayjs from 'dayjs';

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
  const oneDayDuration = dayjs().endOf('d').subtract(15, 'm').diff(dayjs().startOf('d'), 's');

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
};
export const timeStore = new TimeCollections();
