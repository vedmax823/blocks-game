import { Linkedin } from "lucide-react"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <div className="w-full flex justify-around md:p-3 p-1 items-center">
            <p className="md:p-3 p-1 text:xl md:text-4xl text-amber-500 font-bold">Blocks game</p> 
             
                <div className="font-semibold flex items-center gap-x-2">
                    <span className="text-sm md:text-xl">
                    created by 
                    </span>
                    <Link 
                        href='https://www.linkedin.com/in/max-vedernikov-5b4572247/' 
                        rel="noopener noreferrer" target="_blank"
                        className="flex items-center gap-x-2 text-amber-500 text-bolt hover:opacity-75 text-sm md:text-xl">
                        Max Vedernikov <Linkedin size={24} strokeWidth={2}/>
                    </Link>
                </div>
            
            </div>
        </header>
    )
}

export default Header