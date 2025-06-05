import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const STATUS_ORDER = ['todo', 'in-progress', 'done'];

const statusTitles = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const ProjectDashboard = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create axios instance with Bearer token inside component
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/project', // replace with your backend URL
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/projects/${projectId}`);
        setProject(res.data.project);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch project:', error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    try {
      await axiosInstance.put(`/tasks/${draggableId}`, {
        status: destination.droppableId,
      });

      setProject((prev) => {
        const updatedTasks = prev.tasks.map((task) =>
          task._id === draggableId ? { ...task, status: destination.droppableId } : task
        );
        return { ...prev, tasks: updatedTasks };
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!project) return <div className="p-10 text-center text-red-500">Project not found or access denied.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded p-6">
        {/* Project Header */}
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="mb-6">
          <h2 className="font-semibold mb-1">Members:</h2>
          <ul className="flex space-x-4">
            {project.members.map((member) => (
              <li key={member._id} className="text-sm text-gray-600">
                {member.name} ({member.role || 'Member'})
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6">
            {STATUS_ORDER.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-50 rounded p-4 flex-1 min-h-[400px] ${
                      snapshot.isDraggingOver ? 'bg-blue-100' : ''
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4">{statusTitles[status]}</h3>

                    {project.tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task._id} index={index} key={task._id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded shadow p-4 mb-3 cursor-pointer ${
                                snapshot.isDragging ? 'bg-blue-200' : ''
                              }`}
                            >
                              <h4 className="font-semibold">{task.title}</h4>
                              <p className="text-sm text-gray-600 truncate">{task.description}</p>
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                <span className={`capitalize font-semibold ${task.priority === 'high' ? 'text-red-600' : 'text-gray-700'}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <div className="mt-2 text-xs">
                                Assigned to:{' '}
                                {task.assignedTo
                                  .map((u) => u.name)
                                  .join(', ') || 'Unassigned'}
                              </div>
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
      </div>
    </div>
  );
};

export default ProjectDashboard;
