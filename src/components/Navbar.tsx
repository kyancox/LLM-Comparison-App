// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="p-2 mb-2 text-white text-lg font-semibold" style={{ backgroundColor: '#96d3fe' }}>
            <div className=" mx-auto flex justify-between items-center font">
                <div className="">
                    <Link href="/" className='flex flex-row'>
                        <Image src='/logo.png' alt='logo' height={50} width={50}/>
                        <h1 className=' my-auto'>LLM Comparison</h1>
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/votes" className=" hover:underline">
                        Votes
                    </Link>
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="https://linkedin.com/in/kyancox" className="hover:underline hidden">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

