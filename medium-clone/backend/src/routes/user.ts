import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { string } from 'zod'
import errorMap from 'zod/locales/en.js'
import { signininput,signupinput} from '@ayush2173/medium-common'


export const userrouter = new Hono<{Bindings:{DATABASE_URL:string,JWT_SECRET:string},Variables:{prisma:any,userid:number}}>()



userrouter.post('/signup', async(c) => {
  const prisma=c.get('prisma')
  try{
    const body= await c.req.json();
    const {success} = signupinput.safeParse(body);
    if(!success) return c.json({message:"Inputs are incorrect"});
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        username:body.username
      }
    })
    const token =await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token});
  }catch(e){
    c.status(411);
    return c.json({ message: "Sign up error Try again later after Sometime" });
  }
})

userrouter.post('/signin', async(c) => {
  const prisma = c.get('prisma');
  try{
    const body = await c.req.json();

    const {success}= signininput.safeParse(body);
    if(!success) return c.json({message:"Inputs are incorrect"})
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: 'User not found' });
    }

  
    if (body.password !== user.password) {
      c.status(401); 
      return c.json({ error: 'Invalid password' });
    }

   
    const token =await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (e) {
   
    return c.json({ message: 'Sign-in error. Try again later.' }, 500);
  }
})




