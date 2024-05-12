import { useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { msgAtom, notiAtom } from "./atoms";

function App() {

  // const [msg, setMsg] = useState(0);
  // const [noti, setNoti] = useState(0);

  // ATOMS like useState
  const msgCount = useRecoilValue(msgAtom);  // this is only for getting value
  const [notiCount, setNotiCount] = useRecoilState(notiAtom); // this is same as useState

  return (
    <div className="flex items-center justify-center h-[50vh] gap-x-5">
      
      <button className="border ">messages : {msgCount} </button>
      <button onClick={()=>{
        setNotiCount( (prev) => prev+1 ) ;
      }}  className="border">notifications : {notiCount} </button>

    </div>
  );
}

export default App;
