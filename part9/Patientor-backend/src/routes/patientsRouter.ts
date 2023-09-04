import express from 'express';
import patients from '../data/patients';
import {NewPatient, Patient, PublicPatient} from '../types/patientTypes';
import {v1 as uuid} from 'uuid';
import {toNewPatient} from "../utils/helpers";

const router = express.Router();

router.get('/', (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

  res.json(publicPatients);
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);

    const addedPatient: Patient = {
      id: uuid(),
      ...newPatient
    };

    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send("An error occurred");
    }
  }
});

export default router;