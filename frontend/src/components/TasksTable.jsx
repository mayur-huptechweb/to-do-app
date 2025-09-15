import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, RotateCcw, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

const TasksTable = ({
  tasks,
  visibleColumns,
  handleDelete,
  handleToggleStatus,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          {/* sr. no */}
          <tr>
            {visibleColumns.no && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  truncate whitespace-nowrap">
                Sr. No
              </th>
            )}
            {visibleColumns.title && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                Title
              </th>
            )}
            {visibleColumns.description && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                Description
              </th>
            )}
            {visibleColumns.priority && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                Priority
              </th>
            )}
            {visibleColumns.status && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">
                Status
              </th>
            )}
            {visibleColumns.actions && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 ">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="">
                {visibleColumns.no && (
                  <td className="px-6 py-4 truncate whitespace-nowrap font-medium">
                    {task.id}
                  </td>
                )}
                {visibleColumns.title && (
                  <td className="px-6 py-4 truncate whitespace-nowrap font-medium">
                    {task.title}
                  </td>
                )}
                {visibleColumns.description && (
                  <td className="px-6 py-4 truncate whitespace-nowrap overflow-hidden">
                    {truncateText(task.description, 50)}
                  </td>
                )}

                {visibleColumns.priority && (
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        task.priority === "High"
                          ? "destructive"
                          : task.priority === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </td>
                )}

                {visibleColumns.status && (
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        task.status === "Completed" ? "default" : "outline"
                      }
                      className={
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {task.status}
                    </Badge>
                  </td>
                )}

                {visibleColumns.actions && (
                  <td className="flex flex-row items-center justify-end px-6 py-4 text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleToggleStatus(task.id)}
                    >
                      {task.status === "Pending" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <RotateCcw className="h-4 w-4 text-yellow-600" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setSelectedTask(task)}
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogOverlay className="fixed inset-0 bg-transparent backdrop-blur-xs" />

        <DialogContent
          className="sm:max-w-lg space-y-6 mb-0"
          showCloseButton={false}
        >
          {/* Title + Priority */}
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-xl font-semibold">{selectedTask?.title}</h3>
            {selectedTask?.priority && (
              <Badge
                variant={
                  selectedTask?.priority === "High"
                    ? "destructive"
                    : selectedTask?.priority === "Medium"
                    ? "secondary"
                    : "outline"
                }
              >
                {selectedTask?.priority}
              </Badge>
            )}
          </div>

          {/* Status */}
          <div>
            <p className="text-md font-medium text-gray-900 mb-1">Status</p>
            <Badge
              variant={
                selectedTask?.status === "Completed" ? "default" : "outline"
              }
              className={
                selectedTask?.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {selectedTask?.status}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <p className="text-md font-medium text-gray-800 mb-1">
              Description
            </p>
            <p className="text-gray-600 text-sm">{selectedTask?.description}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t mb-0">
            <Button
              onClick={() => setSelectedTask(null)}
              variant="primary"
              className="w-full sm:w-auto bg-black text-white" // full width on mobile, auto width on sm+
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksTable;
