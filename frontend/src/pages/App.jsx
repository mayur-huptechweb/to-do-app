import { useState, useEffect } from "react";
import StatsCards from "@/components/StatsCards";
import SearchAndColumnToggle from "@/components/SearchAndColumnToggle";
import TasksTable from "@/components/TasksTable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

// Example tasks data
const initialTasks = [
  {
    id: 1,
    title: "Buy groceries",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [greeting, setGreeting] = useState("");
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    title: true,
    description: true,
    priority: true,
    status: true,
    actions: true,
  });
  const navigate = useNavigate();

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers for task actions (delete, toggle status)
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Dashboard";

    // Dynamic greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const stats = [
    { label: "Total Tasks", value: tasks.length },
    {
      label: "Completed Tasks",
      value: tasks.filter((t) => t.status === "Completed").length,
    },
    {
      label: "Pending Tasks",
      value: tasks.filter((t) => t.status === "Pending").length,
    },
    {
      label: "High Priority",
      value: tasks.filter((t) => t.priority === "High").length,
    },
  ];

  document.title = 'To Do App';

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      {/* Center content with max width */}
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-6 flex items-center justify-between">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {greeting}, <span>User!</span>
            </h1>
            <p className="text-gray-500 text-md sm:text-md mt-1">
              Here's your task dashboard for today.
            </p>
          </div>

          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-red-600 active:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* Future Search & Table */}
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
    </div>
  );
};

export default App;
