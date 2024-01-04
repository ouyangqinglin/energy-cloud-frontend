import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcodejs2';
import { getVersionList, getFileUrl } from '@/pages/system/version/service';
import android from '@/assets/image/android.png';
import styles from './index.less';

const DownloadApp: React.FC = () => {
  const qrRef = useRef<null | HTMLDivElement>(null);
  const [fileUrl, setFileUrl] = useState<string>('');

  const getPersonQRCode = (url: string) => {
    const qrcode = new QRCode(qrRef.current, {
      width: qrRef.current?.clientWidth,
      height: qrRef.current?.clientWidth,
    });
    qrcode.makeCode(url);
  };

  const getDownloadUrl = () => {
    getVersionList({ appType: 1, platform: 0 }).then(({ data }) => {
      const { list } = data || {};
      const { url } = (list || [])[0];
      if (!url) return;
      getFileUrl({ url, platform: 2 }).then((res) => {
        setFileUrl(res?.data || '');
        getPersonQRCode(res?.data || '');
      });
    });
  };

  useEffect(() => {
    getDownloadUrl();
  }, []);

  const downlaodApp = () => {
    window.open(fileUrl);
  };

  return (
    <div className={styles.container}>
      <div className="qr-wrap">
        <div className="qrcode" ref={qrRef} />
      </div>
      <div className="desc">手机扫码快速进入</div>
      <div className="download-btn" onClick={downlaodApp}>
        <img src={android} alt="" />
        Android下载
      </div>
    </div>
  );
};

export default DownloadApp;
