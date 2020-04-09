import express from "express";
import { getModelForClass } from "@typegoose/typegoose";
import { User, AnonymousUser } from "ts-mongo-models";
//import firebaseAdmin from "../firebase";
import { getProducer} from "../util";
const router = express.Router();

const UserModel = getModelForClass(User);
const AnonymousUserModel = getModelForClass(AnonymousUser);

router.get("/", async function(req, res){
	let producer = await getProducer();
	console.log("kafka producer retrieved, publishing record");
    producer.produce("test-topic", -1, Buffer.from("Testing Message"),'alice');
	const UserModel = getModelForClass(User);
	let user = new UserModel({
        firstName: "matthew",
        lastName: "sampson",
        postalCode: "1111",
        city: "Fredericton",
        province: "NB",
        phoneNumber: "1111111",
        dateOfBirth: new Date(),
        healthConditions: []
    })
    let userDocument = await user.save();
	console.log("User created ", userDocument);
    res.end();
});

export default router;