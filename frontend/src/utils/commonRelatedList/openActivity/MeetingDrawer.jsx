import React, { useState } from 'react';
import { Drawer } from '../../../components/ui/drawer';

const MeetingDrawer = ({ isOpen, onClose }) => {
  const [bookingSummary, setBookingSummary] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [reRunRoundRobin, setReRunRoundRobin] = useState(false);
  const [roundRobinProcessed, setRoundRobinProcessed] = useState(false);
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState('15 Minutes before');
  const [customReminder, setCustomReminder] = useState('None');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Meeting submitted');
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} maxWidth="37rem">
      <div className="px-3 py-1">
        <i onClick={onClose} className="fa fa-arrow-right cursor-pointer"></i>
      </div>

      <div className="container mx-2">
        <h4>Add Meeting</h4>
        <div className="mb-2">
          <label htmlFor="bookingSummary" className="form-label">Booking Summary</label>
          <input
            type="text"
            className="form-control"
            id="bookingSummary"
            value={bookingSummary}
            onChange={(e) => setBookingSummary(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="meetingDate" className="form-label">Meeting Date</label>
          <input
            type="date"
            className="form-control"
            id="meetingDate"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
        </div>
        <div className="containerr">
          <div className="row mt-2">
            <div className="col">Re-run round robin</div>
            <div className="col">
              <input
                className="form-check-input"
                type="checkbox"
                checked={reRunRoundRobin}
                onChange={(e) => setReRunRoundRobin(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="containerr mb-2">
          <div className="row mb-2 mt-2">
            <div className="col">Round Robin Processed</div>
            <div className="col">
              <input
                className="form-check-input"
                type="checkbox"
                checked={roundRobinProcessed}
                onChange={(e) => setRoundRobinProcessed(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="container">
          <div className="row">
            <div className="col">Reminder</div>
            <div className="col">
              <select
                className="form-select"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              >
                <option value="15 Minutes before">15 Minutes before</option>
                <option value="5 Minutes before">5 Minutes before</option>
                <option value="10 Minutes before">10 Minutes before</option>
                <option value="30 Minutes before">30 Minutes before</option>
                <option value="1 day before">1 day before</option>
                <option value="2 hours before">2 hours before</option>
                <option value="2 day before">2 day before</option>
                <option value="1 day before">1 day before</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col mt-3">
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {customReminder}
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('15 Minutes before')}>15 Minutes before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('5 Minutes before')}>5 Minutes before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('10 Minutes before')}>10 Minutes before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('30 Minutes before')}>30 Minutes before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('1 day before')}>1 day before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('1 hour before')}>1 hour before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('2 day before')}>2 day before</a></li>
                  <li><a className="dropdown-item" onClick={() => setCustomReminder('2 hours before')}>2 hours before</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center d-flex justify-space-around">
          <div className="col">
            <button className="btn btn-info m-2" onClick={onClose}>Cancel</button>
            <button className="btn btn-danger m-2" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MeetingDrawer;
