const sendSMS = async (phone, message) => {
  if (process.env.USE_MOCK_SMS === 'true') {
    console.log(`\n================ [MOCK SMS SENT] ================`);
    console.log(`TO: ${phone}`);
    console.log(`MESSAGE: ${message}`);
    console.log(`=================================================\n`);
    return true;
  }
  // Production integration with Twilio/Fast2SMS goes here
  return true;
};

module.exports = { sendSMS };