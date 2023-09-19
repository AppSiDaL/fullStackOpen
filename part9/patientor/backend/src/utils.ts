import { HealthCheckRating, NewEntry, NewPatientEntry } from "./types";
import {  Gender, EntryTypes } from "./types";


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntry(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isArray = (array: unknown): array is any[] => {
  return Array.isArray(array);
};
const parseEntry = (entry: unknown): any[] => {
  if (!entry || !isArray(entry)) {
    throw new Error("Incorrect or missing entry");
  }

  return entry;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const toNewEntry = (object: any): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    if (object.type === EntryTypes.HealthCheckEntry) {
      return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
        healthCheckRating: parsehealthCheckRating(object.healthCheckRating),
      };
    } else if (object.type === EntryTypes.HospitalEntry) {
      return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
      };
    } else if (object.type === EntryTypes.OccupationalHealthcareEntry) {
      return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosesCodes(object.diagnosisCodes),
        employerName: parseName(object.employerName),
      };
    }
  }

  throw new Error("Incorrect data: some fields are missing or type is invalid");
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or description description");
  }

  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosesCodes = (diagnoseCode: unknown): any[] => {
  if (!diagnoseCode || !isArray(diagnoseCode)) {
    throw new Error("Incorrect or missing diagnoseCode");
  }

  return diagnoseCode;
};


const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parsehealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    typeof healthCheckRating !== "string" ||
    !isRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing type: " + healthCheckRating);
  }
  return healthCheckRating as HealthCheckRating;
};
