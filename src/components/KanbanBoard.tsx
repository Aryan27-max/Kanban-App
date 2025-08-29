import  { useState, useEffect } from 'react';
import { Plus, Search, LogOut, User, Filter, Settings } from 'lucide-react';
import { store } from '../store';
import { Task, Board } from '../types';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

interface KanbanBoardProps {
  user: any;
  onLogout: () => void;
}

export default function KanbanBoard({ user, onLogout }: KanbanBoardProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const allBoards = store.getBoards();
    setBoards(allBoards);
    if (allBoards.length > 0) {
      setCurrentBoard(allBoards[0]);
    }
  }, []);

  const refreshBoard = () => {
    if (currentBoard) {
      const updated = store.getBoard(currentBoard.id);
      if (updated) {
        setCurrentBoard(updated);
        setBoards(store.getBoards());
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'in-progress' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (currentBoard) {
      store.updateTask(currentBoard.id, taskId, { status });
      refreshBoard();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const filteredTasks = currentBoard?.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  }) || [];

  const getTasksByStatus = (status: 'todo' | 'in-progress' | 'done') => {
    return filteredTasks.filter(task => task.status === status);
  };

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const, bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const, bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'done', title: 'Done', status: 'done' as const, bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
              {currentBoard && (
                <span className="text-sm text-gray-500">• {currentBoard.name}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>

              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`${column.bgColor} rounded-lg p-4 ${column.borderColor} border-2 border-dashed min-h-96`}
              onDrop={(e) => handleDrop(e, column.status)}
              onDragOver={handleDragOver}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">{column.title}</h2>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {getTasksByStatus(column.status).length}
                  </span>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {getTasksByStatus(column.status).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDragStart={(e) => handleDragStart(e, task)}
                    onEdit={() => {
                      setEditingTask(task);
                      setShowTaskModal(true);
                    }}
                    onDelete={() => {
                      if (currentBoard) {
                        store.deleteTask(currentBoard.id, task.id);
                        refreshBoard();
                      }
                    }}
                  />
                ))}
                
                {getTasksByStatus(column.status).length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          onSave={(taskData) => {
            if (currentBoard) {
              if (editingTask) {
                store.updateTask(currentBoard.id, editingTask.id, taskData);
              } else {
                store.addTask(currentBoard.id, {
                  ...taskData,
                  createdAt: new Date().toISOString().split('T')[0]
                });
              }
              refreshBoard();
            }
            setShowTaskModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
 