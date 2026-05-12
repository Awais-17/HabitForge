import React, { useEffect, useState } from 'react';
import { subDays, format, eachDayOfInterval } from 'date-fns';
import { habitService } from '../services/api';

interface HeatmapProps {
  userId: string;
}

const Heatmap: React.FC<HeatmapProps> = ({ userId }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const res = await habitService.getAnalytics(userId, 90); // 90 days for heatmap
        setData(res.data);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeatmapData();
  }, [userId]);

  const endDate = new Date();
  const startDate = subDays(endDate, 90);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getIntensity = (count: number) => {
    if (count === 0) return 'level-0';
    if (count <= 1) return 'level-1';
    if (count <= 2) return 'level-2';
    if (count <= 3) return 'level-3';
    return 'level-4';
  };

  if (loading) return <div>Loading Heatmap...</div>;

  return (
    <div className="card heatmap-card">
      <h3>Activity Heatmap (Last 90 Days)</h3>
      <div className="heatmap-grid">
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayData = data.find((d) => d._id === dateStr);
          const count = dayData ? dayData.count : 0;
          
          return (
            <div
              key={dateStr}
              className={`heatmap-cell ${getIntensity(count)}`}
              title={`${dateStr}: ${count} habits completed`}
            ></div>
          );
        })}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="heatmap-cell level-0"></div>
        <div className="heatmap-cell level-1"></div>
        <div className="heatmap-cell level-2"></div>
        <div className="heatmap-cell level-3"></div>
        <div className="heatmap-cell level-4"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
