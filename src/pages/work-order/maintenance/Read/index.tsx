import Detail from '@/components/Detail';
import YTModalForm, { DEFAULT_PROPS } from '@/components/YTModalForm';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import { Steps } from 'antd';
import { useRequest } from 'umi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { getMaintenanceWorkOrder, handleOrderAccept, handleOrderComplete } from '../service';
import type { MaintenanceOrderUpdateInfo, Tail } from '../type';
import { OrderStatus } from '../type';
import { columnsRead } from './config';
import styles from './index.less';

const submitTextMap = new Map([
  [OrderStatus.READY, '接收工单'],
  [OrderStatus.DEALING, '完成工单'],
]);

const Read = (props: FormUpdateBaseProps) => {
  const [tailMap, setTailMap] = useState<Map<OrderStatus, Tail>>();

  const { data: detailData, run } = useRequest(getMaintenanceWorkOrder, {
    manual: true,
  });
  const { run: runForAccept } = useRequest(handleOrderAccept, {
    manual: true,
  });
  const { run: runForComplete } = useRequest(handleOrderComplete, {
    manual: true,
  });
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

  useEffect(() => {
    if (props.visible) {
      fetchFormData();
    }
  }, [props.visible]);

  const stepsConfig = useMemo(() => {
    return [
      {
        title: '任务创建',
        description: (
          <div className={styles.stepDesc}>
            <span>{tailMap?.get?.(OrderStatus.READY)?.processorName}</span>
            <span>{tailMap?.get?.(OrderStatus.READY)?.createTime}</span>
          </div>
        ),
      },
      {
        title: '工单接收',
        description:
          detailData?.status == OrderStatus?.DEALING ||
          detailData?.status == OrderStatus?.COMPLETE ? (
            <div className={styles.stepDesc}>
              <span>{tailMap?.get?.(OrderStatus.DEALING)?.processorName}</span>
              <span>{tailMap?.get?.(OrderStatus.DEALING)?.createTime}</span>
            </div>
          ) : (
            ''
          ),
      },
      {
        title: '工单完成',
        description:
          detailData?.status == OrderStatus.COMPLETE ? (
            <div className={styles.stepDesc}>
              <span>{tailMap?.get?.(OrderStatus.COMPLETE)?.processorName}</span>
              <span>{tailMap?.get?.(OrderStatus.COMPLETE)?.createTime}</span>
            </div>
          ) : (
            ''
          ),
      },
    ];
  }, [detailData, tailMap]);

  const runForOrderStatus = (params: { id?: number }) => {
    if (detailData?.status === OrderStatus.READY) {
      return runForAccept(params);
    }
    return runForComplete(params);
  };

  return (
    <ModalForm<MaintenanceOrderUpdateInfo>
      title="查看"
      formRef={formRef}
      layout={'vertical'}
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
        searchConfig: { submitText: submitTextMap.get(detailData?.status ?? OrderStatus.COMPLETE) },
        submitButtonProps: {
          hidden: detailData?.status == OrderStatus.COMPLETE,
        },
        onSubmit: async () => {
          const res = await runForOrderStatus({ id: props.id });
          if (res) {
            fetchFormData();
          }
        },
      }}
      {...props}
    >
      <ProForm.Group
        colProps={{
          span: 24,
        }}
      >
        <Detail.DotLabel title="进度" />
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
        <Detail.DotLabel title="工单详情" />
      </ProForm.Group>
      <BetaSchemaForm<any> layoutType="Embed" columns={columnsRead} />
    </ModalForm>
  );
};

export default Read;
