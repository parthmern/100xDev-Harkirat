import { useEffect, useState } from "react";
import "./App.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // i will start a timer of 500ms of updating value but in that time if another value is updated which means user is typing somethig then i will stop the old timer with clearTimeout and restart a timer again
  useEffect(() => {
    let timeoutNumber = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutNumber);
    };
  }, [value]);

  return debouncedValue;
}

//=====================================================================
export default function App() {
  const [value, setValue] = useState();

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    console.log("firing req on server");
  }, [debouncedValue]);

  return (
    <main>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type="text"
      ></input>
      <p>{debouncedValue}</p>
    </main>
  );
}
