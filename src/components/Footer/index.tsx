import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import { formatMessage } from '@/utils';

export type FooterType = {
  className: string;
};

export default (props: FooterType) => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: formatMessage({
      id: 'system.company',
      defaultMessage: '深圳永泰数能科技有限公司',
    }),
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter className={props.className} copyright={`${currentYear} ${defaultMessage}`} />
  );
};
