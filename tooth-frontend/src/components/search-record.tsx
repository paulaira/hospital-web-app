import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ClinicalRecord {
  id: number;
  clinicDate: string;
  ailment: string;
  medicinePrescribed?: string;
  procedureUndertaken: string;
  dateOfNextAppt: string;
}

const ClinicalRecordDetails: React.FC = () => {
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3002/clinical-records');
        console.log('Fetched records:', response.data); // Log fetched records
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching clinical records:', error);
      }
    };

    fetchRecords();
  }, []);

  const handleUpdateRecord = (clinicalRecord: ClinicalRecord) => {
    setSelectedRecord(clinicalRecord);
  };

  const handleUpdateFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRecord) return;

    try {
      const response = await axios.patch(`http://localhost:3002/clinical-records/update/${selectedRecord.id}`, selectedRecord);
      console.log('Updated successfully:', response.data);
      setRecords(records.map(p => p.id === selectedRecord.id ? selectedRecord : p));
      setSelectedRecord(null);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDeleteRecord = async (id: number) => {
    if (!records) return;

    try {
      const response = await axios.delete(`http://localhost:3002/clinical-records/delete/${id}`);
      console.log('Clinical record deleted successfully:', response.data);
      setRecords(records.filter(record => record.id !== id));
      setSelectedRecord(null); // Clear selected record after deletion
    } catch (error) {
      console.error('Error deleting clinical record:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedRecord) return;
    const { name, value } = event.target;
    setSelectedRecord({ ...selectedRecord, [name]: value });
    console.log('Selected record updated:', selectedRecord); // Log selectedRecord after update
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setSelectedRecordId(null); 
    console.log('Search query:', searchQuery); 
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = parseInt(searchQuery, 10);
    if (!isNaN(id)) {
      setSelectedRecordId(id);
    }
  };

  const filteredRecords = records.filter(record =>
    (selectedRecordId !== null && record.id === selectedRecordId) ||
    record.ailment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toString().includes(searchQuery) ||
    (record.medicinePrescribed && record.medicinePrescribed.toLowerCase().includes(searchQuery.toLowerCase())) ||
    record.procedureUndertaken.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered records:', filteredRecords); 

  if (records.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/3 bg-green-100 flex flex-col items-center justify-center text-black">
        <h2>List of Records of Patients</h2>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by ID or ailment..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 mt-4 border rounded"
          />
          <button type="submit" className="bg-lime-700 text-black rounded hover:bg-violet-300 ml-2 px-4">Search</button>
        </form>
      </div>
      <div className="w-2/3 bg-violet-100 flex items-center justify-center">
        <table className="font-sans">
          <thead>
            <tr>
              <th>ID</th>
              <th>Clinic Date</th>
              <th>Ailment</th>
              <th>Medicine Prescribed</th>
              <th>Procedure Undertaken</th>
              <th>Date of next appointment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{new Date(record.clinicDate).toLocaleDateString()}</td>
                <td>{record.ailment}</td>
                <td>{record.medicinePrescribed}</td>
                <td>{record.procedureUndertaken}</td>
                <td>{new Date(record.dateOfNextAppt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleUpdateRecord(record)} className="rounded-md bg-lime-700">Update</button>
                  <button onClick={() => handleDeleteRecord(record.id)} className="rounded-md bg-lime-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRecord && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h2>Update Record</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <div>
                <label>Clinic Date:</label>
                <input type="date" name="clinicDate" value={selectedRecord.clinicDate} onChange={handleInputChange} />
              </div>
              <div>
                <label>Ailment:</label>
                <input type="text" name="ailment" value={selectedRecord.ailment} onChange={handleInputChange} />
              </div>
              <div>
                <label>Medicine Prescribed:</label>
                <input type="text" name="medicinePrescribed" value={selectedRecord.medicinePrescribed || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label>Procedure Undertaken:</label>
                <input type="text" name="procedureUndertaken" value={selectedRecord.procedureUndertaken} onChange={handleInputChange} />
              </div>
              <div>
                <label>Date of next appointment:</label>
                <input type="date" name="dateOfNextAppt" value={selectedRecord.dateOfNextAppt} onChange={handleInputChange} />
              </div>

              <button type="submit" className="rounded-md bg-lime-700 hover:bg-violet-300">Save</button>
              <button type="button" onClick={() => setSelectedRecord(null)} className="rounded-md bg-red-500 hover:bg-violet-300">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-violet-100 flex items-center justify-center text-black">
        <Link to="http://localhost:5173/">
          <button type="button" className="bg-lime-700 text-black rounded hover:bg-violet-300">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClinicalRecordDetails;
