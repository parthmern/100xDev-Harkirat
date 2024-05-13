import {atom, selector} from "recoil";
import axios from "axios";

// =====================================================
// ATOMS | variables 
export const msgAtom = atom(
    {
        key : "msgAtom",  // unique name not repeated
        default : 0 ,     // default value
    }
)

export const notiAtom = atom(
    {
        key : "notiAtom",  // unique name
        default : 12 ,     // default value
    }
)

export const objectAtom = atom(
    {
        key : "objectAtom" ,
        default : {
            messgage : 3     ,
            notification : 5 ,
        }
    }
)

// ====================================================
// SELECTOR | using Recoil value
export const totalSelector = selector(
    {
        key : "totalSelector",
        get : ({get}) => {
            const notiCount = get(notiAtom);
            const msgCount = get(msgAtom);

            return(notiCount + msgCount);
        }
    }
)

// ===================================================
// ASYNC DEFAULT VALUES | using selector 
export const asyncLogicalSelector = selector(
    {
        key : "asyncLogicalSelector" ,
        get : async function fetchingData() {
            const res = await axios.get("https://sum-server.100xdevs.com/notifications");
            return (res.data);
        }

    }
)
// problem with above is that the screen will be the white until this function is completed execution 
// what if it takes 20-30 seconds to get the data 