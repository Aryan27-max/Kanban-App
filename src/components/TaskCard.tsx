import  { Calendar, User, Flag, Edit, Trash } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onDragStart, onEdit, onDelete }: TaskCardProps) {
  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  };

  const priorityIcons = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash className="w-3 h-3" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full border text-xs font-medium ${priorityColors[task.priority]}`}>
            <span className="mr-1">{priorityIcons[task.priority]}</span>
            {task.priority}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-3 h-3" />
          <span>{task.createdAt}</span>
        </div>
      </div>

      {task.assigneeId && (
        <div className="mt-2 flex items-center space-x-1 text-xs text-gray-500">
          <User className="w-3 h-3" />
          <span>Assigned</span>
        </div>
      )}
    </div>
  );
}
 