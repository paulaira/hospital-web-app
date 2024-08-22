import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '/Users/paulairabor/Documents/toothfixers/tooth-frontend/src/components/homepage.tsx';
import CreatePatient from '/Users/paulairabor/Documents/toothfixers/tooth-frontend/src/components/create-patient.tsx'; 
import CreateClinicalRecord from '/Users/paulairabor/Documents/toothfixers/tooth-frontend/src/components/create-record.tsx';   
import PatientDetails from '/Users/paulairabor/Documents/toothfixers/tooth-frontend/src/components/search-patient.tsx'; 
import ClinicalRecordDetails from '/Users/paulairabor/Documents/toothfixers/tooth-frontend/src/components/search-record.tsx';   

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="patients/create" element={<CreatePatient/>} />
                <Route path="/clinical-records/create" element={<CreateClinicalRecord/>} />
                <Route path="/patients" element={<PatientDetails/>} />
                <Route path="/patients/update/${id}" element={<PatientDetails/>} />
                <Route path="/patients/delete/${id}" element={<PatientDetails/>} />
                <Route path="/clinical-records" element={<ClinicalRecordDetails/>} />
                <Route path="/clinical-records/update/${id}" element={<ClinicalRecordDetails/>} />
                <Route path="/clinical-records/delete/${id}" element={<ClinicalRecordDetails/>} />
            </Routes>
        </Router>
    );
};

export default App;
