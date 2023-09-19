export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<Diagnoses["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = "Healthy",
  "LowRisk" = "LowRisk",
  "HighRisk" = "HighRisk",
  "CriticalRisk" = "CriticalRisk",
}
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
  discharge?: Discharge;
}
interface Discharge {
  date: string;
  criteria:string
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
