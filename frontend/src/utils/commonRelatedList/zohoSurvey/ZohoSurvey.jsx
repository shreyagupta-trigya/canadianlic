import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';
import ZohoSurveyDrawer from './ZohoSurveyDrawer';

const ZohoSurvey = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState([
    { id: 101, question: 'Which feature do you use the most?', submittedTo: 'Harman Singh', responseTime: '2 min' },
    { id: 102, question: 'Rate your satisfaction from 1 to 5.', submittedTo: 'Harman Singh', responseTime: '10 min' },
    { id: 103, question: 'Do you use our service frequently?', submittedTo: 'Harman Singh', responseTime: '4 min' },
  ]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const filteredData = data.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.submittedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ZohoSurveyDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <div className="row">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full lg:w-2/6 md:w-2/6 sm:w-full">
            <Input
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
<<<<<<< HEAD
          </div>
          <div className="button">
            <Button variant="primary" onClick={toggleDrawer} className="px-2 py-1 ">
=======
          </div>
          <div className="button">
            <Button variant="primary" onClick={toggleDrawer} className="px-2 py-1 ">
=======
        <div className="flex justify-between items-center p-3">
          <div className="search-container-div col-lg-10 col-md-10 col-sm-12">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="button">
            <Button onClick={toggleDrawer} className="px-2 py-1  bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white">
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
>>>>>>> 6ec2f89292f9d12496c5b4fa2457c025ac55e846
              Send Survey
            </Button>
          </div>
        </div>
        <div className="border rounded overflow-scroll custom-scroll px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Checkbox /></TableHead>
                <TableHead className="text-gray-700 font-semibold">Survey Id</TableHead>
                <TableHead className="text-gray-700 font-semibold">Question</TableHead>
                <TableHead className="text-gray-700 font-semibold">Submitted to</TableHead>
                <TableHead className="text-gray-700 font-semibold">Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.submittedTo}</TableCell>
                  <TableCell>{item.responseTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ZohoSurvey;
