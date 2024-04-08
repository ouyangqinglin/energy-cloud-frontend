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

type useGeocoderType = {
  onError?: () => void;
  onSuccess?: (result: google.maps.GeocoderResult) => void;
  params?: google.maps.GeocoderRequest;
};

const useGeocoder = (props: useGeocoderType | undefined) => {
  const [geocoderResult, setGeocoderResult] = useState<google.maps.GeocoderResult>();
  const { google } = useContext(MapContext);

  const geocoder = google ? new google.maps.Geocoder() : null;

  useEffect(() => {
    if (props?.params?.location || props?.params?.address || props?.params?.placeId) {
      geocoder
        ?.geocode?.(props?.params)
        ?.then?.((response) => {
          if (response?.results?.[0]) {
            setGeocoderResult(response.results[0]);
            props?.onSuccess?.(response.results[0]);
          } else {
            props?.onError?.();
          }
        })
        ?.catch?.(() => {
          props?.onError?.();
        });
    }
  }, [props?.params, props?.onSuccess, props?.onError]);

  return {
    geocoderResult,
  };
};

export default useGeocoder;
