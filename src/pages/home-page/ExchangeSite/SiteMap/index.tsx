/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:31:02
 * @LastEditTime: 2023-12-02 15:31:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Map\index.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import { getPoint } from '@/utils/map';
import { useRequest } from 'umi';
import { getSite, getVehicle } from '../service';

const SiteMap: React.FC = () => {
  const [center, setCenter] = useState<AMap.LngLat>();

  const { data: siteData } = useRequest(getSite);
  const { data: vehicleData } = useRequest(getVehicle);

  useEffect(() => {
    getPoint(117.12, 34.2).then((point) => {
      setCenter(point);
    });
  }, []);

  const siteMakers = useMemo(() => {
    return siteData?.map?.((item) => {
      return (
        <Marker
          icon={
            new AMap.Icon({
              imageSize: new AMap.Size(25, 34),
              image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
            })
          }
          offset={new AMap.Pixel(-13, -30)}
          position={new AMap.LngLat(item.rtLon, item.rtLat)}
        />
      );
    });
  }, [siteData]);

  const vehicleMakers = useMemo(() => {
    return vehicleData?.map?.((item) => {
      return (
        <Marker
          icon={
            new AMap.Icon({
              imageSize: new AMap.Size(25, 34),
              image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
            })
          }
          offset={new AMap.Pixel(-13, -30)}
          position={new AMap.LngLat(item.lon, item.lat)}
        />
      );
    });
  }, [vehicleData]);

  return (
    <>
      <MapContain style={{ height: '500px' }}>
        <Map center={center} zoom={5}>
          <>
            {siteMakers}
            {vehicleMakers}
          </>
        </Map>
      </MapContain>
    </>
  );
};

export default SiteMap;
