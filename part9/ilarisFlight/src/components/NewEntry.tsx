import { useState } from "react";
import { createEntry } from "../services/entryService";
import { Entry, Notification } from "../types";
import axios from "axios";
interface newEntryProps {
  setEntrys: React.Dispatch<React.SetStateAction<Entry[]>>;
  entrys: Entry[];
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}
const NewEntry = ({ setEntrys, entrys, setNotification }: newEntryProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      weather,
      visibility,
      date,
      comment,
    })
      .then((data) => {
        setEntrys(entrys.concat(data));
        setNotification({
          class: "success",
          message: `new entry added with date: ${data.date}`,
        });
        setTimeout(() => {
          setNotification({ class: "", message: "" });
        }, 5000);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification({
            class: "error",
            message: String(error.response?.data),
          });
          setTimeout(() => {
            setNotification({ class: "", message: "" });
          }, 5000);
        } else {
          console.error(error);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  const visibilityOptions: string[] = ["great", "good", "ok", "poor"];
  const weatherOptions: string[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];
  return (
    <div>
      <h2>Add new Entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          date{" "}
          <input
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibilityRadioGroup"
                value={option}
                onChange={(event) => setVisibility(event.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weatherRadioGroup"
                value={option}
                onChange={(event) => setWeather(event.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntry;
