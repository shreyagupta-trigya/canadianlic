import React, { useState } from 'react';
import { Drawer } from '../../../components/ui/drawer';

const ScheduleCallDrawer = ({ isOpen, onClose }) => {
  const [callFor, setCallFor] = useState('Contact');
  const [relatedTo, setRelatedTo] = useState('Account');
  const [callType] = useState('Outbound');
  const [outgoingCallStatus] = useState('Scheduled');
  const [callStartDate, setCallStartDate] = useState('2025-06-09');
  const [callStartTime, setCallStartTime] = useState('13:00');
  const [callOwner, setCallOwner] = useState('Peter Antony Joseph');
  const [subject, setSubject] = useState('Call scheduled with -');
  const [callPurpose, setCallPurpose] = useState('-None-');
  const [callAgenda, setCallAgenda] = useState('');
  const [isStartTimeInvalid, setIsStartTimeInvalid] = useState(false);

  const handleSubmit = () => {
    if (!callStartDate || !callStartTime) {
      setIsStartTimeInvalid(true);
      return;
    }
    setIsStartTimeInvalid(false);
    const startDateTime = `${callStartDate} ${callStartTime}`;
    const payload = { start_time: startDateTime };
    console.log('Submitting:', payload);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} maxWidth="40rem">
      <div className="px-3 py-1">
        <i onClick={onClose} className="fa fa-arrow-right cursor-pointer"></i>
      </div>

      <div className="container mx-2 my-2">
        <h4 className="text-base font-semibold mb-2">Schedule a call</h4>

        <h2 className="text-lg md:text-base lg:text-base font-semibold text-[#323338] mt-4 mb-2">
          Call Information
        </h2>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Call For</label>
          <div className="flex gap-2">
            <select
              className="form-select border border-gray-300 rounded w-1/3 text-sm"
              value={callFor}
              onChange={(e) => setCallFor(e.target.value)}
            >
              <option>Contact</option>
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Related To</label>
          <div className="flex gap-2">
            <select
              className="form-select border border-gray-300 rounded w-1/3 text-sm"
              value={relatedTo}
              onChange={(e) => setRelatedTo(e.target.value)}
            >
              <option>Account</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Call Type</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control border border-danger pe-5"
              value={callType}
              readOnly
            />
            <i className="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Outgoing Call Status</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control pe-5"
              value={outgoingCallStatus}
              readOnly
            />
            <i className="fas fa-lock position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Call Start Time</label>
          <div className="d-flex">
            <input
              type="date"
              className={`form-control border-start border-2 ${isStartTimeInvalid ? 'border-danger' : ''}`}
              value={callStartDate}
              onChange={(e) => setCallStartDate(e.target.value)}
            />
            <input
              type="time"
              className="form-control border-start-0"
              value={callStartTime}
              onChange={(e) => setCallStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Call Owner</label>
          <div className="position-relative">
            <select
              className="form-select pe-5"
              value={callOwner}
              onChange={(e) => setCallOwner(e.target.value)}
            >
              <option>Peter Antony Joseph</option>
              <option>Antony Joseph</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            className="form-control border border-gray-300 rounded w-full text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <h3 className="text-sm font-semibold mt-4 mb-3">
          Purpose Of Outgoing Call
        </h3>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Call Purpose</label>
          <select
            className="form-select border border-gray-300 rounded w-full text-sm"
            value={callPurpose}
            onChange={(e) => setCallPurpose(e.target.value)}
          >
            <option>-None-</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Call Agenda</label>
          <input
            type="text"
            className="form-control border border-gray-300 rounded w-full text-sm"
            value={callAgenda}
            onChange={(e) => setCallAgenda(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn btn-danger px-4 py-2 fw-semibold text-color-white" onClick={handleSubmit}>
            Schedule
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default ScheduleCallDrawer;
