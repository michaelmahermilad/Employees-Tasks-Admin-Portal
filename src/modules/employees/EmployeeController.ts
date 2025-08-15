import type { Request, Response } from 'express';
import { z } from 'zod';
import { EmployeeService } from './EmployeeService.js';
import { validate } from '../../utils/validator.js';

const service = new EmployeeService();

const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.string().optional()
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional()
});

const getEmployeeSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
});

export const createEmployeeValidator = validate(createEmployeeSchema);
export const getEmployeeValidator = validate(getEmployeeSchema);

export class EmployeeController {
  async create(req: Request, res: Response) {
    const { name, email, role } = (req as any).parsed.body;
    const employee = await service.createEmployee({ name, email, role });
    res.status(201).json({ employee });
  }

  async getById(req: Request, res: Response) {
    const id = Number((req as any).parsed.params.id);
    const employee = await service.getEmployee(id);
    res.json({ employee });
  }

  async list(req: Request, res: Response) {
    const employees = await service.listEmployees();
    res.json({ employees });
  }

  async listWithTasks(req: Request, res: Response) {
    const employees = await service.listEmployeesWithTasks();
    const withProgress = employees.map(emp => {
      const total = emp.tasks.length;
      const done = emp.tasks.filter(t => t.status === 'DONE').length;
      const progress = total > 0 ? Math.round((done / total) * 100) : 0;
      return { id: emp.id, name: emp.name, email: emp.email, role: emp.role, progress, tasks: emp.tasks };
    });
    res.json({ employees: withProgress });
  }
}
