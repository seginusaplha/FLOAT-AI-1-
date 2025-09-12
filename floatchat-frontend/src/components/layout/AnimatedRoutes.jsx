import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Pages
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';

// Components
import AuthGuard from '../auth/AuthGuard';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: -100,
    scale: 0.95
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 100,
    scale: 1.05
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8
};

// Page wrapper component
const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard>
              <PageWrapper>
                <DashboardPage />
              </PageWrapper>
            </AuthGuard>
          } 
        />
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;