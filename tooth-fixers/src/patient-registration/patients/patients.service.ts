import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { ClinicalRecord } from '../clinical-records/entities/clinical-record.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    
    @InjectRepository(ClinicalRecord)
    private clinicalRecordsRepository: Repository<ClinicalRecord>
  ){}
  
  async create(createPatientDto: CreatePatientDto) {
    const newPatient = this.patientRepository.create(createPatientDto);
    if (createPatientDto.clinicalRecord) {
      const newClinicalRecord = this.clinicalRecordsRepository.create(createPatientDto.clinicalRecord);
      const clinicalRecord: ClinicalRecord = await this.clinicalRecordsRepository.save(newClinicalRecord);
      newPatient.clinicalRecords = [clinicalRecord];
    }
    return this.patientRepository.save(newPatient)
  }

  async findAll() {
    return await this.patientRepository.find({});
  }

  async findOne(id: number) {
    return await this.patientRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne({
      where: {
        id
      }
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    Object.assign(patient, updatePatientDto); // Merge updates into patient entity
    return this.patientRepository.save(patient);
  }

  async remove(id: number) {
    return await this.patientRepository.delete(id);
  }
  
  async setUserById(patientId: number, recordId: number) {
    try {
      return await this.patientRepository.createQueryBuilder()
        .relation(Patient, "clinicalRecord")
        .of(patientId)
        .set(recordId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user for student: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetUserById(patientId: number) {
    try {
      return await this.patientRepository.createQueryBuilder()
        .relation(Patient, "clinicalRecord")
        .of(patientId)
        .set(null)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting user for student: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
