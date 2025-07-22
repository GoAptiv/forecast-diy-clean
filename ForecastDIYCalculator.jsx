import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ForecastDIYCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [years, setYears] = useState(10);
  const [withdrawalYear, setWithdrawalYear] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [returnRate, setReturnRate] = useState(0.12);

  const calculateData = () => {
    let value = investment;
    let cumulativeWithdrawn = 0;
    const data = [];

    for (let i = 1; i <= years; i++) {
      value *= 1 + returnRate;
      if (withdrawalYear === i) {
        value -= withdrawalAmount;
        cumulativeWithdrawn += withdrawalAmount;
      }
      data.push({
        year: `Year ${i}`,
        "Portfolio Value": Math.max(value, 0),
        "Withdrawn Total": cumulativeWithdrawn,
      });
    }
    return data;
  };

  const chartData = calculateData();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Forecast DIY Calculator</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Initial Investment ($)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Annual Return (%)</label>
          <input
            type="number"
            step="0.01"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Years to Project</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Withdrawal Year (optional)</label>
          <input
            type="number"
            value={withdrawalYear || ""}
            onChange={(e) => setWithdrawalYear(Number(e.target.value) || null)}
          />
        </div>
        <div className="col-span-2">
          <label>Amount to Withdraw ($)</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Portfolio Value" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Withdrawn Total" stroke="#f59e0b" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
