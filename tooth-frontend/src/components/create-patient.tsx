import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: Date;
    address: string;
    registrationDate: Date;
}

const CreatePatient: React.FC = () => {
    const [state, setState] = useState<Patient>({
        id: 0,
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: new Date(),
        address: '',
        registrationDate: new Date(),
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newPatient: Patient = {
            id: 0,
            firstName: state.firstName,
            lastName: state.lastName,
            middleName: state.middleName,
            dateOfBirth: state.dateOfBirth || new Date(),
            address: state.address,
            registrationDate: state.registrationDate || new Date(),
        };

        try {
            const response = await axios.post('http://localhost:3002/patients/create', newPatient);
            const createdPatient = response.data;
            setSuccessMessage(`Patient ${createdPatient.firstName} ${createdPatient.lastName} with ID: ${createdPatient.id} has been successfully created`);
            setErrorMessage('');
            setState({
                id: 0,
                firstName: '',
                lastName: '',
                middleName: '',
                dateOfBirth: new Date(),
                address: '',
                registrationDate: new Date(),
            });
        } catch (error) {
            console.error('Error creating patient:', error);
            setErrorMessage('Failed to create patient. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="w-1/3 bg-green-100 flex items-center justify-center text-black">
                <h2 className="font-sans font-bold text-center text-4xl p-10">
                    Creating Patient...
                </h2>
            </div>

            <div className="w-2/3 bg-violet-100 flex items-center justify-center ">
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={state.firstName}
                            onChange={(e) => setState({ ...state, firstName: e.target.value })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={state.lastName}
                            onChange={(e) => setState({ ...state, lastName: e.target.value })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Middle Name:
                        <input
                            type="text"
                            value={state.middleName}
                            onChange={(e) => setState({ ...state, middleName: e.target.value })}
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            value={state.dateOfBirth ? state.dateOfBirth.toISOString().substr(0, 10) : ''}
                            onChange={(e) => setState({ ...state, dateOfBirth: new Date(e.target.value) })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Home Address:
                        <input
                            type="text"
                            value={state.address}
                            onChange={(e) => setState({ ...state, address: e.target.value })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Registration Date:
                        <input
                            type="date"
                            value={state.registrationDate ? state.registrationDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => setState({ ...state, registrationDate: new Date(e.target.value) })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <button type="submit" className="flex bg-white hover:bg-violet-300">
                        Create Patient
                    </button>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <div>
                        <Link to="http://localhost:5173/">
                            <button type="button" className="bg-white text-black rounded hover:bg-violet-300">
                                Go to Home Page
                            </button>
                        </Link>
                    </div>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreatePatient;
