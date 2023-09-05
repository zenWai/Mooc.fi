import {Diagnosis, Entry} from '../types';
import {Card, CardContent, IconButton, Typography} from '@mui/material';
import {LocalHospital as HospitalIcon, Healing as HealthCheck, Work as WorkIcon} from '@mui/icons-material';
import {FC} from "react";

const EntryDetails: FC<{ entry: Entry, diagnoses: Diagnosis[]; }> = ({entry, diagnoses}) => {
  const EntryIcon = () => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalIcon/>;
      case "OccupationalHealthcare":
        return <WorkIcon/>;
      case "HealthCheck":
        return <HealthCheck/>;
      default:
        return null;
    }
  };
  // to handle ts syntax code.name
  const codeToDiagnosis = (code: string) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };
  const renderEntryDetails = () => {
    const renderSpecialist = () => {
      return <Typography>diagnose by {entry.specialist}</Typography>;
    }
    const renderDiagnoses = () => {
      return (
        <>
          {entry.diagnosisCodes?.map((code: string) => {
            const diagnosisName = codeToDiagnosis(code);
            return (
              <Typography key={code}>
                {code} {diagnosisName}
              </Typography>
            );
          })}
        </>
      );
    };

    switch (entry.type) {
      case "Hospital":
        const hospitalEntry = entry;
        return (
          <>
            <Typography
              variant="body2">Discharge: {hospitalEntry.discharge.date}, {hospitalEntry.discharge.criteria}</Typography>
            {renderDiagnoses()}
            {renderSpecialist()}
          </>
        )

      case "OccupationalHealthcare":
        return (
          <>
            <Typography variant="body2">Employer: {entry.employerName}</Typography>
            {renderDiagnoses()}
            {renderSpecialist()}
          </>
        )

      case "HealthCheck":
        return (
          <>
            <Typography variant="body2">Health Rating: {entry.healthCheckRating}</Typography>
            {renderSpecialist()}
          </>
        )

      default:
        return assertNever(entry); // exhaustive type checking
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">
          {entry.date} <IconButton>{EntryIcon()}</IconButton>
        </Typography>
        <Typography variant="body2">{entry.description}</Typography>
        {renderEntryDetails()}
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
