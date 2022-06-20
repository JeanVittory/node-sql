import { app } from "./app";

app.listen(app.get("port"), () => {
  console.log(`server runnin on port ${app.get("port")}`);
});
