import express from "express";
import { mysqlConnection } from "../database/connection";
import { employee } from "../contracts/employees";

const router = express.Router();

router.get("/", (request, response) => {
  mysqlConnection.query("select * from employees", (error, rows, fields) => {
    if (!error) return response.json(rows);
    return error;
  });
});

router.get("/employee/:id", (request, response) => {
  const idEmployee: number = +request.params.id;
  mysqlConnection.query(
    "select * from employees where id = ?",
    [idEmployee],
    (error, rows, field) => {
      if (!error) return response.json(rows[0]);
      return error;
    }
  );
});

router.post("/", (request, response) => {
  const { id, name, salary }:employee = request.body;
  const query = `
        set @id = ?;
        set @name = ?;
        set @salary = ?;
        call employeeAddOrEdit(@id, @name, @salary);
    `;
  mysqlConnection.query(query, [id, name, salary], (error, rows, fields) => {
    if (!error)
      response.json({
        status: "200",
      });
  });
});

router.put("/:id", (request, response) => {
  const { name, salary }:employee = request.body;
  const { id } = request.params;
  const query:string = "call employeeAddOrEdit(?,?,?)";
  mysqlConnection.query(query, [id, name, salary], (error, rows, fields) => {
    if (!error) return response.json({ status: "200" });
    return error;
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const query:string = "delete from employees where id = ?";
  mysqlConnection.query(query, [id], (error, rows, field) => {
    if (!error) return response.json({ status: "200" });
    return error;
  });
});

export { router };
