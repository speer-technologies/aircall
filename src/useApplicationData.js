import { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  function setDay(day) {

    // Deconstructs state object and Any keys declared after will overwrite existing keys.
    setState({ ...state, day });

  }

  const updateSpots = function (state, appointments, id) {
    //copy array into new container;
    const newDays = [...state.days];

    // Find the days
    const index = state.days.findIndex(d => d.name = state.day);
    const dayObj= newDays[index];

    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id]; // use the new one
      if (!appointment.interview) {
        //gives you the current number of null spots 
        spots++;
      }
    }

    const newDay = {...dayObj, spots};

    //replacing the index of the days array with the new day
    newDays[index]=newDay;
   
  // return days array
  return newDays;
}

// retrieve data and update the state
useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ])
    .then((response) => {
      //returns 3 datasates in an array
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));
    })
    .catch((error) => {
      console.log(error);
    });

}, []);


const bookInterview = (id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };


  let newDaysArray = [];

  return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() => {
      newDaysArray = updateSpots(state, appointments, id);
      setState({
        ...state,
        days: newDaysArray,
        appointments
      });
    });
};


const cancelInterview = id => {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  let newDaysArray = [];

  return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      newDaysArray = updateSpots(state, appointments, id);
      setState({
        ...state,
        days: newDaysArray,
        appointments
      });
    });
};


return { state, setDay, bookInterview, cancelInterview }

}


