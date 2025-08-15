import type { Employee } from '@prisma/client';
import { EmployeeRepository } from './EmployeeRepository.js';
import { HttpError } from '../../middleware/errorHandler.js';

export class EmployeeService {
  private repo = new EmployeeRepository();

  async createEmployee(data: Pick<Employee, 'name' | 'email' | 'role'>) {
    return this.repo.create(data);
  }

  async getEmployee(id: number) {
    const emp = await this.repo.findById(id);
    if (!emp) throw new HttpError(404, 'Employee not found');
    return emp;
  }

  async listEmployees() {
    return this.repo.findAll();
  }

  async listEmployeesWithTasks() {
    return this.repo.findAllWithTasks();
  }
}
