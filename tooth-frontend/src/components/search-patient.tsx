import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string; 
  address: string;
  registrationDate: string; 
}

const PatientDetails: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3002/patients');
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        `${patient.firstName} ${patient.lastName} ${patient.middleName} ${patient.dateOfBirth} ${patient.address}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, patients]);

  const handleUpdatePatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleUpdateFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPatient) return;

    try {
      const response = await axios.patch(`http://localhost:3002/patients/update/${selectedPatient.id}`, selectedPatient);
      console.log('Patient updated successfully:', response.data);
      setPatients(patients.map(p => p.id === selectedPatient.id ? selectedPatient : p));
      setSelectedPatient(null); 
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3002/patients/delete/${id}`);
      console.log('Patient deleted successfully:', response.data);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedPatient) return;
    const { name, value } = event.target;
    setSelectedPatient({ ...selectedPatient, [name]: value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (patients.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/3 bg-green-100 flex flex-col items-center justify-center text-black">
        <h2>List of Patients</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 mt-4 border rounded"
        />
      </div>

      <div className="w-2/3 bg-violet-100 flex items-center justify-center">
        <table className="font:64px">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Middle Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.middleName}</td>
                <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                <td>{patient.address}</td>
                <td>{new Date(patient.registrationDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleUpdatePatient(patient)} className="rounded-md bg-lime-700 hover:bg-violet-300">Update</button>
                  <button onClick={() => handleDeletePatient(patient.id)} className="rounded-md bg-lime-700 hover:bg-violet-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-violet-100 flex items-center justify-center text-black">
        <Link to="http://localhost:5173/">
          <button type="button" className="bg-lime-700 text-black rounded hover:bg-violet-300">
            Go to Home Page
          </button>
        </Link>
      </div>

      {selectedPatient && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h2>Update Patient</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={selectedPatient.firstName} onChange={handleInputChange} />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={selectedPatient.lastName} onChange={handleInputChange} />
              </div>
              <div>
                <label>Middle Name:</label>
                <input type="text" name="middleName" value={selectedPatient.middleName} onChange={handleInputChange} />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={selectedPatient.dateOfBirth} onChange={handleInputChange} />
              </div>
              <div>
                <label>Address:</label>
                <input type="text" name="address" value={selectedPatient.address} onChange={handleInputChange} />
              </div>
              <div>
                <label>Registration Date:</label>
                <input type="date" name="registrationDate" value={selectedPatient.registrationDate} onChange={handleInputChange} />
              </div>
              <button type="submit" className="rounded-md bg-lime-700 hover:bg-violet-300">Save</button>
              <button type="button" onClick={() => setSelectedPatient(null)} className="rounded-md bg-red-500 hover:bg-violet-300">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
