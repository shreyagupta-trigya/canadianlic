import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Email = () => {
  const [isComposeMailDrawerOpen, setIsComposeMailDrawerOpen] = useState(false);
  const [messages] = useState([
    {
      name: "Indeed",
      message: "Don't let this chance go 'Houdini Book your spot NOW. Watch her set the stage on fire at",
      time: "6:47 PM",
    },
    {
      name: "Gautam",
      message: "Get Jobs tailored your prepaired . We are thrilled to announce that you are selected...",
      time: "5:57 PM",
    },
    {
      name: "Glassdoor",
      message: "Hyy Rakesh, Your prepaid recharge bill pay payment is due today...",
      time: "5:57 PM",
    },
    {
      name: "Team Scaler",
      message: "Dear Rakesh, 200k enrolled since you've Now would be the latest best time to....",
      time: "4:07 PM",
    },
    {
      name: "HDFC Bank",
      message: "You have done a UPI txn. Check details! This is a longer message to demonstrate text overflow.",
      time: "10:15 AM",
    },
    {
      name: "Paytm",
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

  return (
    <div>
      <div className="row mt-3">
        <div className="col-8">
          <div className="search-container">
            <input className="search-input" type="search" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="col-4 text-end">
          <Button onClick={toggleComposeMailDrawer} className="add-btn btn py-1 mb-0 text-truncate">
            Send Email
          </Button>
        </div>
      </div>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="ps-0 pb-1 col1"><input type="checkbox" /></th>
              <th scope="col" className="ps-0 col3 align-middle"><b>Sender</b></th>
              <th scope="col" className="ps-0 col4 align-middle"><b>Message</b></th>
              <th scope="col" className="ps-0 col5 align-middle"><b>Time</b></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td className="col1"><input type="checkbox" /></td>
                <td className="col3 align-middle"><b>{msg.name}</b></td>
                <td className="col4 align-middle text-truncate">{msg.message}</td>
                <td className="col5 align-middle">
                  <span className="email-time"><b>{msg.time}</b></span>
                  <span className="hover-icons">
                    <button className="icon-button"><i className="fas fa-trash-alt"></i></button>
                    <button className="icon-button"><i className="fas fa-envelope"></i></button>
                    <button className="icon-button"><i className="fas fa-ellipsis-v"></i></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Email;
