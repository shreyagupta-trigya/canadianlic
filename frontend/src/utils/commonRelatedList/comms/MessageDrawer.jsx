import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useRef } from 'react';
import { 
  BsPerson, 
  BsPersonCircle, 
  BsArrowRight,
  BsArrowLeft,
  BsFileArrowDown,
  BsTrash,
  BsEnvelope,
  BsThreeDotsVertical,
  BsPaperclip,
  BsStar,
  BsEmojiSmile,
  BsReply
} from 'react-icons/bs';
import { PiLessThan } from "react-icons/pi";
import { PiGreaterThan } from "react-icons/pi";

const MessageDrawer = ({
  isOpen,
  onClose,
  maxWidth = '70rem',
  speed = 300,
  backgroundColor = '#fafafa',
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsTransitioning(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
    } else {
      document.body.style.overflow = null;
      setTimeout(() => setIsVisible(false), speed);
    }
    setTimeout(() => setIsTransitioning(false), speed);
  }, [isOpen, speed]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const closeDrawer = () => {
    if (!isTransitioning) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'is-open' : ''} ${isVisible ? 'is-visible' : ''}`}>
      {/* Overlay */}
     
      
      {/* Drawer Content */}
      <div
        ref={contentRef}
        className="absolute right-0 p-3 top-0 h-full w-full max-w-[70rem]  overflow-auto transform transition-transform shadow-xl"
        style={{
          maxWidth,
          transitionDuration: `${speed}ms`,
          backgroundColor,
        }}
      >
        {/* Close button */}
        <div className="px-3 py-1">
          <BsArrowRight onClick={closeDrawer} className="cursor-pointer" />
        </div>

        {/* Header */}
        <div className="flex justify-between p-2">
          <div className="flex gap-2">
            <BsArrowLeft className="cursor-pointer" />
            <BsFileArrowDown className="cursor-pointer" />
            {/* <RiStampFill className="cursor-pointer" /> */}
            <BsTrash className="cursor-pointer" />
            <BsEnvelope className="cursor-pointer" />
            <BsEnvelope className="cursor-pointer" />
            <BsThreeDotsVertical className="cursor-pointer" />
          </div>
          <div className="flex justify-end items-center gap-2">
            <span>2 of 100</span>
            <PiLessThan />
            <PiGreaterThan />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-normal pl-14">
          [1266-CAD-Canadian L.I.C.: Catalyst] [B17U-T448 Export Functionality in Advisor Credentials Form]
        </h1>

        {/* Sender Info */}
        <div className="flex justify-between px-2">
          <div className="flex items-center">
            <div className="flex items-center justify-end">
              <span className="p-1 flex gap-2 items-center">
                <BsPersonCircle size={25}/>
                <b>Trigya innovation</b>
              </span>
              <span className="p-1">
                noreply@infomeeting.com
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center">
              <BsPaperclip className="p-2 cursor-pointer" />
              <span className="p-2 text-sm">
                Aug 26,2024 ,9:07AM (4days ago)
              </span>
            </div>
            <div className="flex items-center">
              <BsStar className="p-2 cursor-pointer" />
              <BsEmojiSmile className="p-2 opacity-25 cursor-pointer" />
              <BsReply className="p-2 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Divider Text */}
        <p className="text-center text-gray-500 my-4">
          ------ --- To add notes to this task Reply ABOVE THIS LINE --- ------
        </p>

        {/* Message Content */}
        <div>
          <div className="border border-gray-300 ml-5 bg-blue-50 bg-opacity-45">
            {/* Message Header */}
            <div className="bg-blue-100 h-16">
              <p className="p-4 ml-16 text-lg">
                <b>Trigya Innovation</b>
              </p>
            </div>

            {/* Message Body */}
            <p className="pr-4 pl-72">
              <b>B17U-T448 Export Functionality in Advisor Credentials Form</b>
            </p>
            <p className="pr-4 pl-72">
              in <u className="text-blue-500">1266-CAD-Canadian L.I.C.: Catalyst</u>
            </p>

            {/* Table */}
            <table className="p-3 h-72 mx-auto bg-white ml-16 w-[700px]">
              <tbody className="p-2 w-56">
                <tr>
                  <td colSpan="3" className="text-left">
                    <b>Peter Antony joseph </b> has updated the Status of the following task.
                  </td>
                </tr>

                <tr className="text-left">
                  <td>Task List</td>
                  <td className="px-2">:</td>
                  <td>UAT 1</td>
                </tr>

                <tr className="text-left">
                  <td>Milestone</td>
                  <td className="px-2">:</td>
                  <td>None</td>
                </tr>

                <tr className="text-left">
                  <td>Start Date</td>
                  <td className="px-2">:</td>
                  <td>-</td>
                </tr>

                <tr className="text-left">
                  <td>End Date</td>
                  <td className="px-2">:</td>
                  <td>-</td>
                </tr>

                <tr className="text-left">
                  <td>Owner</td>
                  <td className="px-2">:</td>
                  <td>Sukanya Gupta, Bipasha Bareja</td>
                </tr>

                <tr className="text-left">
                  <td>Completion Time</td>
                  <td className="px-2">:</td>
                  <td>30-08-2024 04:20 PM</td>
                </tr>
              </tbody>
            </table>

            {/* View Task Button */}
            <Button
              type="button"
              className="bg-blue-500 mb-2 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded ml-16 mt-6 transition-colors"
            >
              View Task
            </Button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default MessageDrawer;