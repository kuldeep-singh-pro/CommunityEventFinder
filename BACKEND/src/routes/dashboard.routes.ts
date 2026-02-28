import Express from "express";

import { getDashboard } from "../controllers/dashboard.controller";

const dashboardRouter = Express.Router();

dashboardRouter.get("/", getDashboard);

export default dashboardRouter;
