import { Router } from "express";
import { getMessages, createMessage, deleteMessage } from "../controllers/messages.controller.js";

const router = Router();

router.get("/", getMessages);
router.post("/", createMessage);
router.delete("/:mid", deleteMessage);

export default router;