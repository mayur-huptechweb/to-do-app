import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Example tasks data (replace with API later)
const initialTasks = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Eggs, Bread",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Finish project",
    description: "Complete the MERN app",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: 3,
    title: "Workout",
    description: "Evening session",
    priority: "Low",
    status: "Pending",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    description: true,
    priority: true,
    status: true,
    actions: true,
  });

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  // Filtered tasks based on search
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "High").length;

  // Action handlers
  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task deleted!");
  };

  const handleToggleStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" }
          : t
      )
    );
    toast.success("Task status updated!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow">
          <CardContent>
            <h2 className="text-sm text-gray-500">Total Tasks</h2>
            <p className="text-2xl font-semibold">{totalTasks}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow">
          <CardContent>
            <h2 className="text-sm text-gray-500">Completed Tasks</h2>
            <p className="text-2xl font-semibold">{completedTasks}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow">
          <CardContent>
            <h2 className="text-sm text-gray-500">Pending Tasks</h2>
            <p className="text-2xl font-semibold">{pendingTasks}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow">
          <CardContent>
            <h2 className="text-sm text-gray-500">High Priority</h2>
            <p className="text-2xl font-semibold">{highPriorityTasks}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Column Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        />
        <div className="flex space-x-2">
          {Object.keys(visibleColumns).map((col) => (
            <Button
              key={col}
              size="sm"
              variant={visibleColumns[col] ? "default" : "outline"}
              onClick={() =>
                setVisibleColumns({
                  ...visibleColumns,
                  [col]: !visibleColumns[col],
                })
              }
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumns.title && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
              )}
              {visibleColumns.description && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
              )}
              {visibleColumns.priority && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Priority
                </th>
              )}
              {visibleColumns.status && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              )}
              {visibleColumns.actions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                {visibleColumns.title && <td className="px-6 py-4">{task.title}</td>}
                {visibleColumns.description && <td className="px-6 py-4">{task.description}</td>}
                {visibleColumns.priority && (
                  <td className="px-6 py-4">{task.priority}</td>
                )}
                {visibleColumns.status && (
                  <td className="px-6 py-4">{task.status}</td>
                )}
                {visibleColumns.actions && (
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleToggleStatus(task.id)}
                    >
                      Toggle Status
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <p className="p-4 text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
