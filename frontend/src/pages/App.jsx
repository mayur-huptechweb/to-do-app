import { useState, useEffect } from "react";
import { toast } from "sonner";
import StatsCards from "@/components/StatsCards";
import SearchAndColumnToggle from "@/components/SearchAndColumnToggle";
import TasksTable from "@/components/TasksTable";

// Example tasks data
const initialTasks = [
  { id: 1, title: "Buy groceries", description: "Milk, Eggs, Bread", priority: "High", status: "Pending" },
  { id: 2, title: "Finish project", description: "Complete the MERN app", priority: "Medium", status: "Completed" },
  { id: 3, title: "Workout", description: "Evening session", priority: "Low", status: "Pending" },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({ title: true, description: true, priority: true, status: true, actions: true });
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    document.title = "Dashboard";

    // Dynamic greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Tasks", value: tasks.length },
    { label: "Completed Tasks", value: tasks.filter(t => t.status === "Completed").length },
    { label: "Pending Tasks", value: tasks.filter(t => t.status === "Pending").length },
    { label: "High Priority", value: tasks.filter(t => t.priority === "High").length },
  ];

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task deleted!");
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" } : t));
    toast.success("Task status updated!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Center content with max width */}
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {greeting}, <span className="text-blue-600">User!</span>
          </h1>
          <p className="text-gray-500 text-md mt-1">Here's your task dashboard for today.</p>
        </div>

        <StatsCards stats={stats} />

        <SearchAndColumnToggle
          search={search}
          setSearch={setSearch}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />

        <TasksTable
          tasks={filteredTasks}
          visibleColumns={visibleColumns}
          handleDelete={handleDelete}
          handleToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default App;
