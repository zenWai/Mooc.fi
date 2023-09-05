import express from 'express';
import diagnoses from '../data/diagnoses';
import {parseDiagnosisCodes} from "../utils/helpers";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from "../types/patientTypes";
import patientService from "../services/patientService";
import {v1 as uuid} from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

type EntryRequestBody =
  Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;
type ExpectedHospitalEntry = Omit<HospitalEntry, 'id'>;
type ExpectedOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
type ExpectedHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const {type} = req.body as EntryRequestBody;
  const diagnosisCodes = parseDiagnosisCodes(req.body);

  const patient = patientService.findById(id);

  if (!patient) {
    res.status(404).json({error: "Patient not found"});
    return;
  }

  if (!type) {
    res.status(400).json({error: "Type is required"});
    return;
  }
  let newEntry: Entry;
  switch (type) {
    case 'Hospital':
      const hospitalEntry = req.body as ExpectedHospitalEntry;
      if (
        !hospitalEntry.discharge ||
        !hospitalEntry.description ||
        !hospitalEntry.specialist ||
        !hospitalEntry.discharge.date ||
        !hospitalEntry.discharge.criteria
      ) {
        return res.status(400).json({error: "Some details are missing"});
      }
      newEntry = {
        id: uuid(),
        ...hospitalEntry,
        diagnosisCodes,
      };
      break;
    case 'OccupationalHealthcare':
      newEntry = {
        id: uuid(),
        ...req.body as ExpectedOccupationalHealthcareEntry,
        diagnosisCodes,
      };
      break;
    case 'HealthCheck':
      newEntry = {
        id: uuid(),
        ...req.body as ExpectedHealthCheckEntry,
        diagnosisCodes,
      };
      break;
    default:
      return res.status(400).json({error: "Invalid type"});
  }

  patientService.addEntry(id, newEntry);
  return res.status(201).json(newEntry);

});

export default router;