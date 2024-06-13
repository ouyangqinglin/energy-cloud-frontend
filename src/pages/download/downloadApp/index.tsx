import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import QRCode from 'qrcodejs2';
import { getVersionList, getFileUrl } from '@/pages/system/version/service';
import android from '@/assets/image/android.png';
import styles from './index.less';
import { defaultSystemInfo } from '@/utils/config';
import { Button, Typography } from 'antd';
import zhBg from '@/assets/image/app_download_bg.png';
import enBg from '@/assets/image/app_download_bg_en.png';
import { formatMessage, getLocale, initLocale } from '@/utils';
import { SelectLang } from 'umi';

const DownloadApp: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [version, setVersion] = useState('');

  const isIOS = useMemo(() => {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }, []);

  const onLangClick = useCallback(({ key }) => {
    initLocale(key);
  }, []);

  const getDownloadUrl = () => {
    getVersionList({ appType: 2, platform: 0 }).then(({ data }) => {
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
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${getLocale().isZh ? zhBg : enBg})`,
      }}
    >
      {SelectLang && <SelectLang className={styles.lang} onItemClick={onLangClick} />}
      <div className="download-btn">
        <Button type="primary" onClick={downlaodApp}>
          {formatMessage({ id: 'system.1015', defaultMessage: '下载App' })}
        </Button>
        <div className="mt12">
          <Typography.Text type="secondary">
            {formatMessage({ id: 'system.1016', defaultMessage: '版本号' })}：{version}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
