import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const SessionRecording = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recordings, setRecordings] = useState([
        { id: 1, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
        { id: 2, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
        { id: 3, startTime: '2024-09-30T14:00:00Z', endTime: '2024-09-30T15:00:00Z', recordingSize: '1050000000', format: 'mp4' },
    ]);

    const filteredRecordings = recordings.filter(recording =>
        recording.startTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recording.endTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recording.format.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex-1 mr-4">
                    <div className="relative inline-block">
                        <Input
                            className="w-64"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-600"></i>
                    </div>
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
