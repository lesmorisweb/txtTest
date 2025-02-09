import { Router } from "express";
import contentRoutes from "./content.routes";
import titleRoutes from "./title.routes";
import { convertTxt, validatePost } from "../middleware/middleware";


const router= Router();

router.get("/titles", titleRoutes);
router.get("/content", contentRoutes);

router.use("*", validatePost);
router.post('/generate-txt', (convertTxt as any), (req, res) => {
    res.status(200).json({ message: 'Archivo generado exitosamente' });
    });

export default router