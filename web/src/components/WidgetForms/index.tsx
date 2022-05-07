import { useState } from "react";


import bugImageUrl from "../../assets/bug.svg"
import ideaImageUrl from "../../assets/idea.svg"
import thoughtImageUrl from "../../assets/thought.svg"

import { FeedbackTypesSteps } from "./Steps/FeedbackTypesSteps";
import { FeedbackContentSteps } from "./Steps/FeedbackContentSteps";
import { FeedbackSuccesseSteps } from "./Steps/FeedbackSuccesseSteps";


export const feedbackTypes ={
    BUG:{
        title:'Problema',
        image:{
            source:bugImageUrl,
            atl:'imagem de um inseto'
        }
    },
    IDEA:{
        title:'Ideia',
        image:{
            source:ideaImageUrl,
            atl:'imagem de uma lampada'
        }
    },
    OTHERS:{
        title:'Outro',
        image:{
            source:thoughtImageUrl,
            atl:'imagem de uma nuvem de pensamentos'
        }
    }
}

export type Feedbacktypes = keyof typeof feedbackTypes

export function WidgetForms(){

    const [typeFeedback, setTypeFeedback] = useState<Feedbacktypes | null>()
    const [feedbackSend, setFeedbackSend] = useState<boolean>(false)
    function handleResetFeedback(){  
        setTypeFeedback(null)
        setFeedbackSend(false)
        
    }
    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSend ? (
                <FeedbackSuccesseSteps onHandleResetFeedbackSend={handleResetFeedback}/>
            ):(
                <>
                {!typeFeedback ? (
                <FeedbackTypesSteps onFeedbackTypesChanged={setTypeFeedback} />
            ) : 
            (
                <FeedbackContentSteps 
                onResetResquest={handleResetFeedback} 
                feedbackType={typeFeedback} 
                onFeedbackSend={()=> setFeedbackSend(true)}
                />
            )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                <p>Feito com ♥ pela <a className="underline underline-offset-1" href="https://rocketseat.com.br">Rocketseat</a></p>
            </footer>
        </div>
    )
}