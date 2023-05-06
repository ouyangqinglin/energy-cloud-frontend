/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-05 10:35:47
 * @LastEditTime: 2023-05-06 09:43:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\map.ts
 */

export type Result = {
  value: string;
  [key: string]: any;
};

export type AutoCompleteOptions = {
  location?: any;
  types?: string[];
  onSearchComplete?: (result: Result[]) => void;
  input?: string | HTMLElement;
};

export type LocalSearchOptions = {
  onSearchComplete?: () => void;
};

export type PointType = {
  lng: number;
  lat: number;
  equals?: (point: PointType) => boolean;
};

export type GeocoderResultType = {
  point: PointType;
  address: string;
  addressComponents: any;
  surroundingPois: any;
  business: string;
};

export type GeoCoderType = {
  getPoint: (address: string, callback: (result: null | PointType) => void, city?: string) => void;
  getLocation: (
    point: PointType,
    callback: (result: null | GeocoderResultType) => void,
    options?: any,
  ) => void;
};

const getValue = (value: any) => {
  return value.province + value.city + value.district + value.street + value.business;
};

export const getAutoComplete = (options: AutoCompleteOptions) => {
  const fn = options.onSearchComplete;
  if (fn) {
    options.onSearchComplete = (e) => {
      const key: string =
        Object.getOwnPropertyNames(e).find((item) => {
          return e[item] instanceof Array;
        }) || '';
      fn(
        (e[key] || []).map((item: any) => {
          return {
            value: getValue(item),
            ...item,
          };
        }),
      );
    };
  }

  if (typeof options.input !== 'object') {
    options.input = options.input || 'autoinput';
    if (!document.getElementById(options.input)) {
      const input = document.createElement('input');
      input.id = options.input;
      input.style.display = 'none';
      document.body.appendChild(input);
    }
  }

  return new window.BMapGL.Autocomplete(options as any);
};

export const getLocalSearch = (options: any) => {};

let geocoder: GeoCoderType;
export const getGeocoder = (): Promise<GeoCoderType> => {
  return new Promise((resolve) => {
    if (geocoder) {
      resolve(geocoder);
    } else {
      geocoder = new window.BMapGL.Geocoder();
      resolve(geocoder);
    }
  });
};

export const getPoint = (lng: number | string, lat: number | string) => {
  return new window.BMapGL.Point(Number(lng), Number(lat)) as PointType;
};
