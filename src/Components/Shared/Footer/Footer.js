import React from 'react';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" bg-gray-100 text-black">
            <div className="container flex items-center gap-8 p-4 md:p-8 lg:flex-col divide-gray-400">
                <div className='flex items-center'>
                    <span className="dark:text-gray-800">© Copyright 2022. BiCycle Keepr. All Rights Reserved.</span>
                </div>
                <div className="flex justify-end items-center pt-6 lg:pt-0">
                    <div className="flex space-x-4">
                        <a rel="noopener noreferrer" href='/' title="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900">
                            <FaFacebook />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Pinterest" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900">
                            <FaTwitter />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900">
                            <FaInstagram />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900">
                            <FaDiscord />
                        </a>
                        <a rel="noopener noreferrer" href="/" title="Gmail" className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-gray-900">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;