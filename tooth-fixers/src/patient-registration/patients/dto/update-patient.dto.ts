import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { CreateClinicalRecordDto } from "src/patient-registration/clinical-records/dto/create-clinical-record.dto";


export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly dateOfBirth: Date;
    readonly address: string;
    readonly registrationDate: Date;
    readonly matricNo: boolean;
    readonly clinicalRecord: CreateClinicalRecordDto;
}
