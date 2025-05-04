import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './slices/doctorSlice'
import patientReducer from './slices/patientSlice'
import appointmentReducer from './slices/appointmentSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    patient: patientReducer,
    appointment: appointmentReducer,
    notification: notificationReducer,
  },
})

export default store
