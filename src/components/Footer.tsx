import React from 'react'

export const Footer = () => {
    const year = new Date();
    return (
        <div className="p-4 md:flex justify-center md:p-6 w-full">
            <span className="text-sm text-gray-500 sm:text-center">© {year.getFullYear()} <a href="/" className="hover:underline">Adrian Garcia Rios™</a>. All Rights Reserved.
            </span>
        </div>
    )
}
