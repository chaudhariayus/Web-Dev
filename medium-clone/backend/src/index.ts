import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { string } from 'zod'
import errorMap from 'zod/locales/en.js'
import { userrouter } from './routes/user'
import { blogrouter } from './routes/blog'
import { Bindings } from 'hono/types'
import {cors} from 'hono/cors'


const app = new Hono<{Bindings:{DATABASE_URL:string},Variables:{prisma:any}}>()
app.use("*", async (c, next) => {
  try{
    const prisma = new PrismaClient({
      datasources: { db: { url: c.env.DATABASE_URL } },
    }).$extends(withAccelerate());
    c.set("prisma", prisma);
    await next();
  }
  catch(e){
    return c.json({error:"Try again later after sometime"});
  }
});
app.use('/*',cors())
app.route('/api/v1/user',userrouter);
app.route('/api/v1/blog',blogrouter);
export default app
