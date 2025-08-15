import { prisma } from '../../prisma.js';
import type { Employee } from '@prisma/client';

export class EmployeeRepository {
  async create(data: Pick<Employee, 'name' | 'email' | 'role'>) {
    return prisma.employee.create({ data });
  }

  async findById(id: number) {
    return prisma.employee.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.employee.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findAllWithTasks() {
    return prisma.employee.findMany({ include: { tasks: true }, orderBy: { createdAt: 'desc' } });
  }
}
