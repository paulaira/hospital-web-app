import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-green-100 cursor-pointer">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-extrabold text-violet-300">Welcome to ToothFixers</h1>
                
                <p className="text-lg font-bold text-violet-400">Choose a service:</p>
                
                <div className="space-y-2">
                    <Link to="patients/create" className="btn font-violet-500">Create Patient</Link>
                    <div className="space-y-4 text-center"></div>
                    
                    <Link to="/clinical-records/create" className="btn">Create Clinic Record</Link>
                    <div className="space-y-4 text-center"></div>
                    
                    <Link to="/patients" className="btn">Patient Management</Link>
                    <div className="space-y-4 text-center"></div>
                    
                    <Link to="/clinical-records" className="btn">Clinical Records Management</Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
