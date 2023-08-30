/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-21 15:07:56
 * @LastEditTime: 2023-08-29 10:08:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\index.tsx
 */

import React from 'react';
import Layout, { ScaleMode } from '../components/Layout';
import ScreenTime from './Time';
import Title from './Title';
import bg from '@/assets/image/multi-site/bg.png';
import FullScreen from '../components/FullScreen';
import SiteRange from './SiteRange';
import SystemRun from './SystemRun';
import Alarm from './Alarm';
import Device from './Device';
import Task from './Task';
import SaveEnergy from './SaveEnergy';
import IncomeStat from './IncomeStat';
import InstallCapacity from './InstallCapacity';
import ChinaMap from './ChinaMap';

const MultiSite: React.FC = () => {
  return (
    <>
      <Layout
        screenH={1080}
        screenW={1920}
        palette={{
          backgroundImage: bg,
        }}
        scaleMode={ScaleMode.H_SCALE}
      >
        <Title />
        <ScreenTime />
        <FullScreen />
        {/* 站点排名 */}
        <SiteRange />
        <SystemRun />
        <Alarm />
        <Task />
        <Device />
        <SaveEnergy />
        <IncomeStat />
        <ChinaMap />
        <InstallCapacity />
      </Layout>
    </>
  );
};

export default MultiSite;
