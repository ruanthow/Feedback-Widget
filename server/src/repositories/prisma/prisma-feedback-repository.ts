import { primsa } from "../../prisma";
import { FeedbackRepository, FeedbackCreateData } from "../feedback-repositry";



export class PrismaFeedbackRepository implements FeedbackRepository{
   async create({type, comment, screenshot}: FeedbackCreateData){
        await primsa.feedback.create({
            data:{
                type,
                comment,
                screenshot
            }
         })
    }
}