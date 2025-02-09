import { request, Request, response, Response } from "express";
import { Title } from "../../models/Title";
import { Content } from "../../models/Content";


export async function getTitleById (req: Request, res:Response){

    const title= req.body

    if(!title){
        res.status(400).json();
        return;
    }

    const filteredTitle= Title.findOne({
        where: {
            id: title.id
        }
    })

    if(!filteredTitle){
        res.status(404).json();
        return
    }

    res.status(200).json();
}

export async function postTitle (req: Request, res:Response){
    const title= req.body

    if(!title){
        res.status(400).json();
        return;
    }

    const createTitle= await Title.create({
        contentId: title.contentId,
        title: title.title
    })

    res.status(200).json(createTitle)
}

export async function createContent (req: Request, res: Response) {
    const {title, content}= req.body;

    if(!title || typeof content !== `object`){
        res.status(400).json({message:"The content must have a title and be a object"})
        return
    }

    const createContent= await Content.create({
        content: content.content,
        titleId: content.titleId
    })

    res.status(200).json(createContent)
}

export async function getContentById(req: Request, res: Response) {
    const content= req.params;

    const filteredContent= await Content.findOne({
        where:{
            id: content.id
        }
    })

    if(!filteredContent){
        res.status(404).json({message: "Don't exist a content whit this id"})
        return;
    }

    res.status(200).json(filteredContent)
}

export async function updateContentPropety(req: Request, res:Response) {
    
    const {content, contentKey, newValue} = req.body;

    const filteredContent= await Content.findOne({
        where: {
            id: content.id
        }
    })

    if (!filteredContent){
        res.status(404).json({message:"Content don't found"});
        return
    }
    const contentData = filteredContent?.content as Record<string, any>;

if (!contentData.hasOwnProperty(contentKey)) {
    res.status(400).json({ message: `The key '${contentKey}' doesn't exist` });
    return;
}

contentData[contentKey] = newValue;

filteredContent.content = JSON.parse(JSON.stringify(contentData));
await filteredContent.save();
}
