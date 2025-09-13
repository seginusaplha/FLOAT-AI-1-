import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Settings, MessageCircle, BarChart3, Users, Search, PlusCircle } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" 
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(30, 58, 138, 0.9), rgba(30, 64, 175, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><path fill="%23ffffff08" d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"/><path fill="%23ffffff05" d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"/></svg>')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">FloatChat Dashboard</h1>
        <button className="text-white/80 hover:text-white transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Welcome Section */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to FloatChat</h2>
            <p className="text-xl text-blue-100 mb-8">
              Your AI-powered ocean data exploration platform
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ask about ocean data, ARGO floats, temperature trends..."
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-full text-lg"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatting with AI
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/15 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Chat with AI</h3>
              <p className="text-blue-100 mb-4">Ask questions about ocean data and get intelligent responses</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/chat')}
              >
                Start Chat
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/15 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">View Data</h3>
              <p className="text-blue-100 mb-4">Explore interactive visualizations and charts</p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate('/visualizations')}
              >
                Explore Data
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/15 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">New Analysis</h3>
              <p className="text-blue-100 mb-4">Create a new ocean data analysis project</p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/new-analysis')}
              >
                Create Project
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Chat about temperature trends</p>
                    <p className="text-blue-200 text-sm">2 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-white border-white/30">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">ARGO float visualization</p>
                    <p className="text-blue-200 text-sm">Yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-white border-white/30">
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;