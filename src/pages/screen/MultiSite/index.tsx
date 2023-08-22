/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-21 15:07:56
 * @LastEditTime: 2023-08-22 15:21:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\index.tsx
 */

import React from 'react';
import Layout, { ScaleMode } from '../components/Layout';
import ScreenTime from './Time';
import Title from './Title';
import ScreenWeather from './Weather';
import bg from '@/assets/image/multi-site/bg.png';
import FullScreen from '../components/FullScreen';
import SiteRange from './SiteRange';
import SystemRun from './SystemRun';
import Alarm from './Alarm';
import Device from './Device';
import Task from './Task';
import SaveEnergy from './SaveEnergy';
import IncomeStat from './IncomeStat';

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
        <ScreenWeather />
        <FullScreen />
        <SiteRange />
        <SystemRun />
        <Alarm />
        <Task />
        <Device />
        <SaveEnergy />
        <IncomeStat />
      </Layout>
    </>
  );
};

export default MultiSite;
