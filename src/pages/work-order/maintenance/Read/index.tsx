import Detail from '@/components/Detail';
import YTModalForm, { DEFAULT_PROPS } from '@/components/YTModalForm';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import { Steps } from 'antd';
import { useRequest } from 'umi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { getMaintenanceWorkOrder, handleOrderAccept, handleOrderComplete } from '../service';
import type { MaintenanceOrderUpdateInfo } from '../type';
import { OrderStatus } from '../type';
import { columnsRead } from './config';
import styles from './index.less';

const submitTextMap = new Map([
  [OrderStatus.READY, '提交工单'],
  [OrderStatus.DEALING, '完成工单'],
]);

const Read = (props: FormUpdateBaseProps) => {
  const [step, setStep] = useState(OrderStatus.READY);
  const [tails, setTails] = useState<MaintenanceOrderUpdateInfo['tails']>([]);

  const { run } = useRequest(getMaintenanceWorkOrder, {
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
      setTails(data?.tails);
      const convertStep = data?.tails?.length - 1 ?? 0;
      setStep(convertStep);
      formRef?.current?.setFieldsValue?.(data);
    });
  }, [props.id]);

  useEffect(() => {
    if (props.visible) {
      fetchFormData();
    }
  }, [props.visible]);

  const showAccept = tails.length >= 1;
  const showComplete = tails.length >= 2;
  const stepsConfig = useMemo(() => {
    return [
      {
        title: '任务创建',
        description: (
          <div className={styles.stepDesc}>
            <span>{tails[0]?.processorName}</span>
            <span>{tails[0]?.createTime}</span>
          </div>
        ),
      },
      {
        title: '工单接收',
        description: showAccept ? (
          <div className={styles.stepDesc}>
            <span>{tails[1]?.processorName}</span>
            <span>{tails[1]?.createTime}</span>
          </div>
        ) : (
          ''
        ),
      },
      {
        title: '工单完成',
        description: showComplete ? (
          <div className={styles.stepDesc}>
            <span>{tails[2]?.processorName}</span>
            <span>{tails[2]?.createTime}</span>
          </div>
        ) : (
          ''
        ),
      },
    ];
  }, [step, tails]);

  const runForOrderStatus = (params: { id: number }) => {
    if (step === OrderStatus.READY) {
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
        searchConfig: { submitText: submitTextMap.get(step) },
        submitButtonProps: {
          style: {
            display: !showComplete ? 'block' : 'none',
          },
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
        <Steps progressDot={true} current={step} labelPlacement="vertical" items={stepsConfig} />
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
