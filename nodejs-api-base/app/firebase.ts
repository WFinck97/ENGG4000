import firebaseAdmin from "firebase-admin";

import serviceAccount from "../secrets/birra-272216-firebase-adminsdk-p0v9w-88d5446555.json";

firebaseAdmin.initializeApp({
	//@ts-ignore
	credential: firebaseAdmin.credential.cert(serviceAccount),
	databaseURL: "https://birra-272216.firebaseio.com"
});

export default firebaseAdmin;