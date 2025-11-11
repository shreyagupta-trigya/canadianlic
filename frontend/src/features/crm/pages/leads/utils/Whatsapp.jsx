import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { putUrl } from "@/boot/axios"; // Assuming this is the axios config
import InfiniteScroll from 'react-infinite-scroll-component'; // Assuming you have this library
import { Textarea } from '@/components/ui/textarea';
import { FiSend } from "react-icons/fi";


const Whatsapp = ({ phoneNumber }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [roomId, setRoomId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const newRoomId = `agentPhone_${phoneNumber || "919047090872"}`;
    setRoomId(newRoomId);
    fetchMessages(1);
  }, [phoneNumber]);

  const sendMessage = async () => {
    if (!messageToSend.trim()) return;

    setLoader(true);

    try {
      const payload = { phoneNumber: phoneNumber || "919047090872", message: messageToSend };
      const response = await axios.post(`${putUrl}mailfunction/api/v1/wati/send`, payload);

      setChatHistory(prev => [...prev, {
        subject: messageToSend,
        messageStatus: response?.data?.status || "",
        dateTime: new Date().toLocaleString(),
        direction: "Outbound",
      }]);

      setMessageToSend("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
    } finally {
      setLoader(false);
    }
  };

  const fetchMessages = async (pageNumber) => {
    try {
      setLoader(true);

      const payload = { phoneNumber: phoneNumber || "919047090872", page: pageNumber };
      const response = await axios.post(`${putUrl}mailfunction/api/v1/wati/history`, payload);
      const newMessages = response?.data?.messages || [];

      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setChatHistory(prev => [...newMessages.reverse(), ...prev]);
      }

      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoader(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      fetchMessages(page + 1);
    }
  };

  return (
    <div className="w-100">
      <div className="chat">
        <div className="chat-history" style={{ minHeight: "62vh" }} ref={scrollableDivRef} id="scrollableDiv">
          <InfiniteScroll
            dataLength={chatHistory.length}
            next={loadMoreMessages}
            hasMore={hasMore}
            // loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <ul className="list-unstyled">
              {chatHistory.map((messageObj, index) => (
                <li key={index} className="clearfix">
                  <div className="message">
                    <div className="message-body">
                      <p>{messageObj.subject}</p>
                      <small>{messageObj.dateTime}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
        <div className="chat-message position-sticky bottom-0   ">
          <div className='flex w-250'>
            
          <Textarea
          
            placeholder="Type your message"
            rows="4"
            className="form-control"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <div className=" ms-3     " onClick={sendMessage}>
           <FiSend size={45} className='mt-1 border h-15 w-18 p-2 bg-blue-500 rounded-full' />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
