import React, { useEffect, useState, useRef, useMemo } from 'react';
import QRCode from 'qrcodejs2';
import { getVersionList, getFileUrl } from '@/pages/system/version/service';
import android from '@/assets/image/android.png';
import styles from './index.less';
import { defaultSystemInfo } from '@/utils/config';
import { Button, Typography } from 'antd';

const DownloadApp: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [version, setVersion] = useState('');

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
      if (data?.list?.[0]?.version) {
        setVersion(data?.list?.[0]?.version);
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
      <div className="download-btn">
        <Button type="primary" onClick={downlaodApp}>
          下载App
        </Button>
        <div className="mt12">
          <Typography.Text type="secondary">版本号：{version}</Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
