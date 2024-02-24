/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:31:02
 * @LastEditTime: 2023-12-03 18:11:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\SiteMap\index.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import { getPoint } from '@/utils/map';
import { useRequest } from 'umi';
import { getSite, getVehicle } from '../service';
import styles from '../index.less';
import SiteIcon from '@/assets/image/exchange-site/site-maker.png';
import DrivingIcon from '@/assets/image/exchange-site/driving-maker.png';
import OfflineIcon from '@/assets/image/exchange-site/offline-maker.png';
import SleepIcon from '@/assets/image/exchange-site/sleep-maker.png';
import { getLocale } from '@/utils';
import { AmapLang } from '@/utils/dictionary';

export type SiteMapType = {
  className?: string;
};

const iconMap = new window.Map([
  ['01', DrivingIcon],
  ['02', OfflineIcon],
  ['03', SleepIcon],
]);

const SiteMap: React.FC<SiteMapType> = (props) => {
  const { className, children } = props;

  const [center, setCenter] = useState<AMap.LngLat>();

  const lang = useMemo(() => {
    return getLocale().isZh ? '' : AmapLang.En;
  }, []);

  const { data: siteData } = useRequest(getSite);
  const { data: vehicleData } = useRequest(getVehicle);

  useEffect(() => {
    getPoint(117.12, 34.2).then((point) => {
      setCenter(point);
    });
  }, []);

  const siteMakers = useMemo(() => {
    return center ? (
      siteData?.map?.((item) => {
        return (
          <Marker
            key={item.id}
            icon={
              new AMap.Icon({
                imageSize: new AMap.Size(38, 55),
                image: SiteIcon,
              })
            }
            offset={new AMap.Pixel(-19, -27)}
            position={new AMap.LngLat(item.rtLon, item.rtLat)}
          />
        );
      })
    ) : (
      <></>
    );
  }, [siteData, center]);

  const vehicleMakers = useMemo(() => {
    return center ? (
      vehicleData?.map?.((item) => {
        return (
          <Marker
            key={item.autoId}
            icon={
              new AMap.Icon({
                imageSize: new AMap.Size(38, 55),
                image: iconMap.get(item.isOnline ?? '01'),
              })
            }
            offset={new AMap.Pixel(-13, -30)}
            position={new AMap.LngLat(item.lon, item.lat)}
          />
        );
      })
    ) : (
      <></>
    );
  }, [vehicleData, center]);

  return (
    <>
      <MapContain className={`${className} ${styles.map}`} style={{ height: '500px' }}>
        <Map center={center} zoom={4} lang={lang}>
          <>
            {siteMakers}
            {vehicleMakers}
          </>
        </Map>
        {children}
      </MapContain>
    </>
  );
};

export default SiteMap;
