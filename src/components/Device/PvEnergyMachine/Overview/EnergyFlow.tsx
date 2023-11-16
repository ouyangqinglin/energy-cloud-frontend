/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-16 09:27:07
 * @LastEditTime: 2023-11-16 11:06:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Overview\EnergyFlow.tsx
 */

import React from 'react';

export type EnergyFlowType = {
  className?: string;
};

const EnergyFlow: React.FC<EnergyFlowType> = (props) => {
  const { className, children } = props;

  return (
    <>
      <svg className={className} width="380px" height="232px" viewBox="0 0 380 232" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-449.000000, -486.000000)" stroke="#BCC2C6">
            <g transform="translate(212.000000, 102.000000)">
              <g transform="translate(0.000000, 214.000000)">
                <g transform="translate(120.000000, 120.000000)">
                  <g transform="translate(117.000000, 51.000000)">
                    <path
                      d="M0,0 L163.962908,0 C172.796153,0.00848036648 179.958225,7.16675822 179.971386,15.9999978 L180,70 L180,70"
                      id="path-top-left"
                    />
                    <path
                      d="M200,70 L200,16 C200,7.163444 207.163444,-1.53107837e-16 216,0 L380,0 L380,0"
                      id="path-top-right"
                    />
                    <path
                      d="M0,160 L163.962908,160 C172.796153,160.00848 179.958225,167.166758 179.971386,175.999998 L180,230 L180,230"
                      id="path-bottom-left"
                      transform="translate(90.000000, 195.000000) scale(1, -1) translate(-90.000000, -195.000000) "
                    />
                    <path
                      d="M200,230 L200,176 C200,167.163444 207.163444,160 216,160 L380,160 L380,160"
                      id="path-bottom-right"
                      transform="translate(290.000000, 195.000000) scale(1, -1) translate(-290.000000, -195.000000) "
                    />
                    {children}
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export default EnergyFlow;
