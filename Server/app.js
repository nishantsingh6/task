const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());

const cors = require('cors');
app.use(cors());


const port  = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on  ${port} number`);
});


app.get("/", (req,res) => {
    res.send("Hello");
});

const db = require('./config/dataBase');
db.connectDb();

const routers = require('./routes/authRoutes');
app.use("/api/auth", routers);

const orgRoutes = require("./routes/organizationRoutes");
app.use('/api/organizations', orgRoutes);

const projRoutes = require("./routes/projectRoutes");
app.use("/api/project", projRoutes);

// const taskRoutes = require("./routes/taskRoutes");
// app.use("/api/task", taskRoutes);
