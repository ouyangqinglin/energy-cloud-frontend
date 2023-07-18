/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-17 15:22:08
 * @LastEditTime: 2023-07-18 09:32:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useAuthority.ts
 */
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import { merge } from 'lodash';
import { adminAuthority } from '@/utils/config';

export enum AuthorityModeEnum {
  Include,
  Exclude,
  Within,
}

export type OptionsType = {
  mode?: AuthorityModeEnum;
};

const useAuthority = (authority: string | string[], option?: OptionsType) => {
  const { initialState } = useModel('@@initialState');
  const [pass, setpass] = useState<boolean>(false);
  const [authorityMap, setAuthorityMap] = useState<Map<string, boolean>>(new Map([]));

  const authoritys = useMemo(() => {
    if (Array.isArray(authority)) {
      return authority;
    } else {
      return authority?.split?.(',') || [];
    }
  }, [authority]);

  const options = useMemo(() => {
    const defaultOption: OptionsType = {
      mode: AuthorityModeEnum.Include,
    };
    return merge(defaultOption, option || {});
  }, [option]);

  useEffect(() => {
    const userPermission = initialState?.currentUser?.permissions || [];
    if (userPermission.includes(adminAuthority)) {
      setpass(true);
      setAuthorityMap(new Map(authoritys.map((item) => [item, true])));
    } else {
      const map = new Map<string, boolean>([]);
      authoritys.forEach((item) => {
        switch (options.mode) {
          case AuthorityModeEnum.Within:
          case AuthorityModeEnum.Include:
            map.set(item, userPermission.includes(item));
            break;
          case AuthorityModeEnum.Exclude:
            map.set(item, !userPermission.includes(item));
            break;
          default:
        }
      });
      const set = new Set(map.values());
      switch (options.mode) {
        case AuthorityModeEnum.Within:
          setpass(set.has(true));
          break;
        case AuthorityModeEnum.Include:
        case AuthorityModeEnum.Exclude:
          setpass(!set.has(false));
          break;
        default:
      }
      setAuthorityMap(map);
    }
  }, [initialState?.currentUser?.permissions]);

  return { passAuthority: pass, authorityMap };
};

export default useAuthority;
