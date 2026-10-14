import type { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement
}){
    return <div className="flex items-center cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-200">
        <div className="pr-2 py-2">
            {icon}
        </div> 
        <div className="">
            {text}
        </div>
    </div>
}