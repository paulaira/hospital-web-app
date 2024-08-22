import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

interface ClinicalRecord {
  clinicDate: Date;
  id: number;
  ailment: string;
  medicinePrescribed?: string;
  procedureUndertaken: string;
  dateOfNextAppt?: Date;
}

const CreateClinicalRecord: React.FC = () => {
    const [state, setState] = useState<ClinicalRecord>({
        clinicDate: new Date(),
        id: 0,
        ailment: '',
        medicinePrescribed: '',
        procedureUndertaken: '',
        dateOfNextAppt: new Date()
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newClinicalRecord: ClinicalRecord = {
            clinicDate: state.clinicDate || new Date(),
            id: state.id,
            ailment: state.ailment,
            medicinePrescribed: state.medicinePrescribed,
            procedureUndertaken: state.procedureUndertaken,
            dateOfNextAppt: state.dateOfNextAppt || new Date()
        };

        try {
            const response = await axios.post('http://localhost:3002/clinical-records/create', newClinicalRecord);
            const createdRecord = response.data;
            setSuccessMessage(`Clinical record created on ${new Date(createdRecord.clinicDate).toLocaleDateString()} with ID: ${createdRecord.id}`);
            setErrorMessage('');
            setState({
                clinicDate: new Date(),
                id: 0,
                ailment: '',
                medicinePrescribed: '',
                procedureUndertaken: '',
                dateOfNextAppt: new Date()
            });
        } catch (error) {
            console.error('Error creating clinical record:', error);
            setErrorMessage('Failed to create clinical record. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="w-1/3 bg-green-100 flex items-center justify-center text-black">
                <h2 className="font-sans font-bold text-center text-4xl p-10">
                    Creating Clinical Record...
                </h2>
            </div>

            <div className='w-2/3 bg-violet-100 flex items-center justify-center'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Clinic Date:
                        <input
                            type="date"
                            value={state.clinicDate ? state.clinicDate.toISOString().substr(0, 10) : ''}
                            onChange={(e) => setState({ ...state, clinicDate: new Date(e.target.value) })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Ailment:
                        <input
                            type="text"
                            value={state.ailment}
                            onChange={(e) => setState({ ...state, ailment: e.target.value })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Medicine Prescribed:
                        <input
                            type="text"
                            value={state.medicinePrescribed || ''}
                            onChange={(e) => setState({ ...state, medicinePrescribed: e.target.value })}
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Procedure Undertaken:
                        <textarea
                            value={state.procedureUndertaken}
                            onChange={(e) => setState({ ...state, procedureUndertaken: e.target.value })}
                            required
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <label>
                        Date of Next Appointment:
                        <input
                            type="date"
                            value={state.dateOfNextAppt ? state.dateOfNextAppt.toISOString().substr(0, 10) : ''}
                            onChange={(e) => setState({ ...state, dateOfNextAppt: new Date(e.target.value) })}
                        />
                    </label>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <button type="submit" className="flex bg-white rounded hover:bg-violet-300">
                        Create Clinical Record
                    </button>
                    <div className="space-y-4 text-center"></div>
                    <br />

                    <Link to="http://localhost:5173/">
                        <button type="button" className="bg-white text-black rounded hover:bg-violet-300">
                            Go to Home Page
                        </button>
                    </Link>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateClinicalRecord;
