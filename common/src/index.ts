import {z} from "zod";

export const signupProps = z.object({
    username: z.string().min(5).max(50).email(),
    password: z.string().min(5).max(50)
});

export type SignupParams = z.infer<typeof signupProps>