"use strict";

const debug=require("debug")("nicar");
const args = require('argsparser').parse();
const browser = require("browserwithphantom");


function nicar(domain){

    let mybro = new browser(new Date().getTime(), {});
    var info = {};
    let extensions = {
        '.com.ar': 2,
        '.gob.ar': 3,
        '.int.ar': 4,
        '.mil.ar': 5,
        '.net.ar': 6,
        '.org.ar': 7,
        '.tur.ar': 8
    };

    let parts = domain.split(".");
    domain = parts.shift();
    let ext = "."+parts.join(".");
    ext = extensions[ext] || 2;

    return new Promise((resolve, reject)=>{

        //only for .com.ar domains
        domain = domain.replace(".com.ar", "");
        mybro.ready()
            .then(()=>{
                return mybro.browseTo("https://nic.ar/buscarDominio.xhtml");
            })
            .then(()=>{
                return mybro.loaded();
            })
            .then(()=>{
                return mybro.fillField("input.ui-inputfield", domain, 2 );
            })
            .then(()=>{
                return mybro.select("select",ext, 0);
            })
            .then(()=>{
                return mybro.click("input[type=submit][value=Consultar]");
            })
            .then(()=>{
                return mybro.loaded();
            })
            .then(()=>{
                if(process.env.SCREENSHOT) return mybro.screenshot();
                else return Promise.resolve();
            })
            .then(()=>{
                return mybro.evaluate(function(){
                    var result = {};
                    var tr = document.querySelectorAll(".ui-datatable.ui-widget table tr");
                    for(var x=0; x<tr.length; x++) {
                        var text = tr[x].children[0].textContent;
                        if(text.trim()!=""){
                            var pars = text.split(":");
                            result[pars[0].toLowerCase().trim()] = pars[1].trim();
                        }//end if
                    }//end for

                    return result;
                });
            })
            .then((data)=>{
                info = data;
                return mybro.close();
            })
        .then(()=>{
                resolve(info);
            })
        .catch(err=>{
                reject(err);
            })

    });
};


if(require.main===module){

    var domain  = process.argv[2] || null;

    if(domain==null) console.log("Without domain");
    else{
        console.log("Searching...");
        nicar(domain)
            .then(info=>{
                console.log(info);
            }).catch(err=>{
                console.log(err);
            })
    }//end else

}else{
    module.exports = nicar;
}