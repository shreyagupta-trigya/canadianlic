import React, { useState } from 'react';
import CloseActivityDrawer from './CloseActivityDrawer';

const CloseActivity = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <CloseActivityDrawer isOpen={isDrawerOpen} speed={500} onClose={closeDrawer} />
            <div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 mr-4">
                            <div className="relative inline-block">
                                <input className="px-2.5 py-2.5 pr-10 border-2 border-gray-300 rounded-md text-base w-64 transition-colors duration-300 focus:outline-none focus:border-blue-300" type="search" placeholder="Search" aria-label="Search" />
                                <i className="fas fa-search absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-600"></i>
                            </div>
                        </div>
                        {/* <div>
                            <button className="bg-white text-blue-600 border border-blue-600 px-2 py-1 mt-3 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 hover:rounded-lg hover:font-semibold hover:shadow-lg" onClick={toggleDrawer}>Add New</button>
                        </div> */}
                    </div>

                    <div className="border border-gray-300 rounded-md overflow-scroll scrollbar-hide px-0 mt-3">
                        <table className="text-sm text-gray-800">
                            <thead>
                                <tr>
                                    <td className="w-4">
                                        <input className="w-4 h-4" type="checkbox" value="" />
                                    </td>
                                    <td className="text-gray-800 font-semibold">Task Name</td>
                                    <td className="text-gray-800 font-semibold">Status</td>
                                    {/* <td className="text-gray-800 font-semibold">Open</td>
                                    <td className="text-gray-800 font-semibold">Close</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input className="w-4 h-4" type="checkbox" value="" />
                                    </td>
                                    <td className="cursor-pointer">Final Submission</td>
                                    <td className="cursor-pointer">Close</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input className="w-4 h-4" type="checkbox" value="" />
                                    </td>
                                    <td className="cursor-pointer">Status pending</td>
                                    <td className="cursor-pointer">Close</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input className="w-4 h-4" type="checkbox" value="" />
                                    </td>
                                    <td className="cursor-pointer">Update record</td>
                                    <td className="cursor-pointer">Close</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CloseActivity;
