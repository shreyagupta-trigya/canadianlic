import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ComposeMailDrawer from './ComposeMailDrawer';
import MessageDrawer from './MessageDrawer';
import { Mail, MoreVertical, Search, Trash2 } from 'lucide-react';
import EmailDrawer from './EmailDrawer';

const Email = () => {
  const [isComposeMailDrawerOpen, setIsComposeMailDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messages] = useState([
    {
      name: "Indeed",
      email: "indeed@example.com",
      subject: "Job Opportunity",
      message: "Don't let this chance go 'Houdini Book your spot NOW. Watch her set the stage on fire at",
      time: "6:47 PM",
    },
    {
      name: "Gautam",
      email: "gautam@example.com",
      subject: "Job Selection",
      message: "Get Jobs tailored your prepaired . We are thrilled to announce that you are selected...",
      time: "5:57 PM",
    },
    {
      name: "Glassdoor",
      email: "glassdoor@example.com",
      subject: "Bill Payment Due",
      message: "Hyy Rakesh, Your prepaid recharge bill pay payment is due today...",
      time: "5:57 PM",
    },
    {
      name: "Team Scaler",
      email: "teamscaler@example.com",
      subject: "Enrollment Update",
      message: "Dear Rakesh, 200k enrolled since you've Now would be the latest best time to....",
      time: "4:07 PM",
    },
    {
      name: "HDFC Bank",
      email: "hdfcbank@example.com",
      subject: "UPI Transaction",
      message: "You have done a UPI txn. Check details! This is a longer message to demonstrate text overflow.",
      time: "10:15 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
    {
      name: "Paytm",
      email: "paytm@example.com",
      subject: "Upgraded Offer",
      message: "Upgraded Offer! Especially for you. Click here to see more details and enjoy the benefits.",
      time: "11:20 AM",
    },
  ]);

  const toggleComposeMailDrawer = () => {
    setIsComposeMailDrawerOpen(!isComposeMailDrawerOpen);
  };

  const closeComposeMailDrawer = () => {
    setIsComposeMailDrawerOpen(false);
  };

  const toggleDrawer = (index) => {
    setActiveMessage(messages[index]);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setActiveMessage(null);
  };

  return (
    <div className="p-4">
      {/* Search and Send Email Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex-1 ">
          <div className="relative w-70">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10"
            
            />
          </div>
        </div>
        <Button onClick={toggleComposeMailDrawer} className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer md:w-auto">
          Send Email
        </Button>
      </div>

      {/* Messages List */}
      <div className="overflow-x-auto max-h-[calc(80vh-100px)] overflow-y-scroll">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border">
              <th className="w-1/12 p-2 text-left"><Checkbox /></th>
              <th className="w-3/12 p-2 text-left font-semibold">Sender</th>
              <th className="w-6/12 p-2 text-left font-semibold">Message</th>
              <th className="w-2/12 p-2 text-left font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index} className="border p-2 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => toggleDrawer(index)}>
                <td className="p-2"><Checkbox /></td>
                <td className="p-2 font-semibold">{msg.name}</td>
                <td className="p-2 truncate max-w-0">{msg.message}</td>
                <td className="p-2 relative">
                  <span className="group-hover:hidden">{msg.time}</span>
                  <div className="hidden group-hover:flex absolute right-2 top-1/2 transform -translate-y-1/2 space-x-1 bg-white p-1 gap-3 rounded shadow">
                    <Button variant="ghost" size="sm" className="p-1">
                      {/* <i className="fas fa-trash-alt text-gray-600 hover:text-red-600"></i> */}
                      <Trash2/>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      {/* <i className="fas fa-envelope text-gray-600 hover:text-blue-600"></i> */}
                      <Mail/>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      {/* <i className="fas fa-ellipsis-v text-gray-600 hover:text-gray-800"></i> */}
                      <MoreVertical/>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawers */}
      <MessageDrawer isOpen={isDrawerOpen} activeMessage={activeMessage} onClose={closeDrawer} />
      <ComposeMailDrawer isOpen={isComposeMailDrawerOpen} onClose={closeComposeMailDrawer} />
      <EmailDrawer />
    </div>
  );
};
          
export default Email;
