import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbackRepository } from "../repositories/feedback-repositry"




export interface SubmitFeedbackServiceRequest{
    type:string,
    comment:string,
    screenshot?:string
}


export class SubmitFeedbackService{

    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailAdaptor: MailAdapter
        
    ){}



    async execute(request: SubmitFeedbackServiceRequest){
        const {type, comment, screenshot} = request
        
        if(!type){
            throw new Error('Type is required')
        }
        if(!comment){
            throw new Error('Type is comment')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64,')){
            throw new Error('Format invalid')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdaptor.sendMail({
            subject:'Novo feedback',
            body:[
                `<div style="font-family: sans-serif; font-size:16px; font-color:#222">`,
                `<p>Tipo do Feedback:${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<img src="${screenshot}" />`,
                `</div>`
            ].join('\n')
        })
    }
}