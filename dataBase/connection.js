
const mongoose = require("mongoose");

mongoose
    .connect(`mongodb+srv://atomostech:jJ2uTdOgJUo4OC1s@mailbusterdb.euwbymg.mongodb.net/E-commers-project`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
    })
.then((res) => { console.log(`Connected to MongoDB ${port}`); })
.catch((err) => console.log("Mongo database connection error occur", err));

app.use((err, req, res, next) => {
    res.status(401).send({ success: false, message: err.message });
  });
  const server = app.listen(port, () => {
    console.log(`app is up and running on ${port}`);
  });

  module.exports = server;
