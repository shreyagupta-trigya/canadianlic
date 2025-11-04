import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { putUrl } from "@/boot/axios"; // Assuming this is the axios config
import InfiniteScroll from 'react-infinite-scroll-component'; // Assuming you have this library

const SMS = ({ phoneNumber }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [roomId, setRoomId] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const newRoomId = `agentPhone_${phoneNumber}`;
    setRoomId(newRoomId);
    fetchMessages(1);
  }, [phoneNumber]);

  const sendMessage = async () => {
    if (!messageToSend.trim()) return;

    setLoader(true);

    try {
      const payload = {
        phoneNumber,
        message: messageToSend,
      };

      const response = await axios.post(`${putUrl}mailfunction/api/v1/sms/send`, payload);
      console.log("Message sent successfully:", response.data);

      setChatHistory(prev => [...prev, {
        subject: messageToSend,
        messageStatus: response?.data?.status || "",
        dateTime: new Date().toLocaleString(),
        direction: "Outbound",
      }]);

      setMessageToSend("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error.response ? error.response.data : error.message);
    } finally {
      setLoader(false);
    }
  };

  const fetchMessages = async (pageNumber) => {
    try {
      setLoader(true);

      const response = await fetch(`${putUrl}mailfunction/api/v1/sms/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          page: pageNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();
      const newMessages = data?.messages || [];

      if (newMessages.length === 0) {
        setHasMore(false);
      } else {
        setChatHistory(prev => [...newMessages, ...prev].reverse());
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
      const isAtBottom = scrollableDivRef.current.scrollHeight - scrollableDivRef.current.scrollTop === scrollableDivRef.current.clientHeight;
      if (isAtBottom) {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
      }
    }
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
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
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <ul className="list-unstyled">
              {chatHistory.map((message, index) => (
                <li key={index} className="clearfix">
                  <div className="message">
                    <div className="message-body">
                      <p>{message.subject}</p>
                      <small>{message.dateTime}</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
        <div className="chat-message position-sticky bottom-0 w-100">
          <textarea
            name="message-to-send"
            id="message-to-send"
            placeholder="Type your message"
            rows="3"
            className="form-control"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <Button className="send-button ms-3" onClick={sendMessage}>
            <i className="fa fa-paper-plane fs-4"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SMS;
