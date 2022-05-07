import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Feedbacktypes, feedbackTypes } from ".."
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreenShotButton } from "./ScreenShotButton";

interface FeebackContentStepsProps{
    feedbackType: Feedbacktypes,
    onResetResquest: () => void,
    onFeedbackSend: () => void
}



export function FeedbackContentSteps({feedbackType, onResetResquest, onFeedbackSend}:FeebackContentStepsProps){

    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [comment, setComment] = useState<string | null>('')
    const [screenShot, setScreenShot] = useState<string | null>(null)
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)


   async function onHandleSubmit(event:FormEvent){
        event.preventDefault();
        setIsSendingFeedback(true)
        
         await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot: screenShot
        })
        setIsSendingFeedback(false)
        onFeedbackSend();
    }

    return(
        <>
            <header>
                <button 
                type="button" 
                className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                onClick={onResetResquest}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4 " />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.atl} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={onHandleSubmit} className="my-4 w-full">
                <textarea 
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-bg-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder="Conte com detalhes o que está acontecendo..."
                onChange={(e)=> setComment(e.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                   <ScreenShotButton
                   screenshot={screenShot} 
                   onScreenshotToke={setScreenShot}
                   />
                    <button
                     disabled={comment?.length === 0 || isSendingFeedback} 
                     type="submit"
                     className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar outra ideia'}
                    </button>
                </footer>
            </form>
        </>
    )
}