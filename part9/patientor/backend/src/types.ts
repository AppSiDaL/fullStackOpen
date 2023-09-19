export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  entries: Entry[];
  occupation: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export type NonSensitivePatientsEntry = Omit<Patients, "ssn">;
export type NewPatientEntry = Omit<Patients, "id">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnoses["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
// Define special omit for unions

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: object;
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: object;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export interface Patient {
  id: string;
  name: string;
  ssn?: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type newBaseEntry = Omit<BaseEntry, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export enum EntryTypes {
  HealthCheckEntry = "HealthCheck",
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HospitalEntry = "Hospital",
}
export interface newHealthCheckEntry {
  type: EntryTypes.HealthCheckEntry;
  healthCheckRating: HealthCheckRating;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface newOccupationalHealthcareEntry {
  type: EntryTypes.OccupationalHealthcareEntry;
  employerName: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface newHospitalEntry {
  type: EntryTypes.HospitalEntry;
  discharge?: {
    date: string;
    criteria: string;
  };
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}
export type NewEntry =
  | newHealthCheckEntry
  | newOccupationalHealthcareEntry
  | newHospitalEntry;
