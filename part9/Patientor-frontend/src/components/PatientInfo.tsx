import {useParams} from 'react-router-dom';
import {Diagnosis, Entry, Patient} from '../types';
import {FC, useEffect, useState} from "react";
import {apiBaseUrl} from "../constants";
import axios from "axios";
import EntryDetails from './EntryDetails';
import NewEntryForm from "./NewEntryForm";

interface PatientInfoProps {
  diagnoses: Diagnosis[];
}

const PatientInfo: FC<PatientInfoProps> = ({diagnoses}) => {
  const [patientDetail, setPatientDetail] = useState<Patient | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const {id} = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatientDetail(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientDetail();
  }, [id, shouldRefetch]);

  const triggerRefetch = () => {
    setShouldRefetch(!shouldRefetch);
  };


  const patientToDisplay = patientDetail
  if (!patientToDisplay) return <div>Loading...</div>;

  return (
    <div>
      <h1>{patientToDisplay.name}</h1>
      <p>Gender: {patientToDisplay.gender}</p>
      <p>Ssh: {patientToDisplay.ssn}</p>
      <p>Occupation: {patientToDisplay.occupation}</p>
      <p>Birth: {patientToDisplay.dateOfBirth}</p>
      <h2>Entries</h2>
      <NewEntryForm patientId={patientToDisplay.id} onRefetchTriggered={triggerRefetch} diagnoses={diagnoses}/>
      <div>
        {patientToDisplay.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;