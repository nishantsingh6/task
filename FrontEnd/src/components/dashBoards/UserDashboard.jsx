import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ReactMarkdown from 'react-markdown';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const initialTasks = [
  { id: '1', content: 'Design login UI', status: 'todo', description: '### UI for Login\n- Email\n- Password' },
  { id: '2', content: 'Fix backend auth bug', status: 'in-progress', description: '#### Bug related to token expiration' },
  { id: '3', content: 'Test signup flow', status: 'done', description: 'Complete signup form test cases' },
];

const UserDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const draggedTask = tasks[source.index];
    const updatedTasks = [...tasks];
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);

    setTasks(updatedTasks);
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const taskStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [2, 3, 1, 4, 5],
        borderColor: 'rgba(34,197,94,1)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setNotificationsOpen(true)}
        >
          Notifications
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {['todo', 'in-progress', 'done'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded shadow min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold capitalize mb-4">{status}</h2>
                  {taskStatus[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-100 p-3 rounded mb-3 cursor-pointer hover:bg-gray-200"
                          onClick={() => openTaskDetails(task)}
                        >
                          {task.content}
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

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[600px] p-6 rounded shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4">{selectedTask.content}</h3>
            <ReactMarkdown className="prose">{selectedTask.description}</ReactMarkdown>
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-3 right-4 text-red-500 font-semibold"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {notificationsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[400px] p-6 rounded shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-2">
              <li>📌 Task "Login UI" is due tomorrow</li>
              <li>💬 New comment on "Signup Bug"</li>
            </ul>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <div className="bg-white p-6 mt-10 rounded shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Your Weekly Productivity</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default UserDashboard;
