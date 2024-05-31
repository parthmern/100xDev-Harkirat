### common folder concept

- here making common folder which includes the verification instances of zod which can be used on CLIENT side and SERVER side 
- it can include anything instances, some common functions types of common things 

<br />
<br />

- and before this when there is not concept of this common folder 
- that time we are actually doing this thing by NPM PACKAGES 
- it is like creating own library that others can use
- we were uploading npm packages in registry and then imporiting them by `npm install packageName` command


## Create npm js account 

- npm is registry where u can put things and that other user can use
- first signup on npm js org site
- `npm login` in your terminal or folder's terminal

<br/>

- after doing login and here u have to do `npm init` and then `npm i` after doing this
- in package.json file name should be unique `"name": "@parthmern/trial",` and here i am wokring with ts file so `"main": "dist/index.js",` should be there so in main there should be proper path of indexjs
- now go to that common folder in terminal and then `npm publish --access=public` to push it on npm
- it is successfully published right now

<br/>

- after going to any common folder than u command `npm pack` that will give u the zip file of things that are published
- HOW VERSIONING works here? = after doing some changes in files when i try to push it that will give u error so you need to change the version of that thing in going to package.json file and  (prev)`"version": "1.0.1",` and then (new) `"version": "1.0.2",`
- how to import to client side and server side ? = `npm i @parthmern/trial` for this registry 


<br />
<br />

### publish ts on npm
- here in gitignore file we ignored `src` folder which has ts file 
- and there is not any meaning of publishing `.ts` file 
- main purpose to push `.js` file and when we are pushing it on registry 
- that file donot have understaning of datatypes of TS bcz that is not going to convvert into js files
- for that reason we need `.d.ts` descriptive file / declaration type file (it gives u just typescript)
- to generate this file go to `tsconfig.json` and write `"declaration": true` after that when u run `npx tsc` that gives you 2 files one is js file and another is .d.ts file
- so always try to add .d.ts file into publishment of npm regsitry