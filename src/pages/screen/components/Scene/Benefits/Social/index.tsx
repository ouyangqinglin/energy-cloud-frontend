import type { FC } from 'react';
import Decoration from '../../../Decoration';
import Cell from '../../../LayoutCell';
import DigitalFlipperGroup from '../../../DigitalFlipper/Group';
import type { DigitalFlipperItemProps } from '../../../DigitalFlipper/Item';
import useWebsocket from '@/pages/screen/useWebsocket';
import { BenefitsRes } from '../type';

type Props = Pick<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree'>;

const BenefitSocial: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: '累计节能减排',
      unit: '吨',
      num: props.conserveEnergyReduceEmissions,
    },
    {
      title: '等效种植树木',
      unit: '颗',
      num: props.cumulativeTree,
    },
  ];

  // console.log('render much times');
  // const { connection } = useWebsocket();
  // connection.addReceivedMessageCallback((msg) => {
  //   console.log('ws: ', msg);
  // });
  return (
    <Cell width={328} height={118} left={1108} top={58}>
      <Decoration disableIcon disableDecoration title="社会效益">
        <DigitalFlipperGroup config={config} />
      </Decoration>
    </Cell>
  );
};
export default BenefitSocial;
