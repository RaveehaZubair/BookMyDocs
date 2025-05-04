import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
      id: 'app1',
      patientId: 'pat1',
      doctorId: 'doc1',
      date: '2025-05-01',
      time: '10:00 AM',
      status: 'Scheduled'
    },
    {
      id: 'app2',
      patientId: 'pat2',
      doctorId: 'doc2',
      date: '2025-05-02',
      time: '02:00 PM',
      status: 'Completed'
    }
  ]
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.appointments.find(app => app.id === id);
      if (appointment) appointment.status = status;
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    }
  }
});

export const { addAppointment, updateStatus, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
