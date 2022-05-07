import express from 'express';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-adaptor';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';


export const routes = express.Router()



 routes.post('/feedbacks', async (req, res)=>{
    
    const {type, comment, screenshot} = req.body; 

    
    
    
   const feedbackPrismaRepository = new PrismaFeedbackRepository()
   const nodeMailer = new NodeMailerAdapter()
   const submitFeedbackServices = new SubmitFeedbackService(
       feedbackPrismaRepository, 
       nodeMailer
       )

   await submitFeedbackServices.execute({
       type,
       comment,
       screenshot
   })


    return res.status(201).send()
})
