import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [
    {
      id: 'doc1',
      name: 'Dr. Sarah Khan',
      specialization: 'Cardiology',
      email: 'sarah.khan@example.com',
      active: true
    },
    {
      id: 'doc2',
      name: 'Dr. Ahmed Raza',
      specialization: 'Dermatology',
      email: 'ahmed.raza@example.com',
      active: false
    }
  ]
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
    },
    toggleDoctorStatus: (state, action) => {
      const doctor = state.doctors.find(doc => doc.id === action.payload);
      if (doctor) doctor.active = !doctor.active;
    },
    removeDoctor: (state, action) => {
      state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
    }
  }
});

export const { addDoctor, toggleDoctorStatus, removeDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
