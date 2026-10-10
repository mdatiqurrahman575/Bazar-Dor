import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter"; 

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("bazardor_auth"); 

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client: client 
    }), 

    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    

    user: {
        updateUser: {
            enabled: true
        }
    }
});
