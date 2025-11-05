import React, { useState } from 'react';
import { Drawer } from '../../../components/ui/drawer';

const CallNowDrawer = ({ isOpen, onClose }) => {
  const [callFor, setCallFor] = useState('Contact');
  const [relatedTo, setRelatedTo] = useState('Account');
  const [callPurpose, setCallPurpose] = useState('-None-');
  const [callAgenda, setCallAgenda] = useState('');

  const handleSubmit = () => {
    const payload = {
      call_for: callFor,
      related_to: relatedTo,
      call_purpose: callPurpose,
      call_agenda: callAgenda,
    };
    console.log('Submitting:', payload);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} maxWidth="40rem">
      <div className="px-3 py-1">
        <i onClick={onClose} className="fa fa-arrow-right cursor-pointer"></i>
      </div>

      <div className="container mx-2 my-2">
        <h4 className="text-base font-semibold mb-2">Call Now</h4>

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

        <h4 className="text-sm md:text-base lg:text-base font-semibold text-[#323338] mt-4 mb-2">
          Purpose Of Outgoing Call
        </h4>

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

        <div className="d-flex justify-content-end gap-2 mt-7">
          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn btn-danger px-4 py-2 fw-semibold text-color-white" onClick={handleSubmit}>
            Call
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default CallNowDrawer;
