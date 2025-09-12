import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, ListChecks, AlertCircle } from "lucide-react";

const iconMap = {
  "Total Tasks": <ListChecks size={24} className="text-blue-500" />,
  "Completed Tasks": <CheckCircle size={24} className="text-green-500" />,
  "Pending Tasks": <Clock size={24} className="text-yellow-500" />,
  "High Priority": <AlertCircle size={24} className="text-red-500" />,
};

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-white shadow-lg duration-300 cursor-pointer"
        >
          <CardContent className="flex items-center gap-4">
            {/* Icon */}
            <div className="p-2 bg-gray-100 rounded-lg">
              {iconMap[stat.label]}
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h2 className="text-sm text-gray-500">{stat.label}</h2>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
