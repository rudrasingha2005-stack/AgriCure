// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { name, phone, email, password, role, identityDocId, bankAccount, companyName } = req.body;
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     user = new User({
//       name, phone, email, passwordHash, role,
//       farmerProfile: role === 'farmer' ? { identityDocId, bankAccount } : undefined,
//       companyProfile: role === 'company' ? { companyName } : undefined
//     });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role, name: user.name },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const otpStore = new Map();

// const signToken = (user) => jwt.sign(
//   { userId: user._id, role: user.role, name: user.name },
//   process.env.JWT_SECRET,
//   { expiresIn: '7d' }
// );

// exports.register = async (req, res) => {
//   try {
//     const {
//       name, phone, email, password, role = 'farmer',
//       dob, gender, preferredLanguage = 'en',
//       farmerId, identityDocId, landId, totalFarmArea, landType, mainCrops, expectedQuantity,
//       companyName, gstin, cin, businessType, procurementCategories, storageCapacity,
//       qualification, licenseId, specialization, organization,
//       address, state, district, block, village, pincode, locationCoordinates,
//       bankAccount, bankDetails
//     } = req.body;

//     const existing = await User.findOne({ $or: [{ phone }, ...(email ? [{ email }] : [])] });
//     if (existing) return res.status(400).json({ message: 'Phone or email already exists' });

//     const passwordHash = password ? await bcrypt.hash(password, 10) : '';

//     const resolvedFarmerId = farmerId || `FMR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;

//     const user = await User.create({
//       name,
//       phone,
//       email: email || undefined,
//       passwordHash,
//       role,
//       dob: dob || '',
//       gender: gender || '',
//       preferredLanguage,
//       farmerProfile: role === 'farmer' ? {
//         farmerId: resolvedFarmerId,
//         identityDocId,
//         landId,
//         totalFarmArea: totalFarmArea ? Number(totalFarmArea) : undefined,
//         landType,
//         mainCrops: Array.isArray(mainCrops) ? mainCrops : [],
//         expectedQuantity: expectedQuantity ? Number(expectedQuantity) : undefined,
//         address,
//         state,
//         district,
//         block,
//         village,
//         pincode,
//         locationCoordinates,
//         bankAccount: bankAccount || bankDetails?.accountNumber,
//         bankDetails: bankDetails ? {
//           accountHolder: bankDetails.accountHolder,
//           bankName: bankDetails.bankName,
//           accountNumber: bankDetails.accountNumber,
//           ifsc: bankDetails.ifsc,
//           isVerified: !!bankDetails.isVerified
//         } : undefined
//       } : undefined,
//       companyProfile: role === 'company' ? {
//         companyName,
//         gstin,
//         cin,
//         businessType,
//         procurementCategories: Array.isArray(procurementCategories) ? procurementCategories : [],
//         storageCapacity: storageCapacity ? Number(storageCapacity) : undefined
//       } : undefined,
//       professionalProfile: role === 'professional' ? {
//         qualification,
//         licenseId,
//         specialization,
//         organization
//       } : undefined
//     });

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         farmerId: user.farmerProfile?.farmerId
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { identifier, email, password } = req.body;
//     const value = identifier || email;
//     const user = await User.findOne({ $or: [{ email: value?.toLowerCase() }, { phone: value }] });
//     if (!user || !user.passwordHash) return res.status(400).json({ message: 'Invalid credentials' });
//     const ok = await bcrypt.compare(password, user.passwordHash);
//     if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
//     const token = signToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, preferredLanguage: user.preferredLanguage } });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// };

// exports.requestOtp = async (req, res) => {
//   try {
//     const { phone, isRegistration } = req.body;
//     if (!phone) return res.status(400).json({ message: 'Phone number is required' });

//     const user = await User.findOne({ phone });
//     if (isRegistration && user) {
//       return res.status(400).json({ message: 'Phone number is already registered' });
//     }
//     if (!isRegistration && !user) {
//       return res.status(404).json({ message: 'Phone number is not registered' });
//     }

//     const otp = process.env.OTP_FIXED_CODE || String(Math.floor(100000 + Math.random() * 900000));
//     otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
//     console.log(`[MOCK OTP] ${phone}: ${otp}`);
//     res.json({ message: 'OTP sent successfully', demoOtp: otp });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { phone, otp, isRegistration, forReset } = req.body;
//     const entry = otpStore.get(phone);
//     if (!entry || entry.expiresAt < Date.now() || entry.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     if (isRegistration || forReset) {
//       return res.json({ verified: true, message: 'OTP verified successfully' });
//     }

//     const user = await User.findOne({ phone });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     otpStore.delete(phone);
//     const token = signToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, preferredLanguage: user.preferredLanguage } });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { phone, otp, newPassword } = req.body;
//     const entry = otpStore.get(phone);
//     if (!entry || entry.expiresAt < Date.now() || entry.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     const user = await User.findOne({ phone });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.passwordHash = await bcrypt.hash(newPassword, 10);
//     await user.save();
//     otpStore.delete(phone);

//     res.json({ message: 'Password reset successfully. You can now login.' });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// };
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const otpStore = new Map();


// // ============================================
// // PASSWORD VALIDATION
// // ============================================

// const validatePassword = (password) => {
//   if (!password || typeof password !== 'string') {
//     return {
//       valid: false,
//       message: 'Password is required'
//     };
//   }

//   if (password.length < 8) {
//     return {
//       valid: false,
//       message: 'Password must contain at least 8 characters'
//     };
//   }

//   if (!/[A-Z]/.test(password)) {
//     return {
//       valid: false,
//       message: 'Password must contain at least one uppercase letter'
//     };
//   }

//   if (!/[a-z]/.test(password)) {
//     return {
//       valid: false,
//       message: 'Password must contain at least one lowercase letter'
//     };
//   }

//   if (!/[0-9]/.test(password)) {
//     return {
//       valid: false,
//       message: 'Password must contain at least one number'
//     };
//   }

//   if (!/[^A-Za-z0-9]/.test(password)) {
//     return {
//       valid: false,
//       message: 'Password must contain at least one special character'
//     };
//   }

//   return {
//     valid: true,
//     message: 'Password is strong'
//   };
// };


// // ============================================
// // JWT TOKEN
// // ============================================

// const signToken = (user) =>
//   jwt.sign(
//     {
//       userId: user._id,
//       role: user.role,
//       name: user.name
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '7d'
//     }
//   );


// // ============================================
// // REGISTER USER
// // ============================================

// exports.register = async (req, res) => {
//   try {

//     const {
//       name,
//       phone,
//       email,
//       password,
//       role = 'farmer',

//       dob,
//       gender,
//       preferredLanguage = 'en',

//       farmerId,
//       identityDocId,
//       landId,
//       totalFarmArea,
//       landType,
//       mainCrops,
//       expectedQuantity,

//       companyName,
//       gstin,
//       cin,
//       businessType,
//       procurementCategories,
//       storageCapacity,

//       qualification,
//       licenseId,
//       specialization,
//       organization,

//       address,
//       state,
//       district,
//       block,
//       village,
//       pincode,
//       locationCoordinates,

//       bankAccount,
//       bankDetails

//     } = req.body;


//     // ============================================
//     // CHECK EXISTING USER
//     // ============================================

//     const existing = await User.findOne({
//       $or: [
//         { phone },
//         ...(email ? [{ email }] : [])
//       ]
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: 'Phone or email already exists'
//       });
//     }


//     // ============================================
//     // PASSWORD VALIDATION
//     // ============================================

//     const passwordValidation = validatePassword(password);

//     if (!passwordValidation.valid) {
//       return res.status(400).json({
//         message: passwordValidation.message
//       });
//     }


//     // ============================================
//     // HASH PASSWORD
//     // ============================================

//     const passwordHash = await bcrypt.hash(password, 10);


//     // ============================================
//     // GENERATE FARMER ID
//     // ============================================

//     const resolvedFarmerId =
//       farmerId ||
//       `FMR-2026-${String(
//         Math.floor(100000 + Math.random() * 900000)
//       )}`;


//     // ============================================
//     // CREATE USER
//     // ============================================

//     const user = await User.create({

//       name,

//       phone,

//       email: email || undefined,

//       passwordHash,

//       role,

//       dob: dob || '',

//       gender: gender || '',

//       preferredLanguage,


//       // ============================================
//       // FARMER PROFILE
//       // ============================================

//       farmerProfile:
//         role === 'farmer'
//           ? {

//               farmerId: resolvedFarmerId,

//               identityDocId,

//               landId,

//               totalFarmArea:
//                 totalFarmArea
//                   ? Number(totalFarmArea)
//                   : undefined,

//               landType,

//               mainCrops:
//                 Array.isArray(mainCrops)
//                   ? mainCrops
//                   : [],

//               expectedQuantity:
//                 expectedQuantity
//                   ? Number(expectedQuantity)
//                   : undefined,

//               address,

//               state,

//               district,

//               block,

//               village,

//               pincode,

//               locationCoordinates,

//               bankAccount:
//                 bankAccount ||
//                 bankDetails?.accountNumber,


//               bankDetails:
//                 bankDetails
//                   ? {

//                       accountHolder:
//                         bankDetails.accountHolder,

//                       bankName:
//                         bankDetails.bankName,

//                       accountNumber:
//                         bankDetails.accountNumber,

//                       ifsc:
//                         bankDetails.ifsc,

//                       isVerified:
//                         !!bankDetails.isVerified

//                     }
//                   : undefined

//             }
//           : undefined,


//       // ============================================
//       // COMPANY PROFILE
//       // ============================================

//       companyProfile:
//         role === 'company'
//           ? {

//               companyName,

//               gstin,

//               cin,

//               businessType,

//               procurementCategories:
//                 Array.isArray(procurementCategories)
//                   ? procurementCategories
//                   : [],

//               storageCapacity:
//                 storageCapacity
//                   ? Number(storageCapacity)
//                   : undefined

//             }
//           : undefined,


//       // ============================================
//       // PROFESSIONAL PROFILE
//       // ============================================

//       professionalProfile:
//         role === 'professional'
//           ? {

//               qualification,

//               licenseId,

//               specialization,

//               organization

//             }
//           : undefined

//     });


//     // ============================================
//     // SUCCESS RESPONSE
//     // ============================================

//     res.status(201).json({

//       message: 'User registered successfully',

//       user: {

//         id: user._id,

//         name: user.name,

//         role: user.role,

//         farmerId:
//           user.farmerProfile?.farmerId

//       }

//     });

//   } catch (err) {

//     res.status(500).json({
//       error: err.message
//     });

//   }
// };


// // ============================================
// // LOGIN
// // ============================================

// exports.login = async (req, res) => {

//   try {

//     const {
//       identifier,
//       email,
//       password
//     } = req.body;


//     const value =
//       identifier || email;


//     const user =
//       await User.findOne({

//         $or: [

//           {
//             email:
//               value?.toLowerCase()
//           },

//           {
//             phone:
//               value
//           }

//         ]

//       });


//     if (!user || !user.passwordHash) {

//       return res.status(400).json({
//         message: 'Invalid credentials'
//       });

//     }


//     const ok =
//       await bcrypt.compare(
//         password,
//         user.passwordHash
//       );


//     if (!ok) {

//       return res.status(400).json({
//         message: 'Invalid credentials'
//       });

//     }


//     const token =
//       signToken(user);


//     res.json({

//       token,

//       user: {

//         id:
//           user._id,

//         name:
//           user.name,

//         role:
//           user.role,

//         email:
//           user.email,

//         phone:
//           user.phone,

//         preferredLanguage:
//           user.preferredLanguage

//       }

//     });

//   } catch (err) {

//     res.status(500).json({
//       error:
//         err.message
//     });

//   }

// };


// // ============================================
// // REQUEST OTP
// // ============================================

// exports.requestOtp = async (req, res) => {

//   try {

//     const {
//       phone,
//       isRegistration
//     } = req.body;


//     if (!phone) {

//       return res.status(400).json({
//         message:
//           'Phone number is required'
//       });

//     }


//     const user =
//       await User.findOne({
//         phone
//       });


//     if (
//       isRegistration &&
//       user
//     ) {

//       return res.status(400).json({
//         message:
//           'Phone number is already registered'
//       });

//     }


//     if (
//       !isRegistration &&
//       !user
//     ) {

//       return res.status(404).json({
//         message:
//           'Phone number is not registered'
//       });

//     }


//     const otp =
//       process.env.OTP_FIXED_CODE ||
//       String(
//         Math.floor(
//           100000 +
//           Math.random() * 900000
//         )
//       );


//     otpStore.set(
//       phone,
//       {

//         otp,

//         expiresAt:
//           Date.now() +
//           5 * 60 * 1000

//       }
//     );


//     console.log(
//       `[MOCK OTP] ${phone}: ${otp}`
//     );


//     res.json({

//       message:
//         'OTP sent successfully',

//       demoOtp:
//         otp

//     });

//   } catch (err) {

//     res.status(500).json({
//       error:
//         err.message
//     });

//   }

// };


// // ============================================
// // VERIFY OTP
// // ============================================

// exports.verifyOtp = async (req, res) => {

//   try {

//     const {
//       phone,
//       otp,
//       isRegistration,
//       forReset
//     } = req.body;


//     const entry =
//       otpStore.get(phone);


//     if (
//       !entry ||
//       entry.expiresAt < Date.now() ||
//       entry.otp !== otp
//     ) {

//       return res.status(400).json({
//         message:
//           'Invalid or expired OTP'
//       });

//     }


//     // OTP verification for registration
//     // or password reset

//     if (
//       isRegistration ||
//       forReset
//     ) {

//       return res.json({

//         verified:
//           true,

//         message:
//           'OTP verified successfully'

//       });

//     }


//     // ============================================
//     // LOGIN USING OTP
//     // ============================================

//     const user =
//       await User.findOne({
//         phone
//       });


//     if (!user) {

//       return res.status(404).json({
//         message:
//           'User not found'
//       });

//     }


//     otpStore.delete(phone);


//     const token =
//       signToken(user);


//     res.json({

//       token,

//       user: {

//         id:
//           user._id,

//         name:
//           user.name,

//         role:
//           user.role,

//         email:
//           user.email,

//         phone:
//           user.phone,

//         preferredLanguage:
//           user.preferredLanguage

//       }

//     });

//   } catch (err) {

//     res.status(500).json({
//       error:
//         err.message
//     });

//   }

// };


// // ============================================
// // RESET PASSWORD
// // ============================================

// exports.resetPassword = async (req, res) => {

//   try {

//     const {
//       phone,
//       otp,
//       newPassword
//     } = req.body;


//     const entry =
//       otpStore.get(phone);


//     if (
//       !entry ||
//       entry.expiresAt < Date.now() ||
//       entry.otp !== otp
//     ) {

//       return res.status(400).json({
//         message:
//           'Invalid or expired OTP'
//       });

//     }


//     // ============================================
//     // VALIDATE NEW PASSWORD
//     // ============================================

//     const passwordValidation =
//       validatePassword(newPassword);


//     if (
//       !passwordValidation.valid
//     ) {

//       return res.status(400).json({

//         message:
//           passwordValidation.message

//       });

//     }


//     const user =
//       await User.findOne({
//         phone
//       });


//     if (!user) {

//       return res.status(404).json({
//         message:
//           'User not found'
//       });

//     }


//     // ============================================
//     // HASH NEW PASSWORD
//     // ============================================

//     user.passwordHash =
//       await bcrypt.hash(
//         newPassword,
//         10
//       );


//     await user.save();


//     otpStore.delete(phone);


//     res.json({

//       message:
//         'Password reset successfully. You can now login.'

//     });

//   } catch (err) {

//     res.status(500).json({
//       error:
//         err.message
//     });

//   }

// };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const otpStore = new Map();

const signToken = (user) => jwt.sign(
  { userId: user._id, role: user.role, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Shared error handler for all auth routes below.
// Converts raw Mongoose/Mongo errors into clean, specific 400 messages
// instead of leaking a generic 500 with the internal error object.
function handleAuthError(err, res) {
  if (err.name === 'ValidationError') {
    const firstError = Object.values(err.errors)[0]?.message || 'Invalid data submitted';
    return res.status(400).json({ message: firstError });
  }
  if (err.code === 11000) {
    // Duplicate key error - figure out which field actually collided
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    const label = field === 'email' ? 'Email' : field === 'phone' ? 'Phone number' : field;
    return res.status(400).json({ message: `${label} is already registered` });
  }
  console.error(err);
  return res.status(500).json({ message: 'Something went wrong. Please try again.' });
}

exports.register = async (req, res) => {
  try {
    const {
      name, phone, email, password, role = 'farmer',
      dob, gender, preferredLanguage = 'en',
      farmerId, identityDocId, landId, totalFarmArea, landType, mainCrops, expectedQuantity,
      companyName, gstin, cin, businessType, procurementCategories, storageCapacity,
      qualification, licenseId, specialization, organization,
      address, state, district, block, village, pincode, locationCoordinates,
      bankAccount, bankDetails
    } = req.body;

    const existing = await User.findOne({ $or: [{ phone }, ...(email ? [{ email }] : [])] });
    if (existing) return res.status(400).json({ message: 'Phone or email already exists' });

    const passwordHash = password ? await bcrypt.hash(password, 10) : '';

    const resolvedFarmerId = farmerId || `FMR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;

    const user = await User.create({
      name,
      phone,
      email: email || undefined,
      passwordHash,
      role,
      dob: dob || '',
      gender: gender || '',
      preferredLanguage,
      farmerProfile: role === 'farmer' ? {
        farmerId: resolvedFarmerId,
        identityDocId,
        landId,
        totalFarmArea: totalFarmArea ? Number(totalFarmArea) : undefined,
        landType,
        mainCrops: Array.isArray(mainCrops) ? mainCrops : [],
        expectedQuantity: expectedQuantity ? Number(expectedQuantity) : undefined,
        address,
        state,
        district,
        block,
        village,
        pincode,
        locationCoordinates,
        bankAccount: bankAccount || bankDetails?.accountNumber,
        bankDetails: bankDetails ? {
          accountHolder: bankDetails.accountHolder,
          bankName: bankDetails.bankName,
          accountNumber: bankDetails.accountNumber,
          ifsc: bankDetails.ifsc,
          isVerified: !!bankDetails.isVerified
        } : undefined
      } : undefined,
      companyProfile: role === 'company' ? {
        companyName,
        gstin,
        cin,
        businessType,
        procurementCategories: Array.isArray(procurementCategories) ? procurementCategories : [],
        storageCapacity: storageCapacity ? Number(storageCapacity) : undefined
      } : undefined,
      professionalProfile: role === 'professional' ? {
        qualification,
        licenseId,
        specialization,
        organization
      } : undefined
    });

    const token = signToken(user);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        farmerId: user.farmerProfile?.farmerId,
        phone: user.phone,
        preferredLanguage: user.preferredLanguage,
        farmerProfile: user.farmerProfile
      }
    });
  } catch (err) {
    handleAuthError(err, res);
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, email, password } = req.body;
    const value = identifier || email;
    const user = await User.findOne({ $or: [{ email: value?.toLowerCase() }, { phone: value }] });
    if (!user || !user.passwordHash) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    handleAuthError(err, res);
  }
};

exports.requestOtp = async (req, res) => {
  try {
    const { phone, isRegistration } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    const user = await User.findOne({ phone });
    if (isRegistration && user) {
      return res.status(400).json({ message: 'Phone number is already registered' });
    }
    if (!isRegistration && !user) {
      return res.status(404).json({ message: 'Phone number is not registered' });
    }

    const otp = process.env.OTP_FIXED_CODE || String(Math.floor(100000 + Math.random() * 900000));
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    console.log(`[MOCK OTP] ${phone}: ${otp}`);
    res.json({ message: 'OTP sent successfully', demoOtp: otp });
  } catch (err) {
    handleAuthError(err, res);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp, isRegistration, forReset } = req.body;
    const entry = otpStore.get(phone);
    if (!entry || entry.expiresAt < Date.now() || entry.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (isRegistration || forReset) {
      return res.json({ verified: true, message: 'OTP verified successfully' });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });
    otpStore.delete(phone);
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email, phone: user.phone, preferredLanguage: user.preferredLanguage } });
  } catch (err) {
    handleAuthError(err, res);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;
    const entry = otpStore.get(phone);
    if (!entry || entry.expiresAt < Date.now() || entry.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    otpStore.delete(phone);

    res.json({ message: 'Password reset successfully. You can now login.' });
  } catch (err) {
    handleAuthError(err, res);
  }
};