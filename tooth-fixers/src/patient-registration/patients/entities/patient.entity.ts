import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ClinicalRecord } from '../../../patient-registration/clinical-records/entities/clinical-record.entity';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    middleName: string;

    @Column()
    dateOfBirth: Date;

    @Column({nullable: true})
    address: string;

    @Column()
    registrationDate: Date;

    @Column({default: true })
    _22120612999: boolean;

    @JoinColumn()
    @OneToMany(type => ClinicalRecord, clinicalRecord => clinicalRecord.patient)
    clinicalRecords: ClinicalRecord[];

}




