import Detail from '@/components/Detail';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import { Steps } from 'antd';
import { useRequest } from 'umi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { getInstallationWorkOrder, handleOrderAccept, handleOrderComplete } from '../service';
import type { InstallOrderUpdateInfo, Tail } from '../type';
import { OrderStatus } from '../type';
import { columnsRead } from './config';
import styles from './index.less';
import { useToggle } from 'ahooks';
import StationForm from '@/pages/station/stationList/components/edit';
import { FormTypeEnum } from '@/components/SchemaForm';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { addDataByWorkOrder } from '@/pages/station/stationList/service';

const Read = (props: FormUpdateBaseProps) => {
  const { id, onSuccess, onVisibleChange } = props;
  const [modalVisible, { set }] = useToggle(false);

  const [tailMap, setTailMap] = useState<Map<OrderStatus, Tail>>();

  const { data: detailData, run } = useRequest(getInstallationWorkOrder, {
    manual: true,
  });
  const { run: runForAccept } = useRequest(handleOrderAccept, {
    manual: true,
  });
  const { run: runForComplete } = useRequest(handleOrderComplete, {
    manual: true,
  });

  const requestSave = useCallback(
    (formData) => {
      return addDataByWorkOrder({ ...formData, taskId: detailData?.id });
    },
    [detailData],
  );

  const formRef = useRef<ProFormInstance>(null);
  const fetchFormData = useCallback(() => {
    run({ id: props.id })?.then((data) => {
      const map = new Map();
      data?.tails?.forEach?.((item) => {
        map.set(item.eventId, item);
      });
      setTailMap(map);
      formRef?.current?.setFieldsValue?.(data);
    });
  }, [props.id]);

  const submitText = useMemo(() => {
    if (OrderStatus.READY == detailData?.status) {
      return formatMessage({ id: 'taskManage.receivingWorkOrders', defaultMessage: '接收工单' });
    } else if (OrderStatus.DEALING == detailData?.status) {
      if (detailData?.siteId) {
        return formatMessage({ id: 'taskManage.completeWorkOrders', defaultMessage: '完成工单' });
      } else {
        return formatMessage({ id: 'taskManage.createSite', defaultMessage: '创建站点' });
      }
    } else {
      return '';
    }
  }, [detailData]);

  const onSiteFormSuccess = useCallback(() => {
    onSuccess?.();
    fetchFormData();
  }, [onSuccess, fetchFormData]);

  const onSubmit = useCallback(() => {
    switch (detailData?.status) {
      case OrderStatus.READY:
        runForAccept({ id }).then(() => {
          fetchFormData();
        });
        break;
      case OrderStatus.DEALING:
        if (detailData?.siteId) {
          //点击'完成工单'按钮
          runForComplete({ id }).then(() => {
            onVisibleChange(false); //关闭弹窗
            onSuccess(); //更新列表数据
          });
        } else {
          set(true);
        }
        break;
      default:
        break;
    }
  }, [id, detailData, fetchFormData, onVisibleChange, onSuccess, props]);

  useEffect(() => {
    if (props.visible) {
      fetchFormData();
    }
  }, [props.visible]);

  const stepsConfig = useMemo(() => {
    return [
      {
        title: formatMessage({ id: 'taskManage.createTask', defaultMessage: '任务创建' }),
        description: (
          <div className={styles.stepDesc}>
            <span>{tailMap?.get?.(OrderStatus.READY)?.processorName}</span>
            <span>{tailMap?.get?.(OrderStatus.READY)?.createTime}</span>
          </div>
        ),
      },
      {
        title: formatMessage({ id: 'taskManage.workOrderRecept', defaultMessage: '工单接收' }),
        description:
          detailData?.status == OrderStatus.DEALING ||
          detailData?.status == OrderStatus.COMPLETE ? (
            <div className={styles.stepDesc}>
              <span>{tailMap?.get?.(OrderStatus.DEALING)?.processorName}</span>
              <span>{tailMap?.get?.(OrderStatus.DEALING)?.createTime}</span>
            </div>
          ) : (
            ''
          ),
      },
      {
        title: formatMessage({ id: 'taskManage.workOrderComplete', defaultMessage: '工单完成' }),
        description:
          OrderStatus.COMPLETE == detailData?.status ? (
            <div className={styles.stepDesc}>
              <span>{tailMap?.get?.(OrderStatus.COMPLETE)?.processorName}</span>
              <span>{tailMap?.get?.(OrderStatus.COMPLETE)?.createTime}</span>
            </div>
          ) : (
            ''
          ),
      },
    ];
  }, [tailMap, detailData]);

  return (
    <>
      <ModalForm<InstallOrderUpdateInfo>
        title={<FormattedMessage id="common.viewDetail" defaultMessage="查看详情" />}
        formRef={formRef}
        layout={'vertical'}
        modalProps={{ maskClosable: false }}
        readonly={true}
        {...{
          rowProps: {
            gutter: [16, 16],
          },
          colProps: {
            span: 8,
          },
          grid: true,
        }}
        submitter={{
          searchConfig: { submitText },
          onSubmit,
          submitButtonProps: {
            hidden: OrderStatus.COMPLETE == detailData?.status,
          },
        }}
        {...props}
      >
        <ProForm.Group
          colProps={{
            span: 24,
          }}
        >
          <Detail.DotLabel
            title={<FormattedMessage id="taskManage.schedule" defaultMessage="进度" />}
          />
        </ProForm.Group>
        <ProForm.Group
          colProps={{
            span: 24,
          }}
        >
          <Steps
            progressDot={true}
            current={detailData?.status}
            labelPlacement="vertical"
            items={stepsConfig}
          />
        </ProForm.Group>
        <ProForm.Group
          colProps={{
            span: 24,
          }}
        >
          <Detail.DotLabel
            title={<FormattedMessage id="taskManage.workOrderDetails" defaultMessage="工单详情" />}
          />
        </ProForm.Group>
        <BetaSchemaForm<any> layoutType="Embed" columns={columnsRead} />
      </ModalForm>
      <StationForm
        open={modalVisible}
        onOpenChange={set}
        type={FormTypeEnum.Add}
        onSuccess={onSiteFormSuccess}
        requestSave={requestSave}
        initValues={{ name: detailData?.siteName || '' } as any}
      />
    </>
  );
};

export default Read;
