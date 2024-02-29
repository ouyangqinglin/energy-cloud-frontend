/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-28 14:47:39
 * @LastEditTime: 2024-02-28 17:18:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\PositionSelect\Google.tsx
 */

import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { AutoComplete, Row, Col, Input, message } from 'antd';
import { Marker } from 'google-maps-react';
import GoogleMap from '../Map/GoogleMap';
import type { OptionType } from '@/types';
import { getAutoComplete, getGeocoder, getPoint } from '@/utils/map';
import { debounce } from 'lodash';
import { formatMessage, getAreaCodeByAdCode, getLocale } from '@/utils';
import { AmapLang } from '@/utils/dictionary';
import { PositionSelectType } from '.';
import MapContext from '../MapContain/MapContext';

const GooglePositionSelect: React.FC<PositionSelectType> = (props) => {
  const { value, onChange, disabled, readonly, className, initCenter } = props;

  const { google } = useContext(MapContext);
  const [address, setAddress] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [point, setPoint] = useState<AMap.LngLat>();
  const [inputPoint, setInputPoint] = useState('');
  const [center, setCenter] = useState<AMap.LngLat>();
  const [zoom, setZoom] = useState(11);

  const lang = useMemo(() => {
    return getLocale().isZh ? '' : AmapLang.En;
  }, []);

  const autoSearch = useCallback(
    debounce((data: string) => {
      getAutoComplete().then(({ search }) => {
        search(data).then((result: any) => {
          setOptions(result);
        });
      });
    }, 700),
    [],
  );

  const onSelect = (_: any, data: any) => {
    setPoint(data.location);
    const [countryCode, provinceCode, cityCode] = getAreaCodeByAdCode(data?.adcode || '');
    onChange?.({
      address: data.label,
      point: {
        lng: data.location.lng,
        lat: data.location.lat,
      },
      countryCode,
      provinceCode,
      cityCode,
      adcode: data.adcode,
    });

    // const code = item.adcode ? item.adcode * 1 : 900000;
    // emit('update:province', parseInt(code / 10000 + '') + '0000');
    // emit('update:city', parseInt(code / 100 + '') + '00');
    // emit('update:area', code);
  };

  const getAddressByPoint = (pointObj: AMap.LngLat) => {
    getGeocoder().then(({ getAddress }) => {
      getAddress(pointObj).then((res) => {
        if (res) {
          if (res.regeocode && res.regeocode.formattedAddress) {
            const adcode = res?.regeocode?.addressComponent?.adcode || '';
            const [countryCode, provinceCode, cityCode] = getAreaCodeByAdCode(adcode);
            setPoint(pointObj);
            setAddress(res.regeocode.formattedAddress);
            onChange?.({
              address: res.regeocode.formattedAddress,
              point: {
                lng: pointObj.lng,
                lat: pointObj.lat,
              },
              countryCode,
              provinceCode,
              cityCode,
              adcode: res?.regeocode?.addressComponent?.adcode,
            });
          } else {
            message.success(
              formatMessage({ id: 'device.invalidCoordinates', defaultMessage: '坐标无效' }),
            );
          }
        } else {
          message.success(
            formatMessage({ id: 'device.invalidCoordinates', defaultMessage: '坐标无效' }),
          );
        }
      });
    });
  };

  const onSearch = (data: string) => {
    autoSearch(data);
  };

  const onAutoCompleteChange = (data: string) => {
    setAddress(data);
  };

  const onClick = (e: any) => {
    if (!disabled && !readonly && e && e.lnglat) {
      getAddressByPoint(e.lnglat);
    }
  };

  const onPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setInputPoint(inputValue);
  };

  const onBlur = () => {
    const pointObj = inputPoint.split(',');
    if (
      pointObj.length > 1 &&
      (point?.lng + '' !== pointObj[0] || point?.lat + '' !== pointObj[1])
    ) {
      try {
        getPoint(Number(pointObj[0]), Number(pointObj[1])).then((res) => {
          getAddressByPoint(res);
        });
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (point && point.lat && point.lng) {
      setInputPoint(`${point?.lng},${point?.lat}`);
    }
  }, [point]);

  useEffect(() => {
    setAddress(value?.address || '');
    if (value?.point && value?.point?.lng && value?.point?.lat) {
      getPoint(value.point?.lng, value.point?.lat).then((res) => {
        if (res) {
          setPoint(res);
          setCenter(res);
          setZoom(17);
        }
      });
    }
  }, [value]);

  useEffect(() => {
    if (!value?.point) {
      setCenter(initCenter);
    }
  }, [value, initCenter]);

  return (
    <>
      <div className={className}>
        <Row>
          <Col flex="auto">
            {readonly ? (
              // address + inputPoint
              address
            ) : (
              <AutoComplete
                className="mb8 w-full"
                value={address}
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onAutoCompleteChange}
                placeholder={
                  formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                  formatMessage({ id: 'common.address', defaultMessage: '地址' })
                }
                disabled={disabled}
              />
            )}
          </Col>
          {!readonly && (
            <Col flex="200px">
              <Input
                value={inputPoint}
                placeholder={
                  formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                  formatMessage({ id: 'common.coordinate', defaultMessage: '坐标' }) +
                  ':lng,lat'
                }
                onChange={onPointChange}
                onBlur={onBlur}
                disabled={disabled}
              />
            </Col>
          )}
        </Row>
        <GoogleMap
          google={google}
          center={center}
          zoom={zoom}
          onClick={onClick}
          style={{
            height: '220px',
          }}
          lang={lang}
        >
          {point && <Marker position={point} />}
        </GoogleMap>
      </div>
    </>
  );
};

export default GooglePositionSelect;
