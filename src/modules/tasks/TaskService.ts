import { TaskRepository } from './TaskRepository.js';
import { HttpError } from '../../middleware/errorHandler.js';

export class TaskService {
  private repo = new TaskRepository();

  async createTask(data: { title: string; description?: string; employeeId: number }) {
    return this.repo.create(data);
  }

  async getTask(id: number) {
    const t = await this.repo.findById(id);
    if (!t) throw new HttpError(404, 'Task not found');
    return t;
  }

  async deleteTask(id: number) {
    await this.getTask(id);
    return this.repo.deleteById(id);
  }

  async tasksForEmployee(employeeId: number) {
    return this.repo.listByEmployee(employeeId);
  }

  async completeTask(id: number) {
    await this.getTask(id);
    return this.repo.complete(id);
  }
}
