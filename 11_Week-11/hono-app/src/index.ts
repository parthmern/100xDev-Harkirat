import { Hono } from 'hono'

const app = new Hono()


// this hono library is with code is very similar to EXPRESS

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// ===============================================
// MIDDLEWARE
app.use( '/' ,async (c, next) => {
  if (c.req.header("Authorization")) {
    // Do validation
    console.log("trying for authorization ......");
    await next()
  } else {
    return c.text("You dont have acces");
  }
})


app.get('/', async (c) => {
  const body = await c.req.json();                // how to get req body
  console.log(body);
  console.log(c.req.header("Authorization"));      // how to get req header
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})


export default app
