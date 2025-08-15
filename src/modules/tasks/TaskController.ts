import type { Request, Response } from 'express';
import { z } from 'zod';
import { TaskService } from './TaskService.js';
import { validate } from '../../utils/validator.js';

const service = new TaskService();

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    employeeId: z.number().int().positive()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const getOrDeleteTaskSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

const listEmployeeTasksSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

export const createTaskValidator = validate(createTaskSchema);
export const getOrDeleteTaskValidator = validate(getOrDeleteTaskSchema);
export const listEmployeeTasksValidator = validate(listEmployeeTasksSchema);

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, description, employeeId } = (req as any).parsed.body;
    const task = await service.createTask({ title, description, employeeId });
    res.status(201).json({ task });
  }

  async getById(req: Request, res: Response) {
    const id = Number((req as any).parsed.params.id);
    const task = await service.getTask(id);
    res.json({ task });
  }

  async delete(req: Request, res: Response) {
    const id = Number((req as any).parsed.params.id);
    await service.deleteTask(id);
    res.status(204).send();
  }

  async listForEmployee(req: Request, res: Response) {
    const employeeId = Number((req as any).parsed.params.id);
    const tasks = await service.tasksForEmployee(employeeId);
    res.json({ tasks });
  }

  async markDone(req: Request, res: Response) {
    const id = Number((req as any).parsed.params.id);
    const task = await service.completeTask(id);
    res.json({ task });
  }
}
