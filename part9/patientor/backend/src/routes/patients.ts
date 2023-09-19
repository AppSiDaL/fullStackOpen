import express from "express";

import patientsService from "../services/patientsService";
import {toNewPatientEntry,toNewEntry} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});
router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientsService.findById(req.params.id);

    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
    }else{
      const addedEntry = patientsService.addedEntry(newEntry, patient);
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});



export default router;
