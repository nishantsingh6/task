import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Bell } from "lucide-react";
import axios from "axios";

const API_BASE_URL = "https://task-sy5x.onrender.com/api/task";

const columnStructure = {
  "todo": { title: "To Do", tasks: [] },
  "in-progress": { title: "In Progress", tasks: [] },
  "completed": { title: "Completed", tasks: [] },
};



export default function UserDashboard() {
  const [data, setData] = useState({ columns: columnStructure });
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Fetch tasks from backend
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tasks = res.data.tasks || res.data;

      const columns = {
        "todo": { ...columnStructure["todo"], tasks: [] },
        "in-progress": { ...columnStructure["in-progress"], tasks: [] },
        "completed": { ...columnStructure["completed"], tasks: [] },
      };

      for (let task of tasks) {
        const status = task.status;
        if (columns[status]) {
          columns[status].tasks.push({
            id: task._id,
            title: task.title,
            tag: task.priority,
            assignees: Array.isArray(task.assignedTo)
              ? task.assignedTo.map(user => user.avatar || "/avatars/default.png")
              : [task.assignedTo?.avatar || "/avatars/default.png"],
            dueDate: task.dueDate?.split("T")[0],
            comments: task.commentsCount || 0,
          });
        }
      }

      setData({ columns });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, []);





  const onDragEnd = async (result) => {
  const { source, destination } = result;

  // 🔒 Bail early if dropped outside a droppable area
  if (!destination) return;

  // 🔁 Same column logic
  if (source.droppableId === destination.droppableId) {
    const column = data.columns[source.droppableId];
    const copiedTasks = [...column.tasks];
    const [movedTask] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, movedTask);

    setData((prev) => ({
      columns: {
        ...prev.columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks,
        },
      },
    }));
    return;
  }

  // 🔁 Moving between different columns
  const sourceColumn = data.columns[source.droppableId];
  const destColumn = data.columns[destination.droppableId];

  const sourceTasks = [...sourceColumn.tasks];
  const destTasks = [...destColumn.tasks];

  const [movedTask] = sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, movedTask);

  setData((prev) => ({
    columns: {
      ...prev.columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    },
  }));

  // 🔄 Sync backend task status update
  try {
    await axios.put(`${API_BASE_URL}/${movedTask.id}`, {
      status: destination.droppableId, // Make sure this matches backend status values
    });
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};


const handleAddTask = async (columnKey) => {
  const token = localStorage.getItem("token");
  const userId = "665cf06b5fbe7f23b1a88a11"; // ✅ your actual user ID
  const projectId = "665cf0db5fbe7f23b1a88a23"; // ✅ your actual project ID

  const newTask = {
    title: "New Task",
    description: "Add description",
    assignedTo: userId,
    priority: "medium",
    dueDate: "2025-06-20",
    projectId,
    status: columnKey,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/task/", // ✅ correct endpoint
      newTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const task = res.data.task;

    const formattedTask = {
      id: task._id,
      title: task.title,
      tag: task.priority,
      assignees: Array.isArray(task.assignedTo)
        ? task.assignedTo.map((u) => u.avatar || "/avatars/default.png")
        : [task.assignedTo?.avatar || "/avatars/default.png"],
      dueDate: task.dueDate?.split("T")[0],
      comments: 0,
    };

    setData((prev) => ({
      columns: {
        ...prev.columns,
        [columnKey]: {
          ...prev.columns[columnKey],
          tasks: [...prev.columns[columnKey].tasks, formattedTask],
        },
      },
    }));
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error);
  }
};


  return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">📋 Project Dashboard</h1>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-3 py-1.5 border rounded text-sm w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
        />
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>

    {/* Notifications */}
    {notificationsOpen && (
      <div className="absolute right-4 top-20 bg-white dark:bg-gray-800 border rounded shadow-lg w-80 p-4 z-50">
        <h2 className="font-semibold mb-2">🔔 Notifications</h2>
        <ul className="space-y-2 text-sm">
          <li>New comment on “Set up analytics”</li>
          <li>“Landing page draft” is due soon</li>
          <li>User Jane assigned you to “Create campaign brief”</li>
        </ul>
        <button
          className="mt-3 text-blue-600 dark:text-blue-400 text-sm"
          onClick={() => setNotificationsOpen(false)}
        >
          Close
        </button>
      </div>
    )}

    {/* ✅ Guard against uninitialized columns */}
    {data.columns && Object.keys(data.columns).length > 0 ? (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(data.columns).map(([key, column]) => (
           <Droppable droppableId={key} key={key} isDropDisabled={false}>

              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white dark:bg-gray-800 rounded-md p-4 w-[300px] flex-shrink-0 shadow"
                >
                  <div className="flex justify-between mb-3 items-center">
                    <h2 className="font-semibold">{column.title}</h2>
                    <button
                      onClick={() => handleAddTask(key)}
                      className="text-xs text-gray-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-0.5 rounded">
                              {task.tag}
                            </span>
                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                          </div>
                          <div className="font-medium text-sm mb-2">{task.title}</div>
                          <div className="flex space-x-1 mb-1">
                            {task.assignees.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt="avatar"
                                className="h-6 w-6 rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">💬 {task.comments} comments</div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    ) : (
      <p>Loading tasks...</p>
    )}
  </div>
);

}
