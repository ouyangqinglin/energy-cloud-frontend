/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-11 11:11:57
 * @LastEditTime: 2024-01-11 11:11:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\FallBackRender\index.tsx
 */
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const FallBackRender: React.FC<FallbackProps> = (props) => {
  const { error } = props;

  return (
    <>
      <div role="alert">
        <p>错误请联系管理员:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    </>
  );
};

export default FallBackRender;
