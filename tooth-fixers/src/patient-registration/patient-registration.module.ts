import { Module } from '@nestjs/common';
import { ClinicalRecordsModule } from './clinical-records/clinical-records.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [ClinicalRecordsModule, PatientsModule]
})
export class PatientRegistrationModule {}
