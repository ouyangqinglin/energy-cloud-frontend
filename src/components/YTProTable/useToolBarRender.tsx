/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-11 17:39:54
 * @LastEditTime: 2023-07-11 19:28:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\YTProTable\useToolBarRender.tsx
 */
import React, { MutableRefObject, useMemo, useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { YTProTableProps, toolBarRenderOptionsType } from './typing';
import { merge } from 'lodash';
import { isEmpty, saveFile } from '@/utils';

enum optionsType {
  Add = 'add',
  Export = 'export',
}

const useToolBarRender = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  toolBarRender: YTProTableProps<DataType, Params, ValueType>['toolBarRender'],
  toolBarRenderOptions?: toolBarRenderOptionsType<Params>,
  formRef?: MutableRefObject<ProFormInstance<Params> | undefined>,
) => {
  const onExport = useCallback(() => {
    const value = formRef?.current?.getFieldsValue?.();
    toolBarRenderOptions?.export
      ?.requestExport?.(formRef?.current?.getFieldsValue?.() as any)
      .then((res) => {
        saveFile(res, toolBarRenderOptions?.export?.getExportName?.(value as any) || '导出文件');
      });
  }, [toolBarRenderOptions, formRef]);

  const options = useMemo(() => {
    const defaultOptions: toolBarRenderOptionsType<Params> = {
      [optionsType.Add]: {
        show: true,
        text: '新建',
        icon: <PlusOutlined />,
      },
      [optionsType.Export]: {
        show: false,
        text: '导出',
        icon: <ExportOutlined />,
        onClick: onExport,
      },
    };

    return merge(defaultOptions, toolBarRenderOptions || {});
  }, [toolBarRenderOptions]);

  const toolBarRenderResult = useMemo(() => {
    if (isEmpty(toolBarRender)) {
      const result: React.ReactNode[] = [];
      [optionsType.Add, optionsType.Export].forEach((item) => {
        if (options[item]?.show) {
          result.push(
            <Button
              key={item}
              type="primary"
              onClick={() => options[item]?.onClick?.(formRef)}
              {...(options[item]?.buttonProps || {})}
            >
              {options[item]?.icon}
              {options[item]?.text}
            </Button>,
          );
        }
      });
      return () => result;
    } else {
      return toolBarRender;
    }
  }, [toolBarRender, options, formRef]);

  return toolBarRenderResult;
};

export default useToolBarRender;
