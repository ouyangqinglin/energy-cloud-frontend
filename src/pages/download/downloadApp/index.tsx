import React from 'react';
import android from '@/assets/image/android.png';
import styles from './index.less';

const DownloadApp: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className="desc">手机扫码快速进入</div>
      <div className="download-btn">
        <img src={android} alt="" />
        Android下载
      </div>
    </div>
  );
};

export default DownloadApp;
