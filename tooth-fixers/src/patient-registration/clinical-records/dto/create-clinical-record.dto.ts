export class CreateClinicalRecordDto {
    readonly clinicDate: Date;
    readonly ailment: string;
    readonly medicinePrescribed?: string;
    readonly procedureUndertaken: string;
    readonly dateOfNextAppt?: Date;
}
