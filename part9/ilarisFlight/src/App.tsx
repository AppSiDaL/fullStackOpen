import { useState, useEffect } from "react";
import NewEntry from "./components/NewEntry";
import { Entry, Notification } from "./types";
import { getAllEntrys } from "./services/entryService";
import { Entrys } from "./components/Entrys";
import Notify from "./components/Notify";
function App() {
  const [entrys, setEntrys] = useState<Entry[]>([]);
  const [notification, setNotification] = useState<Notification>({
    class: "",
    message: "",
  });
  useEffect(() => {
    getAllEntrys().then((data) => {
      setEntrys(data);
    });
  }, []);
  return (
    <div>
      <Notify notification={notification} />
      <NewEntry
        setNotification={setNotification}
        entrys={entrys}
        setEntrys={setEntrys}
      />
      <Entrys entrys={entrys} />
    </div>
  );
}

export default App;
