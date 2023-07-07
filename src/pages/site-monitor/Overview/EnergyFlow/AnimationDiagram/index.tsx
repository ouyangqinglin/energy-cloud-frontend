import styles from './index.less';
const AnimationDiagram = () => {
  const paths = [
    {
      id: 'left-line-1-1',
      path: 'm61.275 21.471 224.849 152.183',
      duration: 2,
      delay: 0,
      repeat: 5,
      reverse: false,
      style: {},
    },
    {
      id: 'left_1_yt_terminal',
      duration: 2,
      delay: 0,
      repeat: 1,
      path: 'M61.273 21.47c22.689 40.195 26.086 75.704 10.192 106.528C55.571 158.822 31.749 177.666 0 184.528',
      reverse: false,
      style: {},
    },
    {
      id: 'left_2_yt_terminal',
      duration: 2,
      delay: 0,
      repeat: 1,
      path: 'M61.275 21.47C93.922 33.898 131.719 38.4 174.663 34.978 217.607 31.555 252.041 19.896 277.965 0',
      reverse: false,
      style: {},
    },
  ];
  return (
    <>
      {paths.map((p) => {
        let styleConfig = {
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          animationPlayState: 'running',
          offsetPath: `path('${p.path}')`,
          animationDirection: p.reverse ? 'reverse' : 'normal',
        };

        if (p.style) {
          styleConfig = { ...styleConfig, ...p.style };
        }

        return <div className={styles.flow} key={p.id} id={p.id} style={styleConfig} />;
      })}
    </>
  );
};

export default AnimationDiagram;
