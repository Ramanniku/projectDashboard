import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,  
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PaymentChart({ 
  title = "Sales Pipeline", 
  data = [],
  chartType = "sales", // "sales" or "hours"
  billableLabel = "Deals Completed",
  unbillableLabel = "Deals Lost"
}) {
  
  // Detect chart type based on data if not explicitly provided
  const detectedChartType = chartType || (data.length > 0 && data[0].billableHours ? "hours" : "sales");
  
  // Helper functions
  const formatValue = (value) => {
    if (detectedChartType === "hours") {
      // For hours: convert minutes to hours
      const hours = (value / 60).toFixed(1);
      return `${hours}H`;
    } else {
      // For sales: show as thousands
      return `${value}K`;
    }
  };

  const formatForTooltip = (value) => {
    if (detectedChartType === "hours") {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      if (minutes === 0) return `${hours}H`;
      return `${hours}H:${minutes.toString().padStart(2, '0')}M`;
    } else {
      return `${value}K`;
    }
  };

  const getChartLabels = () => {
    if (detectedChartType === "hours") {
      return {
        completed: "Billable Hours",
        rejected: "Unbillable Hours",
        awaiting: "Total Hours"
      };
    } else {
      return {
        completed: billableLabel,
        rejected: unbillableLabel,
        awaiting: "Total Deals"
      };
    }
  };

  const labels = getChartLabels();

  // Calculate totals for header if hours chart
  const totalBillable = detectedChartType === "hours" 
    ? data.reduce((sum, item) => sum + (item.completed || item.billableHours || 0), 0)
    : 0;
    
  const totalUnbillable = detectedChartType === "hours" 
    ? data.reduce((sum, item) => sum + (item.rejected || item.unbillableHours || 0), 0)
    : 0;

  // Format minutes to hours for display
  const formatMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}H` : `${hours}H:${mins.toString().padStart(2, '0')}M`;
  };

  return (
    <div className="glass-effect backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        
        {detectedChartType === "hours" ? (
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatMinutesToHours(totalBillable)}
              </div>
              <div className="text-xs text-gray-500">Billable Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {formatMinutesToHours(totalUnbillable)}
              </div>
              <div className="text-xs text-gray-500">Unbillable Hours</div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          </div>
        )}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatValue} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
            formatter={(value, name) => [
              formatForTooltip(value),
              labels[name] || name,
            ]}
          />

          {/* Bars for rejected/unbillable */}
          <Bar
            dataKey="rejected"
            barSize={14}
            fill={detectedChartType === "hours" ? "#f97316" : "#3b5bfd"}
            radius={[8, 8, 0, 0]}
            name="rejected"
          />

          {/* Line for completed/billable */}
          <Line
            type="monotone"
            dataKey="completed"
            stroke={detectedChartType === "hours" ? "#3b82f6" : "#c7cbd9"}
            strokeWidth={3}
            dot={false}
            name="completed"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PaymentChart;