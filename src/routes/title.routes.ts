import { Router } from "express";
import { postTitle, getTitleById } from "../controller/domain/domains";


const router= Router();

router.post("/createTitle", postTitle);
router.get("getTitleByTitle", getTitleById);

export default router