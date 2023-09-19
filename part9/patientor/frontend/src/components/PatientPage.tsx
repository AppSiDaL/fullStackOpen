import { Diagnoses, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState, ChangeEvent } from "react";
import diagnosesService from "../services/diagnoses";
import HospitalEntryComp from "./HospitalEntryComp";
import HealthCheckEntryCom from "./HealthCheckEntryCom";
import OccupationalHealthcareEntryComp from "./OccupationalHealthcareEntryComp";
import NewEntryModal from "./Modals/NewEntryModal";
import NewOccuEntryModal from "./Modals/NewOccuEntryModal";
import NewHospitalEntryModal from "./Modals/NewHospitalEntryModal";
import Grid from "@mui/material/Grid";
interface PatientPageProps {
  patient: Patient | null | undefined;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
const PatientPage = ({ patient, setPatients }: PatientPageProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
  const [selectedEntry, setSelectedEntry] = useState("HealthCheck");
  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await diagnosesService.getAll();
      setDiagnoses(patients);
    };
    void fetchPatientList();
  }, []);
  if (!patient) {
    return null;
  }
  const entryTypes: string[] = [
    "HealthCheck",
    "OccupationalHealthcare",
    "Hospital",
  ];
  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string; // Accede al valor del elemento select
    setSelectedEntry(value); // Actualiza el estado cuando cambia la selección
  };

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
      </h2>
      <div>ssh {patient.ssn}</div>
      <div style={{ marginBottom: 10 }}>ocupation {patient.occupation}</div>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue={selectedEntry}
            value={selectedEntry}
            helperText="Please select a Entry"
            onChange={handleSelectChange}
          >
            {entryTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          {(() => {
            switch (selectedEntry) {
              case "HealthCheck":
                return (
                  <NewEntryModal
                    diagnoses={diagnoses}
                    setPatients={setPatients}
                    patient={patient}
                  />
                );
              case "OccupationalHealthcare":
                return (
                  <NewOccuEntryModal
                    setPatients={setPatients}
                    patient={patient}
                    diagnoses={diagnoses}
                  />
                );
              case "Hospital":
                return (
                  <NewHospitalEntryModal
                    setPatients={setPatients}
                    patient={patient}
                    diagnoses={diagnoses}
                  />
                );
              default:
                return null;
            }
          })()}
        </Grid>
      </Grid>

      <h2>entries</h2>
      <div>
        {patient.entries.map((entry, index) => {
          switch (entry?.type) {
            case "HealthCheck":
              return (
                <HealthCheckEntryCom
                  key={index}
                  diagnoses={diagnoses}
                  healthCheckProps={entry}
                />
              );
            case "OccupationalHealthcare":
              return (
                <OccupationalHealthcareEntryComp
                  key={index}
                  diagnoses={diagnoses}
                  OccupationalHealthcareProps={entry}
                />
              );
            case "Hospital":
              return (
                <HospitalEntryComp
                  key={index}
                  HospitalEntryProps={entry}
                  diagnoses={diagnoses}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default PatientPage;
