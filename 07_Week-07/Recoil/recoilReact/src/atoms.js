import {atom, selector} from "recoil";

// =====================================================
// variables
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

// ====================================================
// using Recoil value
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