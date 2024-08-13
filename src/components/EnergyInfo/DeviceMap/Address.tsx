/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-08-12 14:17:10
 * @LastEditTime: 2024-08-12 14:17:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Map\Address.tsx
 */

import { useGeocoder } from '@/hooks';
import { isEmpty } from '@/utils';
import { MapTypeEnum } from '@/utils/dictionary';
import { getGeocoder, getPoint } from '@/utils/map';
import React, { memo, useCallback, useEffect, useState } from 'react';

type AddressType = {
  lng?: number;
  lat?: number;
  mapType?: MapTypeEnum;
  onChange?: (address: string) => void;
};

const Address: React.FC<AddressType> = (props) => {
  const { lng, lat, mapType, onChange } = props;

  const [geocoderParams, setGeocoderParams] = useState<google.maps.GeocoderRequest>();

  const onGeoSuccess = useCallback(
    (result: google.maps.GeocoderResult) => {
      onChange?.(result?.formatted_address || '');
    },
    [geocoderParams],
  );

  useGeocoder({
    params: geocoderParams,
    onSuccess: onGeoSuccess,
  });

  useEffect(() => {
    if (!isEmpty(lng) && !isEmpty(lat)) {
      if (mapType == MapTypeEnum.AMap) {
        getPoint(Number(lng), Number(lat)).then((point) => {
          getGeocoder().then(({ getAddress }) => {
            getAddress(point).then((res) => {
              if (res) {
                if (res.regeocode && res.regeocode.formattedAddress) {
                  onChange?.(res.regeocode.formattedAddress || '');
                }
              }
            });
          });
        });
      } else {
        setGeocoderParams({
          location: {
            lng: lng as number,
            lat: lat as number,
          },
        });
      }
    }
  }, [lng, lat, mapType]);

  return <></>;
};

export default memo(Address);
