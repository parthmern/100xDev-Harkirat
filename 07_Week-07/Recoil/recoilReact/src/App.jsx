import { useMemo, useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { asyncLogicalSelector, msgAtom, notiAtom, objectAtom, totalSelector } from "./atoms";

function App() {

  // const [msg, setMsg] = useState(0);
  // const [noti, setNoti] = useState(0);

  // ATOMS like useState
  const msgCount = useRecoilValue(msgAtom);  // this is only for getting value
  const [notiCount, setNotiCount] = useRecoilState(notiAtom); // this is same as useState
  const objectCount = useRecoilValue(objectAtom); 
  console.log("object atom =>", objectCount);
  // const setNotiCount = useRecoilValue(notiAtom); // just getting setter function not the value

  // =======================================================================================
  // using useMemo because on every render we donot need to call this function
  // const total = useMemo(()=>{
  //   return (msgCount + notiCount) ;
  // }, [msgCount, notiCount]);

  const total = useRecoilValue(totalSelector);

  const asyncAns = useRecoilValue(asyncLogicalSelector);
  console.log(asyncAns);
  



  return (
    <div className="flex items-center justify-center h-[50vh] gap-x-5">
      
      <button className="border ">messages : {msgCount} </button>
      <button onClick={()=>{
        setNotiCount( (prev) => prev+1 ) ;
      }}  className="border">notifications : {notiCount} </button>

      <button>total : {total} </button>

    </div>
  );
}

export default App;
