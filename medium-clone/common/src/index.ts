import z from "zod"

export const signupinput=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
})
export type Signupinput= z.infer<typeof signupinput>

export const signininput=z.object({
    username:z.string(),
    password:z.string().min(6)
})

export type Signininput=z.infer<typeof signininput>

export const Blogpost = z.object({
    title:z.string(),
    content:z.string().optional()
})

export type Blog=z.infer<typeof Blogpost>

export const Blogupdate =z.object({
    id:z.number(),
    title:z.string(),
    content:z.string().optional()
})

export type Updateblog=z.infer<typeof Blogupdate>
