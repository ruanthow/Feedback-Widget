import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";


interface ScreenShotButtonProps{
    screenshot: string | null;
    onScreenshotToke: (screenShot:string | null)=> void
}

export function ScreenShotButton({screenshot,onScreenshotToke}:ScreenShotButtonProps) {

    const [isTakingScreenShot, setIsTakingScreenShot ] = useState(false)

   async function handletakeScreenShot(){

        setIsTakingScreenShot(true)
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('data:image/png');
        onScreenshotToke(base64image);
        setIsTakingScreenShot(false)
    }

    if(screenshot){
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:bg-zinc-400 transition-colors"
                onClick={()=> onScreenshotToke(null)}
                style={{
                    backgroundImage:`url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize:'180'
                }}
            >
                <Trash weight="fill" />
            </button>
        )
    }
    return (
        <button
            type="button"
            onClick={handletakeScreenShot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700  focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors  "
        >
            {!isTakingScreenShot ? 
                (<Camera weight="regular" className="w-6 h-6 text-zinc-100" />)
                
            : 
                (<Loading />)
            }
        </button>

    )
}