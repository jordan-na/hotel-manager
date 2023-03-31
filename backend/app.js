import express from 'express';
import bodyParser from 'body-parser';
import roomsRouter from './routes/rooms.js';
import employeesRouter from './routes/employees.js';

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   next();
});

app.use("/rooms", roomsRouter);


app.use("/employees", employeesRouter);

app.listen(4000, () => {
  console.log('Server is running on port ' + port);
});