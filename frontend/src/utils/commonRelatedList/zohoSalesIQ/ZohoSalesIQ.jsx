import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';

const ZohoSalesIQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    { id: 101, visitorName: 'Rajendra singh', email: 'rajendra@gmail.com', phone: '9340897876' },
    { id: 102, visitorName: 'Ramkaran singh', email: 'ramkaran@gmail.com', phone: '9340897876' },
    { id: 103, visitorName: 'Raj singh', email: 'raj@gmail.com', phone: '9340897876' },
  ]);

  const filteredData = data.filter(item =>
    item.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phone.includes(searchTerm)
  );

  return (
    <div className="p-4">
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
        </div>
      </div>
      <div className="border border-gray-300 rounded overflow-auto custom-scroll px-0 mt-3">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">Lead id</TableHead>
              <TableHead className="text-gray-700 font-semibold">Visitor Name</TableHead>
              <TableHead className="text-gray-700 font-semibold">Email</TableHead>
              <TableHead className="text-gray-700 font-semibold">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.visitorName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ZohoSalesIQ;
