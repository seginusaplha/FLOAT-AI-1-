import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Settings, MessageCircle, BarChart3, Users } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" 
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.9), rgba(30, 64, 175, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><path fill="%23ffffff08" d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"/><path fill="%23ffffff05" d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"/></svg>')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-white">FloatChat</h1>
        <button className="text-white/80 hover:text-white transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Dive into Ocean Data
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Explore the depths of ocean data with our AI-powered conversational interface.
          </p>
          
          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-full text-lg transition-colors"
            onClick={() => navigate('/dashboard')}
          >
            Start Exploring
          </Button>
        </div>

        {/* Key Features Section */}
        <div className="w-full max-w-6xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Key Features
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Conversational AI */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Conversational AI
              </h4>
              <p className="text-blue-100">
                Engage with an AI assistant to query and understand ocean data.
              </p>
            </div>

            {/* Data Visualization */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Data Visualization
              </h4>
              <p className="text-blue-100">
                Visualize complex data sets with interactive charts and graphs.
              </p>
            </div>

            {/* Collaborative Insights */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">
                Collaborative Insights
              </h4>
              <p className="text-blue-100">
                Share insights and collaborate with fellow oceanographers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;