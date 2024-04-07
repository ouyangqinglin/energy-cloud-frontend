/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-28 14:47:39
 * @LastEditTime: 2024-04-07 11:38:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\PositionSelect\Google.tsx
 */

import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { AutoComplete, Row, Col, Input, message } from 'antd';
import { Marker, mapEventHandler } from 'google-maps-react';
import GoogleMap from '../Map/GoogleMap';
import type { OptionType } from '@/types';
import { debounce } from 'lodash';
import { formatMessage } from '@/utils';
import { PositionSelectType } from '.';
import MapContext from '../MapContain/MapContext';
import { useAutocomplete, useGeocoder } from '@/hooks';

const GooglePositionSelect: React.FC<PositionSelectType> = (props) => {
  const { value, onChange, disabled, readonly, className, initCenter } = props;

  const mapRef = useRef<google.maps.Map>();
  const { google } = useContext(MapContext);
  const [address, setAddress] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [point, setPoint] = useState<google.maps.LatLngLiteral>();
  const [inputPoint, setInputPoint] = useState('');
  const [center, setCenter] = useState<google.maps.LatLngLiteral>();
  const [autocompleteParams, setAutocompleteParams] = useState<google.maps.AutocompletionRequest>();
  const [geocoderParams, setGeocoderParams] = useState<google.maps.GeocoderRequest>();

  const onGeoSuccess = useCallback(
    (result: google.maps.GeocoderResult) => {
      if (geocoderParams?.location) {
        setPoint(geocoderParams?.location);
        setAddress(result?.formatted_address);
        onChange?.({
          address: result?.formatted_address,
          point: {
            lng: geocoderParams?.location?.lng,
            lat: geocoderParams?.location?.lat,
          },
          // countryCode,
          // provinceCode,
          // cityCode,
          // adcode: res?.regeocode?.addressComponent?.adcode,
        });
      } else if (geocoderParams?.placeId) {
        const pointResult = {
          lng: result?.geometry?.location?.lng(),
          lat: result?.geometry?.location?.lat(),
        };
        const addressResult = options?.find?.((item) => item.place_id == geocoderParams?.placeId)
          ?.value as string;
        setPoint(pointResult);
        setAddress(addressResult);
        onChange?.({
          address: addressResult,
          point: {
            ...pointResult,
          },
          // countryCode,
          // provinceCode,
          // cityCode,
          // adcode: res?.regeocode?.addressComponent?.adcode,
        });
      }
    },
    [geocoderParams, options],
  );

  const onGeoError = useCallback(() => {
    message.success(formatMessage({ id: 'device.invalidCoordinates', defaultMessage: '坐标无效' }));
  }, []);

  useGeocoder({
    params: geocoderParams,
    onSuccess: onGeoSuccess,
    onError: onGeoError,
  });

  const onAutoSuccess = useCallback((result: google.maps.AutocompletionRequest[]) => {
    setOptions(result?.map?.((item) => ({ ...item, value: item.description })));
  }, []);

  useAutocomplete({
    params: autocompleteParams,
    onSuccess: onAutoSuccess,
  });

  const autoSearch = useCallback(
    debounce((data: string) => {
      setAutocompleteParams({ input: data });
    }, 700),
    [],
  );

  const onSelect = (_: any, data: any) => {
    setGeocoderParams({
      placeId: data.place_id,
    });
  };

  const onSearch = (data: string) => {
    autoSearch(data);
  };

  const onAutoCompleteChange = (data: string) => {
    setAddress(data);
  };

  const onClick = useCallback<mapEventHandler>((prop, map, e) => {
    if (!disabled && !readonly && e && e.latLng) {
      setGeocoderParams({
        location: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      });
    }
  }, []);

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
      setGeocoderParams({
        location: {
          lat: point?.lng,
          lng: point?.lat,
        },
      });
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
      setPoint(value?.point);
      setCenter(value?.point);
      mapRef?.current?.setZoom?.(17);
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
          ref={mapRef}
          google={google}
          center={center}
          zoom={11}
          onClick={onClick}
          style={{
            height: '220px',
          }}
        >
          {point && <Marker position={point} />}
        </GoogleMap>
      </div>
    </>
  );
};

export default GooglePositionSelect;
