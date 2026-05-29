import type { Request, Response } from "express";
import { leadService } from "../services/lead.service.js";

export const leadController = {
  async create(req: Request, res: Response) {
    const result = await leadService.create(req.body);
    res.status(201).json(result);
  },

  async getAll(req: Request, res: Response) {
    const result = await leadService.getAll(req.query);
    res.status(200).json(result);
  },

  async getById(req: Request, res: Response) {
    const result = await leadService.getById(String(req.params.id));
    res.status(200).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await leadService.update(String(req.params.id), req.body);
    res.status(200).json(result);
  },

  async delete(req: Request, res: Response) {
    const result = await leadService.delete(String(req.params.id));
    res.status(200).json(result);
  }
};
