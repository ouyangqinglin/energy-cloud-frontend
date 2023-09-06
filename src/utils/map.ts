/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-03-13 19:26:34
 * @LastEditTime: 2023-09-04 19:52:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\map.ts
 */
import { AutoComStatusEnum } from './dictionary';

interface IAutoComResult {
  autoComplete: AMap.AutoComplete;
  search: (keyword: string, limit?: number) => Promise<any[]>;
}

interface IGeocoderResult {
  geocoder: AMap.Geocoder;
  getAddress: (lngLat: AMap.LngLat) => Promise<any>;
}

let mapLoadResolve: (value: unknown) => void;
const mapLoadPromise = new Promise((resolve) => {
  mapLoadResolve = resolve;
});
export { mapLoadResolve };
export const mapLoad = () => {
  return mapLoadPromise;
};

let autoComplete: any;
export function getAutoComplete() {
  return new Promise<IAutoComResult>((autoresolve) => {
    mapLoad().then(() => {
      window.AMap.plugin(['AMap.AutoComplete'], () => {
        autoComplete = autoComplete || new window.AMap.Autocomplete({});
        const search = (keyword: string, limit: number = 41) => {
          return new Promise<any[]>((resolve, reject) => {
            autoComplete.search(keyword, (status: AutoComStatusEnum, result: any) => {
              if (status === AutoComStatusEnum.Complete) {
                const arr = result.tips.map((item: any) => {
                  const address = item.district + item.address;
                  return {
                    ...item,
                    label: address.length > limit ? address.substring(0, limit) + '...' : address,
                    value: address,
                    key: item.id,
                  };
                });
                resolve(arr);
              } else if (status === AutoComStatusEnum.NoData) {
                resolve([]);
              } else {
                reject();
              }
            });
          });
        };

        autoresolve({
          autoComplete,
          search,
        });
      });
    });
  });
}

let geocoder: any;
export function getGeocoder() {
  return new Promise<IGeocoderResult>((geoResolve) => {
    mapLoad().then(() => {
      window.AMap.plugin(['AMap.Geocoder'], () => {
        geocoder = geocoder || new window.AMap.Geocoder({});

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

export function getMoveAnimation() {
  return new Promise<void>((moveResolve) => {
    mapLoad().then(() => {
      window.AMap.plugin(['AMap.MoveAnimation'], () => {
        moveResolve();
      });
    });
  });
}

export function getIcon(icon: AMap.IconOptions) {
  const myIcon = new window.AMap.Icon({
    size: icon.size && new window.AMap.Size(icon.size[0], icon.size[1]),
    image: icon.image,
    imageSize: icon.imageSize && new window.AMap.Size(icon.imageSize[0], icon.imageSize[1]),
    imageOffset:
      icon.imageOffset && new window.AMap.Pixel(icon.imageOffset[0], icon.imageOffset[1]),
  });

  return myIcon;
}

export function getMarker(marker: AMap.MarkerOptions, icon?: AMap.IconOptions) {
  return new Promise((resolve) => {
    mapLoad().then(() => {
      const myIcon = icon && getIcon(icon);
      getPoint(marker?.position?.[0], marker?.position?.[1]).then((resPoint) => {
        const myMarker = new window.AMap.Marker({
          position: resPoint,
          icon: marker.icon || myIcon,
          offset: marker.offset && new window.AMap.Pixel(marker.offset[0], marker.offset[1]),
        });
        resolve({ marker: myMarker, icon: myIcon });
      });
    });
  });
}

export function getPoint(lng: number, lat: number) {
  return new Promise<AMap.LngLat>((resolve) => {
    mapLoad().then(() => {
      resolve(new window.AMap.LngLat(lng, lat));
    });
  });
}
