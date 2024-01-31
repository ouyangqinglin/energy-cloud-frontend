/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-11 11:11:57
 * @LastEditTime: 2024-01-30 15:31:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\FallBackRender\index.tsx
 */
import React, { useMemo } from 'react';
import { FallbackProps } from 'react-error-boundary';

const FallBackRender: React.FC<FallbackProps> = (props) => {
  const { error } = props;

  const showRefresh = () => {
    let result = false;
    try {
      const message = JSON.stringify(error.message);
      result =
        message.indexOf('Loading') > -1 &&
        message.indexOf('chunk') > -1 &&
        message.indexOf('failed') > -1;
    } catch {
      result = false;
    }
    return result;
  };

  return (
    <>
      <div className="px24" role="alert">
        <p>
          <span>出错了</span>
          {showRefresh ? <span>请刷新页面</span> : <span>请联系管理员</span>}
        </p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    </>
  );
};

export default FallBackRender;
