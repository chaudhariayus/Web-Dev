import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { string } from 'zod'
import errorMap from 'zod/locales/en.js'
import { Blogpost,Blogupdate} from '@ayush2173/medium-common'

export const blogrouter = new Hono<{Bindings:{DATABASE_URL:string,JWT_SECRET:string},Variables:{prisma:any,userid:number}}>()


blogrouter.use('/*',async(c,next)=>{
  const jwt =c.req.header('authorization')||"";
  if(!jwt){
    c.status(401);
    return c.json({error:"Unauthorized"});
  }
  const token =jwt.split(' ')[1];
  try{
    const payload=await verify(token,c.env.JWT_SECRET);
    if(!payload|| typeof payload.id!== 'number'){
        c.status(401);
        return c.json({error:"unauthorized"});
    }
    c.set("userid",payload.id);
    await next();
}catch(e){
    c.status(500)
    return c.json({error:"Internal Server Error"});

}
})


blogrouter.post('/', async(c) => {
    const prisma=c.get('prisma');
    try{
        const body=await c.req.json();
        const {success}= Blogpost.safeParse(body)
        if(!success) return c.json({message:"Inputs are incorrect"})
        const post =await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorid:Number(c.get('userid'))
            }
        })
        return c.json({id:post.id})
    }catch(e){
        c.status(503);
        return c.json({error:"Unable to post service unavailable"})
    }
})

blogrouter.put('/', async(c) => {
    
    const prisma=c.get('prisma')
    try{
        const body =await c.req.json();
        const {success}=Blogupdate.safeParse(body);
        if(!success) return c.json({message:"Inputs are incorrect"});
        const post = await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
        return c.json({
            id:post.id
        });
    }catch(e){
        c.status(503);
        return c.json({error:"Unable to update service unavailable"})
    }
});


// Add pagination
blogrouter.get('/bulk', async(c) => {
    const prisma=c.get('prisma');
    try{
      const posts=await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author :{
                select:{
                    username:true
                }
            }
        }
      });
      return c.json({posts});
    }catch(e){
      c.status(503);
      return c.json({message:"Try again later aftersometime Service unavailable"})
    }
  
  })

blogrouter.get('/:id', async(c) => {
    const prisma=c.get('prisma');
    
    try{
        const id=Number(c.req.param('id'))
        const post= await prisma.post.findUnique({
            where:{
                id:id
            }
        })
        return c.json({post});
    }catch(e){
        c.status(503);
        return c.json({error:"Unable to retrieve data service unavailable",e:e})
    }
})





