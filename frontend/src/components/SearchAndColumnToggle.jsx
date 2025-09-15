import { useState } from "react";
import { Check, ChevronDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const SearchAndColumnToggle = ({
  search,
  setSearch,
  visibleColumns,
  setVisibleColumns,
  setTasks,
  tasks,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(
    Object.keys(visibleColumns).filter((col) => visibleColumns[col])
  );

  // Add Task modal state
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
  });

  const handleColumnToggle = (col) => {
    let updated;
    if (selectedColumns.includes(col)) {
      updated = selectedColumns.filter((c) => c !== col);
    } else {
      updated = [...selectedColumns, col];
    }
    setSelectedColumns(updated);

    const newVisibility = {};
    Object.keys(visibleColumns).forEach((key) => {
      newVisibility[key] = updated.includes(key);
    });
    setVisibleColumns(newVisibility);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) {
      toast.error("Title and Description are required");
      return;
    }
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    toast.success("Task added successfully!");
    setAddTaskOpen(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Low",
      status: "Pending",
    });
    console.log(newTask)
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs bg-white px-4 py-2 border rounded-lg shadow-sm flex-1"
      />

      <div className="flex gap-2">
        {/* Add Task Button */}
        <Button
          onClick={() => setAddTaskOpen(true)}
          variant="primary"
          className="flex items-center gap-1 bg-transparent border border-gray-200 hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          <PlusCircle className="h-4 w-4" /> Add Task
        </Button>

        {/* Multi-select Column Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-52 justify-between">
              {selectedColumns.length > 0
                ? `${selectedColumns.length} column(s) selected`
                : "Select columns"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0">
            <Command>
              <CommandInput placeholder="Search columns..." />
              <CommandEmpty>No column found.</CommandEmpty>
              <CommandGroup>
                {Object.keys(visibleColumns).map((col) => (
                  <CommandItem
                    key={col}
                    onSelect={() => handleColumnToggle(col)}
                    className="flex items-center justify-between"
                  >
                    <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                    {selectedColumns.includes(col) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Add Task Modal */}
      <Dialog open={addTaskOpen} onOpenChange={() => setAddTaskOpen(false)}>
        <DialogOverlay className="fixed inset-0 bg-transparent backdrop-blur-xs" />
        <DialogContent
          className="sm:max-w-lg space-y-4 mb-0"
          showCloseButton={false}
        >
          <h3 className="text-xl font-semibold border-b pb-2">Add New Task</h3>

          <div className="flex flex-col space-y-4">
            {/* Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Description</label>
              <textarea
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-gray-500"
                rows={4}
              />
            </div>

            {/* Priority */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Priority</label>
              <Select
                value={newTask.priority}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t mb-0">
            <Button
              onClick={handleAddTask}
              variant="primary"
              className="w-full sm:w-auto bg-black text-white"
            >
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchAndColumnToggle;
