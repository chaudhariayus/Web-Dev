import z from "zod";
export declare const signupinput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type Signupinput = z.infer<typeof signupinput>;
export declare const signininput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type Signininput = z.infer<typeof signininput>;
export declare const Blogpost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: string | undefined;
}, {
    title: string;
    content?: string | undefined;
}>;
export type Blog = z.infer<typeof Blogpost>;
export declare const Blogupdate: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: number;
    content?: string | undefined;
}, {
    title: string;
    id: number;
    content?: string | undefined;
}>;
export type Updateblog = z.infer<typeof Blogupdate>;
