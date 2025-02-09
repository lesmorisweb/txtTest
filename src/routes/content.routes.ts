import { Router } from "express";
import { createContent, getContentById, updateContentPropety } from "../controller/domain/domains";


const router= Router()

router.post("/createContent", createContent);
router.get("/getContentById", getContentById);
router.put("/updateContent", updateContentPropety);

export default router