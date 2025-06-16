import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Sales ($)",
        data: [200, 300, 400, 250, 500],
        borderColor: "#2563EB",
        backgroundColor: "#2563EB33",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6 h-[300px]">
      <h4 className="font-semibold mb-4">Sales Over Time</h4>
      <Line data={data} options={options} />
    </div>
  );
};
export default SalesChart;
