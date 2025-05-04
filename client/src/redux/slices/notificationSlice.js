import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const sendReminder = createAsyncThunk('notifications/send', async () => {
  const res = await axios.post('/api/admin/send-reminders')
  return res.data
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { status: null },
  extraReducers: builder => {
    builder
      .addCase(sendReminder.fulfilled, (state, action) => {
        state.status = 'Reminders sent'
      })
  }
})

export default notificationSlice.reducer
