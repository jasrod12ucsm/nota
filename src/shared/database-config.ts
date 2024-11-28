import pg from "pg";
const {Client}=pg;


const client=new Client({
  user:'jason',
  password:'123546',
  host:'localhost',
  port:5432,
  database:'nota_credito',
});

export default client;
