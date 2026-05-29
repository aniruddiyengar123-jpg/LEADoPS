import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { leadRouter } from "./lead.routes.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    name: "Lead Management API",
    version: "1.0.0"
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/leads", leadRouter);
