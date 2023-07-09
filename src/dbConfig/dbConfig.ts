import mongoose, { Mongoose } from "mongoose";
export async function connect() {
	try {
		mongoose.connect(process.env.MONGO_URL!);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("MongoDB connection established");
		});
		connection.on("error", (error) => {
			console.log("MongoDB connection error", error);
			process.exit();
		});
	} catch (error) {
		console.log("something went wrong", error);
	}
}
