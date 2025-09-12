import { Button } from "@/components/ui/button";

const TasksTable = ({ tasks, visibleColumns, handleDelete, handleToggleStatus }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {visibleColumns.title && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>}
            {visibleColumns.description && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>}
            {visibleColumns.priority && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>}
            {visibleColumns.status && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>}
            {visibleColumns.actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id}>
              {visibleColumns.title && <td className="px-6 py-4">{task.title}</td>}
              {visibleColumns.description && <td className="px-6 py-4">{task.description}</td>}
              {visibleColumns.priority && <td className="px-6 py-4">{task.priority}</td>}
              {visibleColumns.status && <td className="px-6 py-4">{task.status}</td>}
              {visibleColumns.actions && (
                <td className="px-6 py-4 space-x-2">
                  <Button size="sm" onClick={() => handleToggleStatus(task.id)}>Toggle Status</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(task.id)}>Delete</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && <p className="p-4 text-center text-gray-500">No tasks found.</p>}
    </div>
  );
};

export default TasksTable;
