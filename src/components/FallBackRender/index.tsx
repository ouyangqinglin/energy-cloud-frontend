/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-11 11:11:57
 * @LastEditTime: 2024-02-19 11:10:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\FallBackRender\index.tsx
 */
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const refresh = () => {
  window.location.reload();
};

const FallBackRender: React.FC<FallbackProps> = (props) => {
  const { error } = props;

  let showRefresh = false;
  try {
    const message = JSON.stringify(error.message);
    showRefresh =
      message.indexOf('Loading') > -1 &&
      message.indexOf('chunk') > -1 &&
      message.indexOf('failed') > -1;
  } catch {
    showRefresh = false;
  }
  showRefresh = true;

  return (
    <>
      <div className="px24" role="alert">
        <p>
          <span>出错了</span>
          {showRefresh ? <a onClick={refresh}>请刷新页面</a> : <span>请联系管理员</span>}
        </p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    </>
  );
};

export default FallBackRender;
