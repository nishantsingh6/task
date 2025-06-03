import React, { useState } from 'react';
import { FaUser, FaTasks } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [taskSearch, setTaskSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'manager' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'admin' },
  ];

  const [tasks, setTasks] = useState([
    { id: 101, title: 'Design Landing Page', status: 'In Progress', assignee: 'Alice Johnson' },
    { id: 102, title: 'Setup Database', status: 'Completed', assignee: 'Bob Smith' },
    { id: 103, title: 'Fix Login Bug', status: 'Pending', assignee: 'Charlie Brown' },
  ]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const filteredUsers = users.filter(user => {
    return (
      (roleFilter === 'All' || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()))
    );
  });

  const filteredTasks = tasks.filter(task => {
    return (
      (statusFilter === 'All' || task.status === statusFilter) &&
      task.title.toLowerCase().includes(taskSearch.toLowerCase())
    );
  });

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FaUser className="text-blue-500" /> All Users
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="p-2 border rounded"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All Roles</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tasks Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FaTasks className="text-green-500" /> All Tasks
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search task"
              value={taskSearch}
              onChange={(e) => setTaskSearch(e.target.value)}
              className="p-2 border rounded"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assignee</th>
                <th className="p-3">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{task.id}</td>
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.status}</td>
                  <td className="p-3">{task.assignee}</td>
                  <td className="p-3">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pie Chart */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Task Status Overview</h2>
        <div className="bg-white p-4 shadow rounded w-full max-w-xl mx-auto">
          <Pie data={pieData} />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
