import mysql from "mysql";
import config from "../config/config";

const configSQL = {
  host: "localhost",
  user: "testuser",
  password: "123456",
  database: "COMPANY",
  multipleStatements: true
};

const mysqlConnection = mysql.createConnection(configSQL);

mysqlConnection.connect((error) => {
  if (error) console.log(error);
  console.log("sql connection succesfull");
});

export { mysqlConnection }
