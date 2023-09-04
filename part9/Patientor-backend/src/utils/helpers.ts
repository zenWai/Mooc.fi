import {Gender, NewPatient,} from "../types/patientTypes";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!isObject(object) || !object.name || !object.dateOfBirth || !object.ssn || !object.gender || !object.occupation || !Array.isArray(object.entries)) {
    throw new Error('Bad or missing data');
  }

  return {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [],
  };
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return typeof item === 'object' && item !== null;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text: ' + text);
  }
  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !Object.values(Gender).includes(gender as Gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender as Gender;
};