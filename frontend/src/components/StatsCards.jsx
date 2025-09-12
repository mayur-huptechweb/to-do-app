import { Card, CardContent } from "@/components/ui/card";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-white shadow">
          <CardContent>
            <h2 className="text-sm text-gray-500">{stat.label}</h2>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
