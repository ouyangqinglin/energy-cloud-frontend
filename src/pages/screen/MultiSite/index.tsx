/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-21 15:07:56
 * @LastEditTime: 2024-06-12 16:31:53
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
import SiteMap from './SiteMap';
import '@/assets/styles/font.less';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackRender from '@/components/FallBackRender';

const MultiSite: React.FC = () => {
  return (
    <>
      <Layout
        screenH={1080}
        screenW={1920}
        palette={{
          backgroundImage: bg,
        }}
        scaleMode={ScaleMode.EQUAL}
      >
        <ErrorBoundary fallbackRender={FallBackRender}>
          <Title />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <ScreenTime />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <FullScreen />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <SiteRange />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <SystemRun />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <Alarm />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <Task />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <Device />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <SaveEnergy />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <IncomeStat />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <SiteMap />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={FallBackRender}>
          <InstallCapacity />
        </ErrorBoundary>
      </Layout>
    </>
  );
};

export default MultiSite;
