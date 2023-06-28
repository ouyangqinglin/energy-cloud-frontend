import { Lottie } from '@/components/Lottie';
import ChargingLeft from '../lottie/ChargingLeft.json';
import ChargingRight from '../lottie/ChargingRight.json';
import ChargeCompleteLeft from '../lottie/ChargeCompleteLeft.json';
import ChargeCompleteRight from '../lottie/ChargeCompleteRight.json';
import styles from '../index.less';
import { CellConfigItem, GunMark, GunStatus } from '../type';

const CeilGun = ({ ceil }: { ceil: CellConfigItem }) => {
  const { chargingGuns = [], charingGunsConfig = [] } = ceil;

  if (chargingGuns.length) {
    const aGun = chargingGuns.find((gun) => gun.mark === GunMark.A_GUN);
    const bGun = chargingGuns.find((gun) => gun.mark === GunMark.B_GUN);
    const aGunConfig = charingGunsConfig.find((gun) => gun.mark === GunMark.A_GUN);
    const bGunConfig = charingGunsConfig.find((gun) => gun.mark === GunMark.B_GUN);

    const isAGunCharging = aGun?.status === GunStatus.CHARGING;
    const isAGunFullCharge = aGun?.status === GunStatus.IDLE_WITH_FILLED;

    const isBGunCharging = bGun?.status === GunStatus.CHARGING;
    const isBGunFullCharge = bGun?.status === GunStatus.IDLE_WITH_FILLED;

    if (
      window.DEVTOOL &&
      (isAGunCharging || isAGunFullCharge || isBGunCharging || isBGunFullCharge)
    ) {
      const log = {
        aGun: {
          deviceId: aGun?.deviceId,
          name: aGun?.name,
          status: isAGunCharging ? '充电' : isAGunFullCharge ? '充满' : '空闲',
        },
        bGun: {
          deviceId: bGun?.deviceId,
          name: bGun?.name,
          status: isBGunCharging ? '充电' : isBGunFullCharge ? '充满' : '空闲',
        },
      };
      console.log(log);
    }

    if (aGunConfig?.direction === 'left') {
      return (
        <>
          {isAGunCharging && (
            <div className={styles.leftGun} {...aGunConfig}>
              <Lottie width={14} height={32} animationData={ChargingLeft} />
            </div>
          )}
          {isBGunCharging && (
            <div className={styles.leftGun} {...aGunConfig}>
              <Lottie width={14} height={32} animationData={ChargingLeft} />
            </div>
          )}
          {isAGunFullCharge && (
            <div className={styles.rightGun} {...bGunConfig}>
              <Lottie width={14} height={32} animationData={ChargeCompleteLeft} />
            </div>
          )}
          {isBGunFullCharge && (
            <div className={styles.rightGun} {...bGunConfig}>
              <Lottie width={14} height={32} animationData={ChargeCompleteLeft} />
            </div>
          )}
        </>
      );
    }
    return (
      <>
        {isAGunCharging && (
          <div className={styles.leftGun} {...aGunConfig}>
            <Lottie width={14} height={32} animationData={ChargingRight} />
          </div>
        )}
        {isBGunCharging && (
          <div className={styles.leftGun} {...aGunConfig}>
            <Lottie width={14} height={32} animationData={ChargingRight} />
          </div>
        )}
        {isAGunFullCharge && (
          <div className={styles.rightGun} {...bGunConfig}>
            <Lottie width={14} height={32} animationData={ChargeCompleteRight} />
          </div>
        )}
        {isBGunFullCharge && (
          <div className={styles.rightGun} {...bGunConfig}>
            <Lottie width={14} height={32} animationData={ChargeCompleteRight} />
          </div>
        )}
      </>
    );
  }
  return <></>;
};

export default CeilGun;
