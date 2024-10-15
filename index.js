const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

//MongoDB database
mongoose.connect("mongodb+srv://admin:admin1234@cluster0.uywwcr7.mongodb.net/blogApp-API?retryWrites=true&w=majority&appName=Cluster0", {});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


//Routes Middleware
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

if(require.main === module){
	app.listen(process.env.PORT || port, () => {
	    console.log(`API is now online on port ${ process.env.PORT || port }`)
	});
}

module.exports = {app,mongoose};