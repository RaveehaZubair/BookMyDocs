import cron from 'node-cron';
import Appointment from '../models/Appointment.js';
import { sendReminderEmail } from './emailSender.js';

// Run every hour
cron.schedule('0 * * * *', async () => {
  console.log('[Cron] Checking for upcoming appointments...');

  const now = new Date();
  const upcoming = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead

  try {
    const appointments = await Appointment.find({
      date: { $lte: upcoming, $gte: now },
      reminderSent: false,
    });

    for (const appt of appointments) {
      const message = `Reminder: You have an appointment with Dr. ${appt.doctorName} at ${appt.time} on ${appt.date.toLocaleString()}.`;

      await sendReminderEmail(appt.patientEmail, 'Appointment Reminder', message);
      await sendReminderEmail(appt.doctorEmail, 'Appointment Reminder', message);

      appt.reminderSent = true;
      await appt.save();
    }

    console.log(`[Cron] Sent ${appointments.length} reminders.`);
  } catch (err) {
    console.error('[Cron] Error in sending reminders:', err);
  }
});
