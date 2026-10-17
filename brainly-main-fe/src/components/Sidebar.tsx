import { Logo } from "../icons/logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 ">
        <div className="flex text-2xl pt-8 pl-4 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>  
            Brainly
        </div>
        <div className="pt-4 pl-6">
            <SidebarItem text="Twitter" icon={<TwitterIcon/>} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>} />
        </div>
            
    </div>
}