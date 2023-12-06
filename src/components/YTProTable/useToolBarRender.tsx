/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-11 17:39:54
 * @LastEditTime: 2023-12-06 09:26:58
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
import { useBoolean } from 'ahooks';
import { formatMessage } from '@/utils';

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
  const [exportLoading, { setTrue, setFalse }] = useBoolean(false);

  const onExport = useCallback(() => {
    formRef?.current?.validateFields?.()?.then((value) => {
      if (toolBarRenderOptions?.export?.requestExport) {
        setTrue();
        toolBarRenderOptions?.export
          ?.requestExport?.(value as any)
          .then((res) => {
            saveFile(
              res,
              toolBarRenderOptions?.export?.getExportName?.(value as any) || '导出文件',
            );
          })
          .finally(() => {
            setFalse();
          });
      }
    });
  }, [toolBarRenderOptions, toolBarRenderOptions?.export?.requestExport, formRef]);

  const options = useMemo(() => {
    const defaultOptions: toolBarRenderOptionsType<Params> = {
      [optionsType.Add]: {
        show: true,
        text: formatMessage({ id: 'common.add', defaultMessage: '新建' }),
        icon: <PlusOutlined />,
      },
      [optionsType.Export]: {
        show: false,
        text: formatMessage({ id: 'common.export', defaultMessage: '导出' }),
        icon: <ExportOutlined />,
        onClick: onExport,
      },
    };

    return merge(defaultOptions, toolBarRenderOptions || {});
  }, [toolBarRenderOptions, onExport]);

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
              loading={exportLoading}
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
  }, [toolBarRender, options, formRef, exportLoading]);

  return toolBarRenderResult;
};

export default useToolBarRender;
