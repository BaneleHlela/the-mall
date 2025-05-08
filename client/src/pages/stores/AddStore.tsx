import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { businessTypes, days } from '../../utils/helperArrays';
import { AppDispatch } from '../../app/store';
import { addStore } from '../../features/stores/storeSlice';
import { departments } from '../../utils/helperObjects';


const defaultTime = { start: '07:00', end: '17:00', closed: false };

const AddStoreForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    owners: [''], // owner IDs
    businessType: 'sole',
    logo: { url: '', text: '' },
    thumbnail: '',
    slogan: '',
    isVerified: false,
    isBlocked: false,
    isPublished: false,
    operationTimes: {
      alwaysOpen: false,
      monday: { ...defaultTime },
      tuesday: { ...defaultTime },
      wednesday: { ...defaultTime },
      thursday: { ...defaultTime },
      friday: { ...defaultTime },
      saturday: { start: '08:00', end: '14:00', closed: false },
      sunday: { start: '', end: '', closed: true },
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTimeChange = (day: string, key: 'start' | 'end' | 'closed', value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      operationTimes: {
        ...prev.operationTimes,
        [day]: {
          ...prev.operationTimes[day],
          [key]: value,
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addStore(form));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Create Store</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Store Name" className="input" required />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Select Department</option>
        {Object.entries(departments).map(([key, dept]) => (
          <option key={key} value={key}>
            {dept.full}
          </option>
        ))}
      </select>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" required />

      <div>
        <label>Owners (IDs)</label>
        {form.owners.map((ownerId, index) => (
          <input
            key={index}
            value={ownerId}
            onChange={(e) => {
              const updated = [...form.owners];
              updated[index] = e.target.value;
              setForm(prev => ({ ...prev, owners: updated }));
            }}
            placeholder="Owner ID"
            className="input"
          />
        ))}
        <button type="button" onClick={() => setForm(prev => ({ ...prev, owners: [...prev.owners, ''] }))}>
          Add Owner
        </button>
      </div>

      <select name="businessType" value={form.businessType} onChange={handleChange} className="input">
        {businessTypes.map(bt => (
          <option key={bt} value={bt}>{bt}</option>
        ))}
      </select>

      <div>
        <h3>Logo</h3>
        <input name="logo.url" value={form.logo.url} onChange={(e) => setForm(prev => ({ ...prev, logo: { ...prev.logo, url: e.target.value } }))} placeholder="Logo URL" className="input" />
        <input name="logo.text" value={form.logo.text} onChange={(e) => setForm(prev => ({ ...prev, logo: { ...prev.logo, text: e.target.value } }))} placeholder="Logo Text" className="input" />
      </div>

      <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="input" />
      <input name="slogan" value={form.slogan} onChange={handleChange} placeholder="Slogan" className="input" />

      {/* <label><input type="checkbox" name="isVerified" checked={form.isVerified} onChange={handleChange} /> Verified</label>
      <label><input type="checkbox" name="isBlocked" checked={form.isBlocked} onChange={handleChange} /> Blocked</label>
      <label><input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} /> Published</label> */}

      <label>
        <input type="checkbox" name="alwaysOpen" checked={form.operationTimes.alwaysOpen} onChange={(e) =>
          setForm(prev => ({ ...prev, operationTimes: { ...prev.operationTimes, alwaysOpen: e.target.checked } }))
        } />
        Always Open
      </label>

      {!form.operationTimes.alwaysOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {days.map(day => (
            <div key={day} className="border p-2 rounded">
              <h4 className="font-bold capitalize">{day}</h4>
              <label>Start: <input type="time" value={form.operationTimes[day].start} onChange={(e) => handleTimeChange(day, 'start', e.target.value)} /></label>
              <label>End: <input type="time" value={form.operationTimes[day].end} onChange={(e) => handleTimeChange(day, 'end', e.target.value)} /></label>
              <label><input type="checkbox" checked={form.operationTimes[day].closed} onChange={(e) => handleTimeChange(day, 'closed', e.target.checked)} /> Closed</label>
            </div>
          ))}
        </div>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default AddStoreForm;