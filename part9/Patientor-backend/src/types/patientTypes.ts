export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface NewPatient {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}