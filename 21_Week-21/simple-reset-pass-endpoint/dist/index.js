"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Store OTPs in a simple in-memory object
const otpStore = {};
// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: 'OTP generated and logged' });
});
// Endpoint to reset password
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        res.status(400).json({ message: 'Email, OTP, and new password are required' });
        return;
    }
    if (otpStore[email] === otp) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email]; // Clear the OTP after use
        res.status(200).json({ message: 'Password has been reset successfully' });
    }
    else {
        res.status(401).json({ message: 'Invalid OTP' });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 100000; i < 999999; i++) {
            try {
                const res = yield axios_1.default.post("http://localhost:3000/reset-password", {
                    email: "parth@gmail.com",
                    otp: i,
                    newPassword: "123"
                });
                console.log("succes");
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
main();
