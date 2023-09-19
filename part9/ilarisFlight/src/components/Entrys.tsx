import { Entry } from "../types";
interface EntrysProps {
  entrys: Entry[];
}
export const Entrys = ({ entrys }: EntrysProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entrys.map((entry, index) => (
        <div key={index}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
};
