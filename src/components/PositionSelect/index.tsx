/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 19:25:45
 * @LastEditTime: 2023-05-13 14:06:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\PositionSelect\index.tsx
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AutoComplete, Row, Col, Input, message } from 'antd';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import type { OptionType } from '@/utils/dictionary';
import { getAutoComplete, getGeocoder, getPoint } from '@/utils/map';
import { debounce } from 'lodash';

export type PositionSelectType = {
  address?: string;
  point?: AMap.LngLat;
};

export type PositionSelectProps = {
  value?: PositionSelectType;
  onChange?: (value: PositionSelectType) => void;
};

const PositionSelect: React.FC<PositionSelectProps> = (props) => {
  const { value, onChange } = props;

  const [address, setAddress] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [point, setPoint] = useState<AMap.LngLat>();
  const [inputPoint, setInputPoint] = useState('');
  const [center, setCenter] = useState<AMap.LngLat>();
  const [zoom, setZoom] = useState(11);

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
        }
      });
    }
  }, [value]);

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
    onChange?.({
      address: data.label,
      point: {
        lng: data.location.lng,
        lat: data.location.lat,
      },
    });
    setCenter(data.location);
    setZoom(17);
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
            setPoint(pointObj);
            setAddress(res.regeocode.formattedAddress);
            onChange?.({
              address: res.regeocode.formattedAddress,
              point: {
                lng: pointObj.lng,
                lat: pointObj.lat,
              },
            });
            setCenter(pointObj);
            setZoom(17);
            // let code = result.regeocode.addressComponent.adcode;
            // code = code ? code * 1 : 900000;
            // emit('update:province', parseInt(code / 10000 + '') + '0000');
            // emit('update:city', parseInt(code / 100 + '') + '00');
            // emit('update:area', code);
          } else {
            message.success('坐标无效');
          }
        } else {
          message.success('坐标无效');
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
    if (e && e.lnglat) {
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

  return (
    <>
      <Row>
        <Col flex="auto">
          <AutoComplete
            className="mb8"
            value={address}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onAutoCompleteChange}
            placeholder="请输入地址"
          ></AutoComplete>
        </Col>
        <Col flex="200px">
          <Input
            value={inputPoint}
            placeholder="请输入坐标:lng,lat"
            onChange={onPointChange}
            onBlur={onBlur}
          />
        </Col>
      </Row>
      <MapContain>
        <Map center={center} zoom={zoom} onClick={onClick}>
          {point && <Marker position={point} />}
        </Map>
      </MapContain>
    </>
  );
};

export default PositionSelect;
