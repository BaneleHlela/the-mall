import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutsSection from './pages/website-builder/LayoutsSection.tsx';
import ScribblerComponent from "./components/ScribblerComponent.tsx";
import "./components/styles/animation.css";
import RedirectAuthenticatedUser from "./components/mall/authorization/RedirectAuthenticatedUser.tsx";
import SignUpPage from "./pages/auth/pages/SignUpPage.tsx";
import ProtectedRoute from "./components/mall/authorization/ProtectedRoute.tsx";
import LoginPage from "./pages/auth/pages/LoginPage.tsx";
import EmailVerificationPage from "./pages/auth/pages/EmailVerificationPage.tsx";
import ForgotPasswordPage from "./pages/auth/pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/auth/pages/ResetPasswordPage.tsx";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/*" element={<LayoutsSection />} /> */}
        <Route
					path='/*'
					element={
						<ProtectedRoute>
							<LayoutsSection />
						</ProtectedRoute>
					}
				/>
        <Route path="/scribbler" element={<ScribblerComponent />} />
        <Route
					path='/signup'
					element={
							<SignUpPage />
					}
				/>
        <Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
      </Routes>
    </Router>
  );
};

export default App;
