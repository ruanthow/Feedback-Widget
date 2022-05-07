import { ChatTeardropDots } from "phosphor-react";
import { Popover } from '@headlessui/react'

import { useState } from "react";
import { WidgetForms } from "../WidgetForms";

export function Widget() {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);

    function WidgetVisibiity(){
        setIsWidgetOpen(!isWidgetOpen)
    }

    return (
        <Popover className="absolute bottom-4 right-4 md:bottom-8 md:rigth-8 flex flex-col items-end">
            <Popover.Panel>
                <WidgetForms />
            </Popover.Panel>

            <Popover.Button onClick={WidgetVisibiity} className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
                <ChatTeardropDots className="w-6 h-6" />

                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                    <span className="pl-2">
                        FeedBack
                    </span>
                </span>
            </Popover.Button>
        </Popover>
    )
}