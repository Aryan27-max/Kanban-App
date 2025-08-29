export  interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assigneeId?: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
  members: string[];
}
 