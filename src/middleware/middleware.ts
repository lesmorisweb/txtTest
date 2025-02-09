import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from 'fs';

const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.object().pattern(Joi.string(), Joi.object().unknown()).required(),
});

export const validatePost = (req:Request, res:Response, next: NextFunction) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
    }
    next();
};


export const convertTxt = (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'El título y contenido son obligatorios' });
    }

    const textContent = `Title: ${title}\nContent: ${JSON.stringify(content, null, 2)}`;
    const filePath = path.join(__dirname, 'output.txt');

    fs.writeFile(filePath, textContent, (err) => {
        if (err) {
        return res.status(500).json({ error: 'Error al generar el archivo' });
        }

        console.log('File generated successfully');

      // Importante: Usa `next()` solo si deseas que otro middleware se ejecute después
        next();
    });
};

