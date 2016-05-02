# nicar
Easy whois to nic.ar

Powered by: [Cesar Casas](https://ar.linkedin.com/in/cesarcasas "Linkedin")


## install
```bash
$ npm install nicar
```

## use

```js

    const nicar = require("nicar");
    
    nicar("clarin.com.ar")
        .then(info=>{
            console.log(info);
        })
    .catch((err)=>{
            console.log(err);            
        });

```

## use from console

```bash
$ node ./node_modules/nicar/index.js clarin.com.ar
```

## screenshot
For enable screenshots, just use SCREENSHOT=* 

```bash
$ SCREENSHOT=* node ./node_modules/nicar/index.js clarin.com.ar
```

Remember: first create the "screenshots"  folder into project folder.