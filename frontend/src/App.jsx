// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';
// import FarmerDashboard from './pages/FarmerDashboard';
// import CompanyDashboard from './pages/CompanyDashboard';
// import ProfessionalDashboard from './pages/ProfessionalDashboard';

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/farmer" element={<FarmerDashboard />} />
//           <Route path="/company" element={<CompanyDashboard />} />
//           <Route path="/professional" element={<ProfessionalDashboard />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import BookSlot from './pages/farmer/BookSlot';
import Queue from './pages/farmer/Queue';
import Centres from './pages/farmer/Centres';
import Quality from './pages/farmer/Quality';
import Payments from './pages/farmer/Payments';
import PriceTrends from './pages/farmer/PriceTrends';
import Notifications from './pages/farmer/Notifications';
import Weather from './pages/farmer/Weather';
import SavedCrops from './pages/farmer/SavedCrops';

const Farmer = ({children}) => <ProtectedRoute roles={['farmer']}>{children}</ProtectedRoute>;

export default function App() {
 return <AuthProvider><LanguageProvider><NotificationProvider><BrowserRouter><Navbar/><Routes>
   <Route path="/" element={<Navigate to="/login"/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/farmer" element={<Farmer><FarmerDashboard/></Farmer>}/>
   <Route path="/farmer/book" element={<Farmer><BookSlot/></Farmer>}/>
   <Route path="/farmer/queue" element={<Farmer><Queue/></Farmer>}/>
   <Route path="/farmer/centres" element={<Farmer><Centres/></Farmer>}/>
   <Route path="/farmer/quality" element={<Farmer><Quality/></Farmer>}/>
   <Route path="/farmer/payments" element={<Farmer><Payments/></Farmer>}/>
   <Route path="/farmer/price-trends" element={<Farmer><PriceTrends/></Farmer>}/>
   <Route path="/farmer/notifications" element={<Farmer><Notifications/></Farmer>}/>
   <Route path="/farmer/weather" element={<Farmer><Weather/></Farmer>}/>
   <Route path="/farmer/saved-crops" element={<Farmer><SavedCrops/></Farmer>}/>
   <Route path="/company" element={<ProtectedRoute roles={['company', 'admin']}><CompanyDashboard/></ProtectedRoute>}/>
   <Route path="/admin" element={<ProtectedRoute roles={['company', 'admin']}><CompanyDashboard/></ProtectedRoute>}/>
   <Route path="/professional" element={<ProtectedRoute roles={['professional']}><ProfessionalDashboard/></ProtectedRoute>}/>
 </Routes></BrowserRouter></NotificationProvider></LanguageProvider></AuthProvider>;
}
