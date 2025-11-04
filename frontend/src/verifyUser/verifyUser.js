// This code has been passed to every page to verify if user from backend

import { putUrl } from "../boot/axios";
export const verifyUser = async () =>{

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`${putUrl}usersFunction/verify/verifyUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail: userEmail })
      });
      const data = await response.json();
      if (data.success) {
          return true
      } else {
        return true
      }
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  }
