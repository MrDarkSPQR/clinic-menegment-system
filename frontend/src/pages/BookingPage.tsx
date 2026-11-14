import { useState } from 'react';
import { createPatient, createAppointment } from '../api/clinicApi';

export function BookingPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [doctorName, setDoctorName] = useState('Д-р Ковальчук (Терапевт)');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setStatusMessage('');

    try {
      const patient = await createPatient({
        full_name: fullName,
        phone_number: phoneNumber,
      });

      await createAppointment({
        patient_id: patient.id,
        doctor_name: doctorName,
        appointment_date: appointmentDate.replace('T', ' '), 
      });

      setStatusMessage('Заявку успішно відправлено! Адміністратор зателефонує для підтвердження.');
      setFullName('');
      setPhoneNumber('');
      setAppointmentDate('');
    } catch (error) {
      console.error(error);
      setStatusMessage('Помилка при відправці. Перевірте, чи запущений сервер або чи не зареєстрований цей номер.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px' }}>Онлайн-запис на прийом</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          ПІБ пацієнта:
          <input
            type="text"
            required
            placeholder="Іваненко Іван Іванович"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Номер телефону:
          <input
            type="tel"
            required
            placeholder="+380991234567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Оберіть лікаря:
          <select
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          >
            <option value="Д-р Ковальчук (Терапевт)">Д-р Ковальчук (Терапевт)</option>
            <option value="Д-р Мельник (Стоматолог)">Д-р Мельник (Стоматолог)</option>
            <option value="Д-р Бондаренко (Хірург)">Д-р Бондаренко (Хірург)</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          Бажана дата та час:
          <input
            type="datetime-local"
            required
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: '10px', fontSize: '16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' }}
        >
          {isLoading ? 'Відправка...' : 'Записатися на прийом'}
        </button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '16px', fontWeight: 500 }}>{statusMessage}</p>
      )}
    </div>
  );
}