import axios from 'axios';
import {
  Button, Checkbox,
  FormControl,
  FormControlLabel, FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField, Typography
} from "@mui/material";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry
} from "../types";
import {useState} from "react";
import {apiBaseUrl} from "../constants";

interface Props {
  patientId: string;
  onRefetchTriggered: () => void;
  diagnoses: Diagnosis[];
}

const NewEntryForm: React.FC<Props> = ({patientId, onRefetchTriggered, diagnoses}) => {
  const [entryType, setEntryType] = useState<string>("Hospital");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChangeDiagnosesCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.name;
    if (event.target.checked) {
      // add selected
      setDiagnosisCodes([...diagnosisCodes, code]);
    } else {
      // remove if unselected
      setDiagnosisCodes(diagnosisCodes.filter(item => item !== code));
    }
  };

  const renderCheckBoxDiagnosesCodes = () => {
    return (
      <>
        <Typography variant="h6">Select Diagnoses</Typography>
        <FormControl component="fieldset">
          <FormGroup style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {diagnoses.map((diagnosis) => (
              <div style={{margin: '0 8px'}} key={diagnosis.code}>
                <FormControlLabel
                  key={diagnosis.code}
                  control={
                    <Checkbox
                      checked={diagnosisCodes.includes(diagnosis.code)}
                      onChange={handleCheckboxChangeDiagnosesCodes}
                      name={diagnosis.code}
                    />
                  }
                  label={diagnosis.code}
                />
              </div>
            ))}
          </FormGroup>
        </FormControl>
        <div>
          <Typography variant="h6">Selected Diagnoses</Typography>
          {diagnosisCodes.map((code) => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <div key={code}>
                <Typography variant="body1">
                  {code} - {diagnosis?.name}
                </Typography>
              </div>
            );
          })}
        </div>
      </>
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newEntry: Entry;

    switch (entryType) {
      case 'Hospital':
        newEntry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        } as HospitalEntry;
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName
        } as OccupationalHealthcareEntry;
        break;
      case 'HealthCheck':
        newEntry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating
        } as HealthCheckEntry;
        break;
      default:
        return;
    }

    try {
      const {data} = await axios.post<Entry>(`${apiBaseUrl}/diagnoses/${patientId}/entries`, newEntry);
      console.log('New entry added:', data);
      // Update UI logic here
      onRefetchTriggered();
      setEntryType("Hospital");
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setHealthCheckRating(HealthCheckRating.Healthy);
      setEmployerName("");
      setDischargeDate("");
      setDischargeCriteria("");
      setErrorMessage('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        if (error.response) {
          console.log("Data", error.response.data);
          console.log("Status", error.response.status);
          console.log("Headers", error.response.headers);
          setErrorMessage("An error occurred: " + error.response.data.error);
        } else if (error.request) {
          console.log("Request", error.request);
          setErrorMessage("No response received");
        } else {
          setErrorMessage("An error occurred: " + error.message);
        }
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>Entry Type</InputLabel>
        <Select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      {entryType === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
          {renderCheckBoxDiagnosesCodes()}
        </>
      )}
      {entryType === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          {renderCheckBoxDiagnosesCodes()}
        </>
      )}
      {entryType === 'HealthCheck' && (
        <FormControl component="fieldset">
          <RadioGroup
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
          >
            <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio/>} label="Healthy"/>
            <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio/>} label="Low Risk"/>
            <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio/>} label="High Risk"/>
            <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio/>} label="Critical Risk"/>
          </RadioGroup>
        </FormControl>
      )}
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </form>
  );
};

export default NewEntryForm;