/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 19:25:45
 * @LastEditTime: 2023-05-05 19:45:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\PositionSelect\index.tsx
 */

import React, { useState, useMemo, useEffect } from 'react';
import { AutoComplete, Row, Col, Input, message } from 'antd';
import MapContain from '@/components/MapContain';
import { Map } from 'react-bmapgl';
import { Marker } from 'react-bmapgl';
import type { OptionType } from '@/utils/dictionary';
import { getAutoComplete, getGeocoder, getPoint } from '@/utils/map';
import type { PointType } from '@/utils/map';
import { debounce } from 'lodash';

export type PositionSelectType = {
  address?: string;
  point?: PointType;
};

export type PositionSelectProps = {
  value?: PositionSelectType;
  onChange?: (value: PositionSelectType) => void;
};

const PositionSelect: React.FC<PositionSelectProps> = (props) => {
  const { value, onChange } = props;

  const [address, setAddress] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [point, setPoint] = useState<PointType>();
  const [inputPoint, setInputPoint] = useState('');
  const autoComplete = useMemo(
    () =>
      getAutoComplete({
        onSearchComplete: (result) => {
          autoComplete.hide();
          const res = result.map((item) => {
            return {
              label: item.value,
              value: item.value,
            };
          });
          setOptions(res);
        },
      }),
    [],
  );
  const geoCoder = getGeocoder();

  useEffect(() => {
    if (point && point.lat && point.lng) {
      setInputPoint(`${point?.lng},${point?.lat}`);
    }
  }, [point]);

  useEffect(() => {
    setAddress(value?.address || '');
    if (value?.point) {
      const result = getPoint(value.point?.lng, value.point?.lat);
      if (result) {
        setPoint(result);
      }
    }
  }, [value]);

  const autoSearch = debounce((data: string) => {
    autoComplete.search(data);
  }, 700);

  const onSelect = (data: string) => {
    geoCoder.then((geo) => {
      geo.getPoint(data, (result) => {
        if (result) {
          setPoint(result);
          onChange?.({
            address: data,
            point: {
              lng: result.lng,
              lat: result.lat,
            },
          });
        }
      });
    });
  };

  const getAddress = (pointObj: PointType) => {
    geoCoder.then((geo) => {
      geo.getLocation(pointObj, (res) => {
        if (res) {
          if (res.surroundingPois && res.surroundingPois.length) {
            setPoint(res.surroundingPois[0].point);
            setAddress(res.surroundingPois[0].address + res.surroundingPois[0].title);
            onChange?.({
              address: res.surroundingPois[0].address + res.surroundingPois[0].title,
              point: {
                lng: pointObj.lng,
                lat: pointObj.lat,
              },
            });
          } else if (res.address) {
            setPoint(point);
            setAddress(res.address);
            onChange?.({
              address: res.address,
              point: {
                lng: pointObj.lng,
                lat: pointObj.lat,
              },
            });
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
    if (e && e.latlng) {
      getAddress(e.latlng);
    }
  };

  const onPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setInputPoint(inputValue);
  };

  const onBlur = () => {
    const pointObj = inputPoint.split(',');
    if (point?.lng + '' !== pointObj[0] || point?.lat + '' !== pointObj[1]) {
      try {
        getAddress(new window.BMapGL.Point(Number(pointObj[0]), Number(pointObj[1])) as PointType);
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
        <Map
          style={{ height: 220 }}
          center={{ lng: 114.07365, lat: 22.68774 }}
          zoom={15}
          enableScrollWheelZoom
          onClick={onClick}
        >
          {point && (
            <Marker
              position={point}
              enableDragging
              autoViewport
              viewportOptions={{
                zoomFactor: -12,
              }}
            />
          )}
        </Map>
      </MapContain>
    </>
  );
};

export default PositionSelect;
