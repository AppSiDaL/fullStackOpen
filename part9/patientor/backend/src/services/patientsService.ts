import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatientsEntry,
  Patients,
  NewPatientEntry,
  NewEntry,
  Patient,
  Entry,
  Gender,
} from "../types";

const getEntries = (): Patients[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation,entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};
const findById = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient
    ? {
        ...patient,
        gender: patient.gender as Gender, // Asegurarse de que sea del tipo Gender
      }
    : undefined;
};

const addPatient = (entry: NewPatientEntry): Patients => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
    entries: [],
    gender: entry.gender as Gender,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addedEntry = (entry: NewEntry,patientByFind:Patient): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  const patientToUpdate:Patients|undefined = patients.find((patient) => patient.id === patientByFind.id);

if (patientToUpdate) {
  patientToUpdate.entries.push(newEntry);
} 
  return newEntry
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addedEntry
};
