import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { EmployeeController, createEmployeeValidator, getEmployeeValidator } from '../modules/employees/EmployeeController.js';
import { TaskController, createTaskValidator, getOrDeleteTaskValidator, listEmployeeTasksValidator } from '../modules/tasks/TaskController.js';
import * as authService from '../services/authService.js';
import { validate } from '../utils/validator.js';
import { z } from 'zod';

const router = Router();
const employeeController = new EmployeeController();
const taskController = new TaskController();

// Auth
const registerSchema = z.object({
  body: z.object({ username: z.string().min(3), password: z.string().min(6) })
});
const loginSchema = z.object({
  body: z.object({ username: z.string().min(3), password: z.string().min(6) })
});

router.post('/auth/register', validate(registerSchema), async (req, res) => {
  try {
    const { username, password } = (req as any).parsed.body;
    const user = await authService.register(username, password);
    res.json({ user });
  } catch (err:any) { res.status(400).json({ error: err.message }); }
});

router.post('/auth/login', validate(loginSchema), async (req, res) => {
  try {
    const { username, password } = (req as any).parsed.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err:any) { res.status(400).json({ error: err.message }); }
});

// Employee routes (protected)
router.post('/employees', requireAuth, createEmployeeValidator, employeeController.create.bind(employeeController));
router.get('/employees/:id', requireAuth, getEmployeeValidator, employeeController.getById.bind(employeeController));
router.get('/employees', requireAuth, employeeController.list.bind(employeeController));

// New endpoint: employees with tasks & progress
router.get('/employees-with-tasks', requireAuth, employeeController.listWithTasks.bind(employeeController));

// Task routes (protected)
router.post('/tasks', requireAuth, createTaskValidator, taskController.create.bind(taskController));
router.get('/tasks/:id', requireAuth, getOrDeleteTaskValidator, taskController.getById.bind(taskController));
router.delete('/tasks/:id', requireAuth, getOrDeleteTaskValidator, taskController.delete.bind(taskController));
router.get('/employees/:id/tasks', requireAuth, listEmployeeTasksValidator, taskController.listForEmployee.bind(taskController));
router.post('/tasks/:id/complete', requireAuth, getOrDeleteTaskValidator, taskController.markDone.bind(taskController));

export default router;
