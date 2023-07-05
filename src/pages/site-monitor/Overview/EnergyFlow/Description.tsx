export const LiveLegend = () => {
  return (
    <div className="live-lengend">
      <div className="live-load">
        <span className="live-label">用电功率/</span>
        <span className="indexUnit">kW</span>：<span className="live-value">924.15</span>
      </div>
      <div className="live-battery">
        <p>
          <span className="live-leftcol">
            <span className="live-label">储能功率/</span>
            <span className="indexUnit">kW</span>：
          </span>
          <span className="live-value mr3">0.00</span>
          <span className="indexUnit-tip"></span>
        </p>
        <p>
          <span className="live-leftcol">
            <span className="live-label">剩余电量</span>
            <img src="/static/battery-small.png" className="battery-img" alt="" />
          </span>
          <span className="live-value">0.00</span>
          <span className="indexUnit-tip">%</span>
        </p>
      </div>
      <div className="live-solar">
        <p>
          <span className="live-leftcol">
            <span className="live-label">发电功率/</span>
            <span className="indexUnit">kW</span>：
          </span>
          <span className="live-value">85.55</span>
        </p>
        <p>
          <span className="live-leftcol">
            <span className="live-label">当日发电/</span>
            <span className="indexUnit">kWh</span>：
          </span>
          <span className="live-value">1483.2</span>
        </p>
      </div>
      <div className="live-grid">
        <p>
          <span className="live-label">电网功率/</span>
          <span className="indexUnit">kW</span>：<span className="live-value mr3">847.67</span>
          <span className="indexUnit-tip">(购电)</span>
        </p>
      </div>
    </div>
  );
};
