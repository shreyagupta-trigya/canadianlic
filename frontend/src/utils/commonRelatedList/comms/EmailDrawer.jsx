import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EmailDrawer = ({ isOpen, onClose, speed = 300, backgroundColor = '#fafafa' }) => {
  const [width, setWidth] = useState('50%');
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const toggleWidth = () => {
    setWidth(width === '50%' ? '100%' : '50%');
  };

  const closeComposeMailDrawer = () => {
    if (!isTransitioning) {
      onClose();
    }
  };

  const handleClickAway = (e) => {
    if (e.target.classList.contains('drawer__overlay')) {
      closeComposeMailDrawer();
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  return (
    <>
      <style>{`
        .drawer {
          visibility: hidden;
        }
        .drawer.is-visible {
          visibility: visible;
        }
        .drawer.is-open .drawer__overlay {
          opacity: 0.5;
        }
        .drawer.is-open .drawer__content {
          transform: translateX(0);
        }
        .drawer__overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 200;
          opacity: 0;
          transition-property: opacity;
          background-color: #000000;
          user-select: none;
        }
        .drawer__content {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          z-index: 9999;
          overflow: auto;
          transition-property: transform;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          box-shadow: 0 2px 6px #777;
        }
        i {
          cursor: pointer;
        }
      `}</style>
      <div className={`drawer ${isVisible ? 'is-visible' : ''} ${isOpen ? 'is-open' : ''}`} onClick={handleClickAway}>
        <div className="drawer__overlay" style={{ transitionDuration: `${speed}ms` }}></div>
        <div
          className="drawer__content"
          style={{
            maxWidth: width,
            transitionDuration: `${speed}ms`,
            backgroundColor,
          }}
        >
          <div className="flex flex-col h-full mx-4">
            <div className="flex justify-between bg-blue-100 rounded p-2 mb-2">
              <span className="pl-4">New Message</span>
              <span>
                <i onClick={toggleWidth} className="fa-solid fa-down-left-and-up-right-to-center pr-4"></i>
                <i className="fas fa-times pr-4" onClick={closeComposeMailDrawer}></i>
              </span>
            </div>
            <div>
              <div className="p-2" style={{ borderBottom: '1px solid rgb(204, 203, 203)' }}>
                <input type="text" placeholder="Recipients" className="p-1 w-full border-none outline-none" />
              </div>
              <div className="p-2" style={{ borderBottom: '1px solid rgb(206, 204, 204)' }}>
                <input type="text" placeholder="Subject" className="p-1 w-full border-none outline-none" />
              </div>
            </div>
            <div className="flex-1 p-2 overflow-auto">
              <ReactQuill theme="snow" modules={modules} />
            </div>
            <div className="flex justify-end p-2 bg-gray-50">
              <button type="button" className="bg-blue-500 text-white rounded-full px-6 py-2">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailDrawer;
