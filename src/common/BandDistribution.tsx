// BandDistribution.tsx
import { useEffect, useState } from "react";
import { bandDistribution } from "../services/DashboardBandDistribution";
import "./BandDistribution.css";

interface BandBucket {
  band: string | number;
  percentage: number;
}

interface Props {
  fromDate?: string;
  toDate?: string;
  ieltsType?: string;
  taskType?: string;
  monthLabel?: string;
}

const BandDistribution: React.FC<Props> = ({
  fromDate,
  toDate,
  ieltsType,
  taskType,
  monthLabel = "Sept 2025",
}) => {
  const [data, setData] = useState<BandBucket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistribution();
  }, [fromDate, toDate, ieltsType, taskType]);

  const fetchDistribution = async () => {
    try {
      setLoading(true);

      const res = await bandDistribution({
        fromDate,
        toDate,
        ieltsType,
        taskType,
      });

      const payload = res?.data?.data ?? res?.data ?? res;
      const bands = payload?.bands;

      console.log("normalized payload:", payload);

      setData(Array.isArray(bands) ? bands : []);
    } catch (error) {
      console.error("Failed to load band distribution", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const maxHeight = 180;
  const scaleMax = 30;

  const average =
    data.length > 0
      ? data.reduce((sum, item) => sum + Number(item.percentage || 0), 0) /
        data.length
      : 0;

  return (
    <div className="band-card">
      <div className="band-header">
        <h3>Band Distribution</h3>

        <div className="band-period">
          <button className="nav-btn">‹</button>
          <span>{monthLabel}</span>
          <button className="nav-btn">›</button>
        </div>
      </div>

      <div className="legend">
        <span className="legend-dot"></span>
        Avg no.
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="chart-wrapper">
          <div className="y-axis">
            {[30, 25, 20, 15, 10, 5, 0].map((value) => (
              <div key={value} className="axis-row">
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="chart-area">
            {[30, 25, 20, 15, 10, 5, 0].map((value) => (
              <div key={value} className="grid-line" />
            ))}

            <div className="bars">
              {Array.isArray(data) &&
                data.map((item, index) => {
                  const value = Number(item.percentage || 0);
                  const height = (value / scaleMax) * maxHeight;

                  return (
                    <div key={index} className="bar-group">
                      <div
                        className="bar"
                        style={{ height: `${height}px` }}
                      />

                      {Math.abs(value - average) < 2 && (
                        <div
                          className="avg-tooltip"
                          style={{ bottom: `${height + 18}px` }}
                        >
                          Avg Point
                        </div>
                      )}

                      <div
                        className="avg-point"
                        style={{ bottom: `${Math.max(height - 5, 0)}px` }}
                      />

                      <span className="label">{item.band}</span>
                    </div>
                  );
                })}
            </div>

            <svg
              className="avg-line"
              viewBox={`0 0 ${data.length * 60 || 1} 220`}
              preserveAspectRatio="none"
            >
              <path
                d={
                  Array.isArray(data)
                    ? data
                        .map((item, index) => {
                          const value = Math.max(0, Number(item.percentage || 0));
                          const x = index * 60 + 30;
                          const y = 200 - (value / scaleMax) * 180;
                          return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                        })
                        .join(" ")
                    : ""
                }
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default BandDistribution;