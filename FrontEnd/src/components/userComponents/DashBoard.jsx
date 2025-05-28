import React from 'react';

const DashBoard = () => {
  const tasks = {
    todo: [
      { id: 1, title: 'Create Website' },
      { id: 2, title: 'Create Backend' },
    ],
    inProgress: [
      { id: 3, title: 'Develop login flow' },
      { id: 4, title: 'Connect to backend API' },
    ],
    done: [
      { id: 5, title: 'Design system documentation' },
      { id: 6, title: 'User authentication logic' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TO DO COLUMN */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">To Do</h2>
            {tasks.todo.map((task) => (
              <div key={task.id} className="bg-blue-100 p-3 mb-3 rounded shadow-sm">
                {task.title}
              </div>
            ))}
          </div>

          {/* IN PROGRESS COLUMN */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">In Progress</h2>
            {tasks.inProgress.map((task) => (
              <div key={task.id} className="bg-yellow-100 p-3 mb-3 rounded shadow-sm">
                {task.title}
              </div>
            ))}
          </div>

          {/* DONE COLUMN */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Done</h2>
            {tasks.done.map((task) => (
              <div key={task.id} className="bg-green-100 p-3 mb-3 rounded shadow-sm">
                {task.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
