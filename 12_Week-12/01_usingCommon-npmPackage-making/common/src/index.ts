import { z } from "zod";

export const signupInput = z.object({
    username: z.string(),
    password: z.string()
})
console.log("hi there");

export type SignupParams = z.infer<typeof signupInput>;


// this 2 exported things can be used from CLIENT side and SERVER side