// password zod
const jwt=require('jsonwebtoken');
const express = require('express');
const zod = require('zod');
const app = express();
app.use(express.json());
const jwtPassword="secret"; // Secret key for JWT signing

// Zod schema for validating user credentials
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6, "Password must be at least 6 characters long");
// Endpoint to sign JWT token
function signJwt(username,password){

    const usernameResponse=emailSchema.safeParse(username);
    const passwordResponse=passwordSchema.safeParse(password);
    // Validate username and password using Zod schemas
    if (!usernameResponse.success) {
        throw new Error("Invalid email format");
    }

    if (!passwordResponse.success) {
        throw new Error("Invalid password format: " + passwordResponse.error.message);
    }
    // Generate JWT token
    // If validation passes, create a JWT token with the username
    const signature=jwt.sign({
        username
    },jwtPassword)
    return signature;

    }
 const ans=signJwt("sefeswwe","password123");
 console.log(ans); // Log the generated JWT token

// Endpoint to verify JWT token



function verifyJwt(token) {
    try{
         jwt.verify(token, jwtPassword);
        return true;
    }catch(e){
        console.error("JWT verification failed:", e.message);
    }
    return false;
    
// Verify the JWT token using the secret key
// if (verified) {
//     console.log("Verified JWT:", verified);
//     return verified;}else {
//     throw new Error("Invalid token");
//     }
}




 // Endpoint to decode JWT token
function decodeJwt(token){
    // true,false
    const decoded = jwt.verify(token, jwtPassword);
    // Verify the JWT token using the secret key
    if(decoded){
        console.log("Decoded JWT:", decoded);
        return decoded;
    }else{
        throw new Error("Invalid token");
    }
}