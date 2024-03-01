/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-01 10:00:03
 * @LastEditTime: 2024-03-01 10:51:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\map\useGeocoder.ts
 */

import { useContext, useEffect, useState } from 'react';
import MapContext from '@/components/MapContain/MapContext';

type useGeocoderType = {} & google.maps.GeocoderRequest;

const useGeocoder = (props: useGeocoderType): google.maps.GeocoderResult | undefined => {
  const {} = props;

  const [geocoderResult, setGeocoderResult] = useState<google.maps.GeocoderResult>();
  const { google } = useContext(MapContext);

  const geocoder = google ? new google.maps.Geocoder() : null;

  useEffect(() => {
    geocoder?.geocode?.(props)?.then?.((result) => {});
  }, [props]);

  return geocoderResult;
};

export default useGeocoder;

let geocoder: any;
export function getGeocoder() {
  return new Promise<google.maps.GeocoderResult>((geoResolve) => {
    mapLoad().then(() => {
      window.AMap.plugin(['AMap.Geocoder'], () => {
        geocoder =
          geocoder || new window.AMap.Geocoder({ lang: getLocale().isZh ? '' : AmapLang.En });

        const getAddress = (point: AMap.LngLat) => {
          return new Promise<any>((resolve, reject) => {
            if (point.lng && point.lat) {
              getPoint(point.lng, point.lat).then((resPoint) => {
                geocoder.getAddress(resPoint, (status: AutoComStatusEnum, result: any) => {
                  if (status === AutoComStatusEnum.Complete) {
                    resolve(result);
                  } else if (status === AutoComStatusEnum.NoData) {
                    resolve({});
                  } else {
                    reject();
                  }
                });
              });
            } else {
              resolve({});
            }
          });
        };

        geoResolve({
          geocoder,
          getAddress,
        });
      });
    });
  });
}
