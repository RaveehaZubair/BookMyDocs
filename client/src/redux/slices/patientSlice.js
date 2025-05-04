import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [
    {
      id: 'pat1',
      name: 'Ali Haider',
      age: 30,
      email: 'ali.haider@example.com'
    },
    {
      id: 'pat2',
      name: 'Mariam Zafar',
      age: 25,
      email: 'mariam.zafar@example.com'
    }
  ]
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    removePatient: (state, action) => {
      state.patients = state.patients.filter(pat => pat.id !== action.payload);
    }
  }
});

export const { addPatient, removePatient } = patientSlice.actions;
export default patientSlice.reducer;
