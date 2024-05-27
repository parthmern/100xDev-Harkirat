# What are serverless Backends

```
piyush garg = https://youtu.be/AgOmeANl3ls?si=kpyG2QkUU0DbaP9_

video = https://youtu.be/KeRhA6uhb0g?si=-SsKY_vKbcJaTp8o

video = https://youtu.be/AzNA_F51o9c?si=0BRqjiVbHLSZhFGX 

ex - aws lambda, google cloud platform, cloudflare workers
```

- it doesnot mean there is not any server but it means that
- after deploying your express server you donot have to worry about the thing of autoscaling, traffic handling 
- all these things are managed by this service provider

<br />

- whereas, if you are renting VM virtual machine and then you are deploying ur server there so you have to pay 10$ permonth evern the traffic of your web is zero, you need to do manually auto scaling all stuffs

## login using wrangler for deployment in cloudflare

```
 npx wrangler login       // take login to login page here wrangler is CLI

 npm run deploy           // deploy it on cloudflare
```

- the code of cloudflare wroker is too ugly .. so we need something like express server so it is easy to work with it
- so there is introduction of HONO library which used ( Hono - [炎] means flame🔥 in Japanese - is a small, simple, and ultrafast web framework for the Edges. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js. )