import { isNumber } from 'lodash';
import type { SVGProps } from 'react';
import { keepTwoDecimalWithoutNull } from '../../helper';
import { SubSystemType, SystemDiagramRes } from '../type';
const SvgComponent = (props: SVGProps<SVGSVGElement> & { data: SystemDiagramRes }) => {
  const { data } = props;
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  const chargeStack = data?.[SubSystemType.CS] ?? {};
  const load = data?.[SubSystemType.L] ?? {};
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <g transform="rotate(180 189.312 109.077)">
          <path
            id="path-1"
            stroke="#B4B4B4"
            strokeLinecap="square"
            d="m61.275 21.471 224.849 152.183"
          />
          <path
            stroke="#B4B4B4"
            strokeLinecap="square"
            d="M61.273 21.47c22.689 40.195 26.086 75.704 10.192 106.528C55.571 158.822 31.749 177.666 0 184.528"
          />
          <path
            stroke="#B4B4B4"
            strokeLinecap="square"
            d="M61.275 21.47C93.922 33.898 131.719 38.4 174.663 34.978 217.607 31.555 252.041 19.896 277.965 0"
          />
        </g>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(0 113)"
          >
            <tspan x={0} y={15}>
              {'市电功率(kW)：'}
            </tspan>
          </text>
          <text
            fill="#1D2129"
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(0 113)"
          >
            <tspan x={102} y={15}>
              {electricSupply.p ?? '--'}
            </tspan>
          </text>
        </g>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={12}
          transform="translate(317 192)"
        >
          <tspan x={10} y={93} fill="#606266">
            {'充电桩(kW)：'}
          </tspan>
          <tspan x={83.5} y={93} fill="#1D2129">
            {chargeStack?.p ?? '--'}
          </tspan>
        </text>
        <text
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontSize={12}
          transform="translate(317 192)"
        >
          <tspan x={140} y={93} fill="#606266">
            {'其他(kW)：'}
          </tspan>
          <tspan x={201.5} y={93} fill="#1D2129">
            {load.p ?? '--'}
          </tspan>
        </text>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(364 310)"
          >
            <tspan x={0} y={15}>
              {'用电功率(kW)：'}
            </tspan>
          </text>
          <text
            fill="#1D2129"
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(364 310)"
          >
            <tspan x={99} y={15}>
              {keepTwoDecimalWithoutNull(load.p + chargeStack.p)}
            </tspan>
          </text>
        </g>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(0 286)"
          >
            <tspan x={0} y={15}>
              {'发电功率(kW)：'}
            </tspan>
          </text>
          <text
            fill="#1D2129"
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(0 286)"
          >
            <tspan x={124} y={15}>
              {pv.p ?? '--'}
            </tspan>
          </text>
        </g>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(0 310)"
          >
            <tspan x={0} y={15}>
              {'当日发电量(kWh)：'}
            </tspan>
          </text>
          <text
            fill="#1D2129"
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(0 310)"
          >
            <tspan x={124} y={15}>
              {pv.charge ?? '--'}
            </tspan>
          </text>
        </g>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(368 113)"
          >
            <tspan x={0} y={15}>
              {'储能功率(kW)：'}
            </tspan>
          </text>
          <text
            fill="#1D2129"
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(368 113)"
          >
            <tspan x={102} y={15}>
              {energyStore?.p ?? '--'}
            </tspan>
          </text>
        </g>
        <g fontSize={14}>
          <text
            fill="#606266"
            fontFamily="PingFangSC-Regular, PingFang SC"
            transform="translate(368 139)"
          >
            <tspan x={0} y={15}>
              {'SoC：'}
            </tspan>
          </text>
          <text
            fontFamily="PingFangSC-Semibold, PingFang SC"
            fontWeight={500}
            transform="translate(368 139)"
            x={102}
            y={15}
          >
            <tspan fill="#1D2129">{energyStore.soc ?? '--'}</tspan>
            <tspan fill="#999" fontSize={12}>
              {'%'}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};
export default SvgComponent;
