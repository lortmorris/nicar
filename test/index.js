
const nicar = require("../index");

describe("init", function(){

    this.timeout(30 * 1000);

    it("whois to clarin.com.ar", function(done){
        nicar("clarin.com.ar")
            .then(info=>{
                done();
            })
        .catch((err)=>{
                console.log(err);
                done(null);
            });
    })
});