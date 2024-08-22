import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../../../patient-registration/patients/entities/patient.entity'

@Entity()
export class ClinicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clinicDate: Date;

    @Column()
    ailment: string;

    @Column({nullable: true})
    medicinePrescribed: string;

    @Column()
    procedureUndertaken: string;

    @Column()
    dateOfNextAppt: Date;

    @ManyToOne(() => Patient, patient => patient.clinicalRecords,  { cascade: true })
    patient: Patient;


}

