const mongoose = require("mongoose");

let retrive;
if (process.argv.length < 3) {
  console.log("give password as argument");
  console.log("only password");
  process.exit(1);
} else if (process.argv.length == 3) {
  retrive = true;
}

const password = process.argv[2];
console.log(password);
const url = `mongodb+srv://AppSiDaL:${password}@cluster0.4gm1you.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (retrive) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
}
