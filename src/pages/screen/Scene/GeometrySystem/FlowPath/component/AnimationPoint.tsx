import { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { PathConfigType } from '../../../Geometry/EnergyFlowAnimation/type';
import { reverse as reverseArr } from 'lodash';

const AnimationPoint = ({
  duration = 4,
  delay,
  reverse = false,
  direction = FlowDirection.IN,
  pathId,
}: Partial<PathConfigType> & {
  direction?: FlowDirection;
  pathId: string;
}) => {
  const keyPointList = [0, 1];
  if (reverse) {
    keyPointList.reverse();
  }
  if (direction === FlowDirection.OUT) {
    keyPointList.reverse();
  }
  console.log(pathId, keyPointList, direction);

  return direction !== FlowDirection.STOP ? (
    <circle r="4" fill="#0F6">
      <animateMotion
        dur={duration + 's'}
        keyPoints={keyPointList.join(';')}
        keyTimes="0;1"
        repeatCount="indefinite"
      >
        <mpath xlinkHref={pathId} />
      </animateMotion>
    </circle>
  ) : (
    <></>
  );
};

export default AnimationPoint;
