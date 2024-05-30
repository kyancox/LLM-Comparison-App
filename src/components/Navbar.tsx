"use client"

// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="p-2 mb-2 text-white text-lg font-semibold bg-blue-900" >
            <div className=" mx-auto px-2 flex justify-between items-center font">
                <div className="">
                    <Link href="/" className='flex flex-row hover:text-slate-300 transition'>
                        <Image src='/logo-trans.png' alt='logo' height={50} width={50}/>
                        <h1 className=' my-auto'>LLM Comparison</h1>
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/votes" className={`hover:text-slate-300 transition ${pathname === '/votes' ? 'underline underline-offset-4 decoration-logoBlue decoration-2 text-xl' : ''}`}>
                        Votes
                    </Link>
                    <Link href="/about" className={`hover:text-slate-300 transition ${pathname === '/about' ? 'underline underline-offset-4 decoration-logoBlue decoration-2 text-xl' : ''}`}>
                        About
                    </Link>
                    <Link href="https://linkedin.com/in/kyancox" target='_blank' className="hover:text-slate-300 transition hidden md:inline">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

