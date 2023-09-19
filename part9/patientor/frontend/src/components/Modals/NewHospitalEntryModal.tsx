import * as React from "react";
import { useState, SyntheticEvent } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import patientsService from "../../services/patients";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Diagnoses } from "../../types";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Entry, NewEntry, Patient, EntryTypes } from "../../types";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface newEntryProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patient: Patient | null | undefined;
  diagnoses: Diagnoses[];
}

export default function NewHospitalEntryModal({
  setPatients,
  patient,
  diagnoses,
}: newEntryProps) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosticCodes, setDiagnosticCodes] = React.useState<string[]>([]);
  const [dateDischarge, setDateDischarge] = useState("");
  const [criteria, setCriteria] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: EntryTypes.HospitalEntry,
      description,
      date,
      specialist,
      discharge: {
        date: dateDischarge,
        criteria,
      },
      diagnosisCodes: diagnosticCodes,
    };

    if (patient && patient.id) {
      try {
        const entry: Entry = await patientsService.createEntry(
          newEntry,
          patient.id
        );
        patient.entries.push(entry);

        setPatients((prevPatients) => {
          const updatedPatients = prevPatients.map((prevPatient) =>
            prevPatient.id === patient.id ? patient : prevPatient
          );
          return updatedPatients;
        });
        setDescription("");
        setDate("");
        setSpecialist("");
        setDateDischarge("");
        setCriteria("");
        setDiagnosticCodes([]);
        handleClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // El error es una instancia de AxiosError
          if (error.response) {
            // Acceder a error.response.data aquí
            setError(String(error.response.data));
          }
        } else {
          // Manejar otros tipos de errores aquí
          console.error("Error al crear la entrada:", error);
        }
      }
    } else {
      console.error("No se puede crear la entrada, falta el ID del paciente.");
    }
  };
  const handleChangeSelect = (
    event: SelectChangeEvent<typeof diagnosticCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosticCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div>
      <Button onClick={handleOpen}>New Entry</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {error !== "" ? <Alert severity="error">{error}</Alert> : null}

            <Typography id="transition-modal-title" variant="h6" component="h2">
              New Hospital Entry
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={addEntry}
            >
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
              <TextField
                label="Date"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Specialist"
                variant="outlined"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
              <TextField
                label="Discharge Date"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                type="date"
                value={dateDischarge}
                onChange={({ target }) => setDateDischarge(target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Discharge Criteria"
                variant="outlined"
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={diagnosticCodes}
                onChange={handleChangeSelect}
                input={<OutlinedInput label="Codes" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {diagnoses.map((diagnose) => (
                  <MenuItem key={diagnose.code} value={diagnose.code}>
                    <Checkbox
                      checked={diagnosticCodes.indexOf(diagnose.code) > -1}
                    />
                    <ListItemText primary={diagnose.code} />
                  </MenuItem>
                ))}
              </Select>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
