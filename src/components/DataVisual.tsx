
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DataVisualProps {
  socialCounts: Record<string, number>;
}

const DataVisual: React.FC<DataVisualProps> = ({ socialCounts }) => {
  // Transform social counts into chart data
  const chartData = Object.entries(socialCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 socials
  
  // Generate gradient colors for bars
  const getGradientColors = (index: number) => {
    const colors = [
      ['#3B82F6', '#1D4ED8'], // Blue
      ['#8B5CF6', '#6D28D9'], // Purple
      ['#EC4899', '#BE185D'], // Pink
      ['#34D399', '#059669'], // Green
      ['#F97316', '#C2410C'], // Orange
    ];
    
    return colors[index % colors.length];
  };

  return (
    <Card className="glass-panel animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Top Social Networks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-52">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => {
                    const [startColor, endColor] = getGradientColors(index);
                    return (
                      <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                    );
                  })}
                </Bar>
                <defs>
                  {chartData.map((_, index) => {
                    const [startColor, endColor] = getGradientColors(index);
                    return (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={startColor} />
                        <stop offset="100%" stopColor={endColor} />
                      </linearGradient>
                    );
                  })}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No data available yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisual;
