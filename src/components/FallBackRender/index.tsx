/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-11 11:11:57
 * @LastEditTime: 2024-06-12 17:30:50
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

  const showRefresh = true;
  // try {
  //   const message = JSON.stringify(error.message);
  //   showRefresh =
  //     message.indexOf('Loading') > -1 &&
  //     message.indexOf('chunk') > -1 &&
  //     message.indexOf('failed') > -1;
  // } catch {
  //   showRefresh = false;
  // }

  return (
    <>
      <div className="px24" role="alert">
        <p>
          <span className="cl-error">出错了 </span>
          {showRefresh ? (
            <a onClick={refresh}>请刷新页面</a>
          ) : (
            <span className="cl-error">请联系管理员</span>
          )}
        </p>
        <pre className="cl-error">{error.message}</pre>
      </div>
    </>
  );
};

export default FallBackRender;
