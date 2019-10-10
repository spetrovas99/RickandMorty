import yargs from "yargs";
import request from "request";
 
const urlchar = "https://rickandmortyapi.com/api/character/";
const page = "?page=";
const stat = "?status="
const nom ="?name=";
const config ={
    url: "",
    json : true,
};

yargs.command({
    command: "view",
    define:"show all the information",
    builder:{
        name:{
            define:"the name of the character",
            demmandOption:true,
            type:"string",
        },
    },
    handler: (args) => {
        config.url = urlchar + nom +args.name;
        console.log(urlchar);
        request(config,(error, response) => { 
            (response.body.results).forEach((elem) => {
                  console.log(`nombre: ${elem.name} \nestado: ${elem.status} \nespecie: ${elem.species} \ngenero: ${elem.gender} \norigen: ${elem.origin.name} \nlocalizacion: ${elem.location.name}`);
             });
         });
        }
   });

yargs.command({
    command: "list",
    define: "show you all the names of the characters of RickyMorty",
    builder: {
        pag:{
            define:"the page",
            demmandOption: true,
            type: "int",
        },
        search:{
            define:"name of the character",
            demmandOption: false,
            type: "string",
        },
        status:{
            define: "alive or dead",
            demmandOption: false,
            type: "string",
        },
    },
    handler: (args) => {
     if(args.pag!== undefined){
        config.url = urlchar + page + args.pag;
        request(config,(error, response) => { 
           (response.body.results).forEach((elem) => {
                 console.log(elem.name);
            });
        });
        } else if(args.search!== undefined){
            config.url = urlchar + nom + args.search + page + args.pag;
            request(config,(error, response) => { 
                (response.body.results).forEach((elem) => {
                      console.log(elem.name);
                 });
             });

        }else if(args.status!== undefined){
            config.url = urlchar + stat + args.status + page +args.pag;
            request(config,(error, response) => { 
                (response.body.results).forEach((elem,i) => {
                      console.log(elem.name);
                 });
             });
        }
    },
});

yargs.parse();