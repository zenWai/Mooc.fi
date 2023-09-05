import {Entry, Patient} from '../types/patientTypes';
import patients from "../data/patients";

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: Entry): void => {
  const patient = findById(id);
  if (patient) {
    patient.entries.push(entry);
  }
};

export default {
  findById,
  addEntry
};