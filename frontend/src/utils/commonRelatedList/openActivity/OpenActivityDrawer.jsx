import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Drawer } from '../../../components/ui/drawer';

const OpenActivityDrawer = ({ isOpen, onClose, addTask, updateData, updateTask, selectedButton }) => {
  const [task, setTask] = useState({
    subject: '',
    status: '',
    dueDate: '',
    taskPriority: '',
    owner: '',
    reminder: '',
    taskRepeat: '',
    refrenceModule: '',
    description: '',
  });
  const [users, setUsers] = useState([]);
  const [isReminderChecked, setIsReminderChecked] = useState(false);
  const [isReminderChecked2, setIsReminderChecked2] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isPopupOpen3, setIsPopupOpen3] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (updateData) {
      setTask({
        subject: updateData.subject || '',
        status: updateData.status || '',
        dueDate: updateData.dueDate || '',
        taskPriority: updateData.taskPriority || '',
        owner: updateData.owner || '',
        refrenceModule: updateData.refrenceModule || '',
        description: updateData.description || '',
      });
    }
  }, [updateData]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}lead/api/v1/get-users`);
      setUsers(response.data?.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await addTask(task);
      if (res?.data?.success) {
        setTask({
          subject: '',
          status: '',
          dueDate: '',
          taskPriority: '',
          owner: '',
          reminder: '',
          taskRepeat: '',
          refrenceModule: '',
          description: '',
        });
        onClose();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const res = await updateTask({ ...task, id: updateData.id });
      if (res?.data?.success) {
        setTask({
          subject: '',
          status: '',
          dueDate: '',
          taskPriority: '',
          owner: '',
          reminder: '',
          taskRepeat: '',
          refrenceModule: '',
          description: '',
        });
        onClose();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isReminderChecked) setIsReminderChecked(true);
    else setIsReminderChecked(false);
  };

  const openPopup2 = () => {
    setIsPopupOpen2(true);
  };

  const closePopup2 = () => {
    setIsPopupOpen2(false);
  };

  const openPopup3 = () => {
    setIsPopupOpen3(!isPopupOpen3);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} maxWidth="37rem">
      <div className="px-3 py-1">
        <i onClick={onClose} className="fa fa-arrow-right cursor-pointer"></i>
      </div>

      <div className="outer">
        <h4 className="mx-3">{selectedButton === 'Update' ? 'Update Task' : 'Add Task'}</h4>
        <div className="mx-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={task.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mx-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="outer mb-3 mx-3">
          <label className="mb-3" style={{ color: 'black' }}>Priority</label>
          <div className="mb-3">
            <select
              className="form-select form-select-sm"
              name="taskPriority"
              value={task.taskPriority}
              onChange={handleInputChange}
              style={{ height: '35px !important' }}
            >
              <option value="">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="outer mb-3 mx-3">
          <label className="mb-3" style={{ color: 'black' }}>Owner</label>
          <div className="input-group mb-3">
            <select
              name="owner"
              value={task.owner}
              onChange={handleInputChange}
              className="form-control"
            >
              {users.map((owner) => (
                <option key={owner.ROWID} value={owner.ROWID}>
                  {owner.firstName} {owner.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mx-3 mb-3">
          <div className="col">Reminder</div>
          <div className="col">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isReminderChecked}
              onChange={() => setIsReminderChecked(!isReminderChecked)}
            />
          </div>
        </div>
        {isPopupOpen2 && (
          <div className="card" style={{ position: 'absolute', top: '53%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <i className="fa-solid fa-xmark" style={{ cursor: 'pointer', marginRight: '20px', transform: 'translate(-50%, -50%)', zIndex: 1000, position: 'absolute', top: '10%', left: '95%' }} onClick={closePopup2}></i>
            <div className="reminder mb-3">
              <table className="table mt-4 mx-3">
                <tbody>
                  <tr>
                    <td scope="row">
                      <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example" style={{ color: 'black' }}>
                        <option selected>On</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-select" aria-label="Default select example" style={{ color: 'black' }}>
                        <option selected>Day</option>
                        <option value="1">Month</option>
                        <option value="2">Year</option>
                      </select>
                    </td>
                    <td style={{ color: 'black', paddingTop: '13px' }} className="mt-2">of due date</td>
                    <td>
                      <input type="time" className="time" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mb-3 mx-3">
                <label htmlFor="alert" className="form-label">Alert</label>
                <input type="text" className="form-control" id="alert" />
              </div>
              <div className="mb-3 mx-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
          </div>
        )}

        <div className="row mx-3 mb-3">
          <div className="col">Repeat</div>
          <div className="col">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isReminderChecked2}
              onChange={() => setIsReminderChecked2(!isReminderChecked2)}
            />
          </div>
        </div>
        {isPopupOpen && (
          <div className="card" style={{ position: 'absolute', top: '53%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <i className="fa-solid fa-xmark" style={{ cursor: 'pointer', marginRight: '20px', transform: 'translate(-50%, -50%)', zIndex: 1000, position: 'absolute', top: '10%', left: '95%' }} onClick={() => setIsPopupOpen(false)}></i>
            <table className="table mx-3 mb-3" style={{ border: '1px solid white' }}>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>Daily</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>
                    <div className="d-flex">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      Except weekends and holidays
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Ends</td>
                  <td>
                    <div className="d-flex">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                      Never
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div className="d-flex">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck3" />
                      After 1 Time(s)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div className="d-flex">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                      On &nbsp;&nbsp;
                      <input type="date" className="no-border" style={{ color: 'black', marginTop: '-5px' }} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button className="btn-ShowMore mx-3" onClick={openPopup3}>Show More</button>

        {isPopupOpen3 && (
          <div className="showMore mx-3">
            <label className="mt-2">Related To</label>
            <select
              className="form-select"
              name="refrenceModule"
              value={task.refrenceModule}
              onChange={handleInputChange}
            >
              <option value="">Contact Name</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label className="mt-2">Status</label>
            <select
              className="form-select"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            >
              <option value="">Not Started</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Working">Working</option>
            </select>
            <label className="mt-2">Description</label>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                name="description"
                value={task.description}
                onChange={handleInputChange}
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Description</label>
            </div>
          </div>
        )}

        <div className="row text-center d-flex justify-space-around mt-5">
          <div className="col">
            <button className="btn btn-info m-2" onClick={onClose}>Cancel</button>
            <button className="btn btn-danger m-2" onClick={selectedButton === 'Update' ? handleUpdateTask : handleSubmit}>
              {selectedButton === 'Update' ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default OpenActivityDrawer;
