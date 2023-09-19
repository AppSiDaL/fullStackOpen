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
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Diagnoses } from "../../types";
import axios from "axios";
import {
  Entry,
  NewEntry,
  Patient,
  EntryTypes,
  HealthCheckRating,
} from "../../types";
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

export default function NewEntryModal({
  setPatients,
  patient,
  diagnoses,
}: newEntryProps) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [diagnosticCodes, setDiagnosticCodes] = React.useState<string[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");

  function convertToHealthCheckRating(ratingStr: string): HealthCheckRating {
    switch (ratingStr) {
      case "Healthy":
        return HealthCheckRating.Healthy;
      case "LowRisk":
        return HealthCheckRating.LowRisk;
      case "HighRisk":
        return HealthCheckRating.HighRisk;
      case "CriticalRisk":
        return HealthCheckRating.CriticalRisk;
      default:
        setError(`Valor no válido para HealthCheckRating: ${ratingStr}`);
        throw new Error(`Valor no válido para HealthCheckRating: ${ratingStr}`);
    }
  }

  // Luego, puedes usar esta función para convertir el string a HealthCheckRating

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: EntryTypes.HealthCheckEntry,
      description,
      date,
      specialist,
      healthCheckRating: convertToHealthCheckRating(rating),
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
        setRating("");
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
  const handleChange = (event: SelectChangeEvent) => {
    setRating(event.target.value as string);
  };
  const handleChangeSelect = (event: SelectChangeEvent<typeof diagnosticCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosticCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
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
              New Heailthy Check Entry
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
              <InputLabel id="demo-simple-select-label">
                Health Rating
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rating}
                label="rating"
                onChange={handleChange}
              >
                <MenuItem value={"Healthy"}>Healthy</MenuItem>
                <MenuItem value={"LowRisk"}>LowRisk</MenuItem>
                <MenuItem value={"HighRisk"}>HighRisk</MenuItem>
                <MenuItem value={"CriticalRisk"}>CriticalRisk</MenuItem>
              </Select>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={diagnosticCodes}
                onChange={handleChangeSelect}
                input={<OutlinedInput label="Codes" />}
                renderValue={(selected) => selected.join(', ')}
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
