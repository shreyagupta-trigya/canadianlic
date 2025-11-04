// Function to generate otp
const generateNumericOTP = async ()=> {
    const length = 6;
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9) and append it to the OTP
    }
    return otp;
}

module.exports = generateNumericOTP 