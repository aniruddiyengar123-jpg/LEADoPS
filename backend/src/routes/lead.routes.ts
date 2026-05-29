import { Router } from "express";
import { leadController } from "../controllers/lead.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import { createLeadSchema, leadIdSchema, listLeadsSchema, updateLeadSchema } from "../validators/lead.validator.js";

export const leadRouter = Router();

leadRouter.use(authenticate);

leadRouter.post("/", validate(createLeadSchema), asyncHandler(leadController.create));
leadRouter.get("/", validate(listLeadsSchema), asyncHandler(leadController.getAll));
leadRouter.get("/:id", validate(leadIdSchema), asyncHandler(leadController.getById));
leadRouter.patch("/:id", validate(updateLeadSchema), asyncHandler(leadController.update));
leadRouter.delete("/:id", validate(leadIdSchema), asyncHandler(leadController.delete));
