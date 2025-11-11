import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const SessionRecording = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recordings, setRecordings] = useState([
        { id: 1, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
        { id: 2, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
        { id: 3, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
    ]);

    const filteredRecordings = recordings.filter(recording =>
        recording.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.endTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recording.format.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
                    <Input
                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                </div>
            </div>

            <div className="border border-gray-300 rounded-md overflow-scroll scrollbar-hide px-0 mt-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-4">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Recording Size</TableHead>
                            <TableHead>Format</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecordings.map(recording => (
                            <TableRow key={recording.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell className="cursor-pointer">{recording.startTime}</TableCell>
                                <TableCell className="cursor-pointer">{recording.endTime}</TableCell>
                                <TableCell className="cursor-pointer">{recording.recordingSize}</TableCell>
                                <TableCell className="cursor-pointer">{recording.format}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SessionRecording;
