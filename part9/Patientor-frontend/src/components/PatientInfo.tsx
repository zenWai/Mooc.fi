import {useParams} from 'react-router-dom';
import {Patient} from '../types';
import {FC} from "react";

interface PatientInfoProps {
  patients: Patient[];
}

const PatientInfo: FC<PatientInfoProps> = ({patients}) => {
  const {id} = useParams<{ id: string }>();
  const patient = patients.find(p => p.id === id);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>{patient.name}</h1>
      <p>Gender: {patient.gender}</p>
      <p>Ssh: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientInfo;