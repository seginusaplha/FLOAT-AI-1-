import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import './styles/globals.css';

// Components
import AnimatedRoutes from './components/layout/AnimatedRoutes';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-ocean-deep text-white p-4">
    <div className="text-center glassmorphism p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌊 Diving Too Deep</h2>
      <p className="text-ocean-text mb-6">We hit some rough waters, but we can resurface!</p>
      <button 
        onClick={resetErrorBoundary}
        className="bg-ocean-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        🔄 Surface Again
      </button>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Router>
        <div className="App">
          <AnimatedRoutes />
          
          {/* Global Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--ocean-mid)',
                color: 'white',
                border: '1px solid var(--ocean-light)',
                backdropFilter: 'blur(10px)'
              }
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App
