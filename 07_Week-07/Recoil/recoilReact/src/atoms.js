import {atom} from "recoil";

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