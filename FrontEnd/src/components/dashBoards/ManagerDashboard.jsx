import React, { useState } from 'react';

const ManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Dev' },
    { id: 2, name: 'Bob Smith', role: 'Backend Dev' },
    { id: 3, name: 'Carol White', role: 'UI Designer' },
  ];

  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress' },
    { id: 2, name: 'API Integration', status: 'Completed' },
    { id: 3, name: 'User Onboarding', status: 'Pending' },
  ];

  const tasks = [
    { id: 1, title: 'Setup project repo', status: 'To Do' },
    { id: 2, title: 'Design dashboard UI', status: 'In Progress' },
    { id: 3, title: 'Code auth routes', status: 'Done' },
    { id: 4, title: 'Write unit tests', status: 'To Do' },
    { id: 5, title: 'Review PRs', status: 'In Progress' },
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Dashboard</h1>

      {/* Team & Projects */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Team */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <ul className="space-y-2">
            {teamMembers.map((member) => (
              <li key={member.id} className="flex justify-between text-gray-700">
                <span>{member.name}</span>
                <span className="text-sm text-gray-500">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="flex justify-between text-gray-700">
                <span>{project.name}</span>
                <span className={`text-sm ${project.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 border w-full md:w-1/3 border-gray-300 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task Board */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div key={status}>
              <h3 className="text-lg font-medium text-gray-700 mb-2">{status}</h3>
              <ul className="space-y-2">
                {filteredTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <li
                      key={task.id}
                      className="p-3 border rounded bg-gray-50 hover:bg-gray-100 transition"
                    >
                      {task.title}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
