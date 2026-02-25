import  Express  from "express";

import { createEvent } from "../controllers/event.controller";

const eventRouter = Express.Router()

eventRouter.post("/createEvent",createEvent)


export default  eventRouter;