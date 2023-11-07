import Link from 'next/link';
import React from 'react'

export const Footer = () => {
    const year = new Date();
    return (
        <footer className="p-4 md:flex justify-center md:p-6 w-full text-center">
            <span className="text-sm text-gray-500 sm:text-center">© {year.getFullYear()} <Link href="/" className="hover:underline">Adrian Garcia Rios™</Link>. All Rights Reserved.
            </span>
        </footer>
    )
}
