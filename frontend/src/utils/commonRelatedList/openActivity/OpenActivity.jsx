import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import OpenActivityDrawer from './OpenActivityDrawer';
import MeetingDrawer from './MeetingDrawer';
import ScheduleCallDrawer from './ScheduleCallDrawer';
import LogCallDrawer from './LogCallDrawer';
import CallNowDrawer from './CallNowDrawer';

const OpenActivity = ({ id }) => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isMeetingDrawerOpen, setIsMeetingDrawerOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [isCallNowDrawerOpen, setIsCallNowDrawerOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    getTaskList();
  }, []);

  const openTaskDrawer = () => setIsTaskDrawerOpen(true);
  const closeTaskDrawer = () => setIsTaskDrawerOpen(false);

  const openMeetingsDrawer = () => setIsMeetingDrawerOpen(true);
  const closeMeetingsDrawer = () => setIsMeetingDrawerOpen(false);

  const openScheduleDrawer = () => setIsScheduleDrawerOpen(true);
  const closeScheduleDrawer = () => setIsScheduleDrawerOpen(false);

  const openLogDrawer = () => setIsLogDrawerOpen(true);
  const closeLogDrawer = () => setIsLogDrawerOpen(false);

  const openCallNowDrawer = () => setIsCallNowDrawerOpen(true);
  const closeCallNowDrawer = () => setIsCallNowDrawerOpen(false);

  const switchButton = (button, id, subject, description, status, taskPriority, dueDate, refrenceModule, owner) => {
    setSelectedButton(button);
    setUpdateData({
      id,
      subject,
      description,
      status,
      taskPriority,
      dueDate,
      refrenceModule,
      owner,
    });
  };

  const addTask = async (task) => {
    try {
      const data = {
        subject: task.subject,
        status: task.status,
        owner: task.owner,
        dueDate: task.dueDate,
        taskPriority: task.taskPriority,
        refrenceModule: task.refrenceModule,
        description: task.description,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/create-task`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.success) {
        toast.success('Task Added Successfully!');
        getTaskList();
      }
      return response;
    } catch (error) {
      toast.error('An error occurred while creating the task.');
      console.log('Error', error);
    }
  };

  const getTaskList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/get-task`);
      if (response.data.success) {
        setIsLoading(false);
        const taskData = response.data.taskResp.map((item) => ({
          subject: item.subject,
          status: item.status,
          taskId: item.rowId,
          dueDate: item.dueDate,
          taskPriority: item.taskPriority,
          owner: item.owner,
          refrenceModule: item.refrenceModule,
          description: item.description,
        }));
        setTaskList(taskData);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error in getting task data', error);
    }
  };

  const updateTask = async (data) => {
    const task = {
      subject: data.subject,
      status: data.status,
      id: data.id,
      dueDate: data.dueDate,
      taskPriority: data.taskPriority,
      owner: data.owner,
      refrenceModule: data.refrenceModule,
      description: data.description,
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/update-task/${data.id}`, task);
      if (response.data.success) {
        toast.success('Task Updated Successfully!');
        getTaskList();
      }
      return response;
    } catch (error) {
      console.log('error in updating task', error);
      toast.error('An error occurred while updating the task.');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}canadianlicapi/task/api/v2/delete-task/${id}`);
        setIsLoading(false);
        if (response.data.success) {
          toast.success('Task Deleted Successfully!');
        }
        setTaskList(taskList.filter((item) => item.taskId !== id));
        return response;
      } catch (error) {
        setIsLoading(false);
        toast.error('An error occurred while deleting the task.');
        console.log('Error in deleting task', error);
      }
    }
  };

  return (
    <>
      <OpenActivityDrawer
        updateData={updateData}
        updateTask={updateTask}
        isOpen={isTaskDrawerOpen}
        onClose={closeTaskDrawer}
        addTask={addTask}
        selectedButton={selectedButton}
      />
      <MeetingDrawer
        isOpen={isMeetingDrawerOpen}
        onClose={closeMeetingsDrawer}
      />
      <ScheduleCallDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={closeScheduleDrawer}
      />
      <LogCallDrawer
        isOpen={isLogDrawerOpen}
        onClose={closeLogDrawer}
      />
      <CallNowDrawer
        isOpen={isCallNowDrawerOpen}
        onClose={closeCallNowDrawer}
      />

      <div>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <div className="search-container-div col-lg-10 col-md-10 col-sm-12">
              <div className="search-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <i className="fas fa-search" aria-hidden="true"></i>
              </div>
            </div>

            <div className="dropdown" style={{ marginRight: '7%' }}>
              <button
                className="btn companagion-button px-2 py-1 mt-3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownMenuButton1"
              >
                Add New
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      openTaskDrawer();
                      setSelectedButton('add');
                    }}
                  >
                    Task
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={openMeetingsDrawer}>
                    Meeting
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider light-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={openScheduleDrawer}>
                    Schedule a call
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={openLogDrawer}>
                    Log a call
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={openCallNowDrawer}>
                    Call now
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border px-0">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>
                    <input
                      className="form-check-input mt-0 compagion-checkbox"
                      type="checkbox"
                      value=""
                    />
                  </td>
                  <td></td>
                  <td className="color fw-semibold">Task Name</td>
                  <td className="color fw-semibold">Status</td>
                </tr>
              </thead>
              <tbody>
                {taskList.map((item) => (
                  <tr key={item.taskId}>
                    <td>
                      <input
                        className="form-check-input mt-0 compagion-checkbox"
                        type="checkbox"
                        value=""
                      />
                    </td>
                    <td>
                      <i
                        className="fa fa-pencil p-2 text-md blue-color cursor-pointer"
                        onClick={() =>
                          switchButton(
                            'Update',
                            item.taskId,
                            item.subject,
                            item.description,
                            item.status,
                            item.taskPriority,
                            item.dueDate,
                            item.refrenceModule,
                            item.owner
                          ) && openTaskDrawer()
                        }
                      ></i>
                      <i
                        className="fa fa-trash p-2 text-md blue-color cursor-pointer"
                        onClick={() => deleteTask(item.taskId)}
                      ></i>
                    </td>
                    <td>{item.subject}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default OpenActivity;
