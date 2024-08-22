import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
import { ClinicalRecord } from './entities/clinical-record.entity';


@Injectable()
export class ClinicalRecordsService {
  constructor(
    @InjectRepository(ClinicalRecord)
    private clinicalRecordsRepository: Repository<ClinicalRecord>
  ){}
  
  async create(createClinicalRecordDto: CreateClinicalRecordDto) {
    const newRecord: ClinicalRecord = this.clinicalRecordsRepository.create(createClinicalRecordDto);
    return this.clinicalRecordsRepository.save(newRecord);
  }

  async findAll() {
    return await this.clinicalRecordsRepository.find();
  }

  async findOne(id: number) {
    return await this.clinicalRecordsRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateClinicalRecordDto: UpdateClinicalRecordDto) {
    return await this.clinicalRecordsRepository.update(id, updateClinicalRecordDto);
  }

  async remove(id: number) {
    return await this.clinicalRecordsRepository.delete(id);
  }
}
