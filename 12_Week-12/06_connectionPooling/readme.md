# connection pooling

```
https://projects.100xdevs.com/tracks/eooSv7lnuwBO6wl9YA5w/serverless-12
```

- here in lets take example we have 100 cloudflare workers and we cannot make 100 connection directly to the DB because db can only accepts 2-3 connections at a time
- so here connection pulling is working we are connecting all cloud flare workers to the CONNECTION POOL and that connection pool is connected with DB 

- db connections are too costly so try to reduce it