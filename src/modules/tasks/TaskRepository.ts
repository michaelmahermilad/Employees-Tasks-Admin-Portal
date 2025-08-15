import { prisma } from '../../prisma.js';
import type { Task } from '@prisma/client';

export class TaskRepository {
  async create(data: { title: string; description?: string | null; employeeId: number }) {
    return prisma.task.create({ data });
  }

  async findById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  async deleteById(id: number) {
    return prisma.task.delete({ where: { id } });
  }

  async listByEmployee(employeeId: number) {
    return prisma.task.findMany({ where: { employeeId }, orderBy: { createdAt: 'desc' } });
  }

  async complete(id: number) {
    return prisma.task.update({
      where: { id },
      data: { status: 'DONE', completedAt: new Date() }
    });
  }
}
