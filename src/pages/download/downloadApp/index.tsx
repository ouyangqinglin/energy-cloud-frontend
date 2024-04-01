import React, { useEffect, useState, useRef, useMemo } from 'react';
import QRCode from 'qrcodejs2';
import { getVersionList, getFileUrl } from '@/pages/system/version/service';
import android from '@/assets/image/android.png';
import styles from './index.less';
import { defaultSystemInfo } from '@/utils/config';

const DownloadApp: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string>('');

  const isIOS = useMemo(() => {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }, []);

  const getDownloadUrl = () => {
    getVersionList({ appType: 1, platform: 0 }).then(({ data }) => {
      const url = data?.list?.[0]?.url;
      if (url) {
        getFileUrl({ url, platform: 2 }).then((res) => {
          setFileUrl(res?.data || '');
        });
      }
    });
  };

  useEffect(() => {
    getDownloadUrl();
  }, []);

  const downlaodApp = () => {
    window.open(isIOS ? defaultSystemInfo.appStore : fileUrl);
  };

  return (
    <div className={styles.container}>
      <div className="download-btn" onClick={downlaodApp}>
        <img src={android} alt="" />
        下载App
      </div>
    </div>
  );
};

export default DownloadApp;
