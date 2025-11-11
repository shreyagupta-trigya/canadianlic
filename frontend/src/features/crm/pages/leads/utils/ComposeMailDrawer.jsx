import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const ComposeMailDrawer = ({ isOpen, onClose, speed = 300, backgroundColor = '#fafafa' }) => {
  const [width, setWidth] = useState('50%');
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

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
    if (isVisible && quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
          ]
        }
      });
    }
  }, [isVisible]);

  const toggleWidth = () => {
    setWidth(width === '50%' ? '100%' : '50%');
  };

  const handleClose = () => {
    if (!isTransitioning) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''} ${isVisible ? 'is-visible' : ''} p-3`}>
      <div
        className="drawer__overlay"
        style={{ transitionDuration: `${speed}ms` }}
        onClick={handleOverlayClick}
      />
      <div
        className="drawer__content"
        style={{
          width: width,
          transitionDuration: `${speed}ms`,
          backgroundColor,
        }}
      >
        <div className="drawer-inner mx-4">
          <div className="nav d-flex justify-content-between">
            <span>New Message</span>
            <span>
              <i onClick={toggleWidth} className="fa-solid fa-down-left-and-up-right-to-center"></i>
              <i className="fas fa-times" onClick={handleClose}></i>
            </span>
          </div>
          <div className="form-group">
            <div className="first p-2" style={{ borderBottom: '1px solid rgb(204, 203, 203)' }}>
              <Input type="text" placeholder="Recipients" style={{ border: 'none', outline: 'none' }} />
            </div>
            <div className="second p-2" style={{ borderBottom: '1px solid rgb(206, 204, 204)' }}>
              <Input type="text" placeholder="Subject" style={{ border: 'none', outline: 'none' }} />
            </div>
          </div>
          <div ref={quillRef} className="editable"></div>
          <div className="footer mt-4 flex justify-end">
            <Button type="button" className="btn btn-primary cursor-pointer" style={{ borderRadius: '70px', width: '100px' }}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMailDrawer;
