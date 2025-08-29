import  { User, Task, Board } from './types';

class Store {
  private users: User[] = [
    { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
    { id: '2', email: 'john@example.com', name: 'John Doe', role: 'member' }
  ];

  private boards: Board[] = [
    {
      id: '1',
      name: 'Project Alpha',
      members: ['1', '2'],
      tasks: [
        {
          id: '1',
          title: 'Setup Development Environment',
          description: 'Configure local development setup',
          status: 'done',
          assigneeId: '1',
          createdAt: '2024-01-15',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Create User Authentication',
          description: 'Implement login and registration',
          status: 'in-progress',
          assigneeId: '2',
          createdAt: '2024-01-16',
          priority: 'high'
        },
        {
          id: '3',
          title: 'Design Database Schema',
          description: 'Plan database structure',
          status: 'todo',
          createdAt: '2024-01-17',
          priority: 'medium'
        }
      ]
    }
  ];

  private currentUser: User | null = null;

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email);
    if (user && password === 'password') {
      this.currentUser = user;
      return user;
    }
    return null;
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getBoards(): Board[] {
    return this.boards;
  }

  getBoard(id: string): Board | undefined {
    return this.boards.find(b => b.id === id);
  }

  updateTask(boardId: string, taskId: string, updates: Partial<Task>) {
    const board = this.boards.find(b => b.id === boardId);
    if (board) {
      const task = board.tasks.find(t => t.id === taskId);
      if (task) {
        Object.assign(task, updates);
      }
    }
  }

  addTask(boardId: string, task: Omit<Task, 'id'>) {
    const board = this.boards.find(b => b.id === boardId);
    if (board) {
      const newTask: Task = {
        ...task,
        id: Date.now().toString()
      };
      board.tasks.push(newTask);
    }
  }

  deleteTask(boardId: string, taskId: string) {
    const board = this.boards.find(b => b.id === boardId);
    if (board) {
      board.tasks = board.tasks.filter(t => t.id !== taskId);
    }
  }
}

export const store = new Store();
 