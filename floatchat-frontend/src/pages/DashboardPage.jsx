import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Settings, MessageCircle, BarChart3, Users } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Conversational AI",
      description: "Engage with an AI assistant to query and understand ocean data."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data Visualization", 
      description: "Visualize complex data sets with interactive charts and graphs."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Insights",
      description: "Share insights and collaborate with fellow oceanographers."
    }
  ];

  return (
    <div className="min-h-screen ocean-gradient">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-ocean-mid">
        <h1 className="text-2xl font-bold text-white">FloatChat</h1>
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1920&q=80')`
          }}
        ></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Dive into Ocean Data
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Explore the depths of ocean data with our AI-powered 
              conversational interface.
            </p>
            
            <Button 
              size="lg"
              className="bg-ocean-accent hover:bg-opacity-90 text-white px-8 py-4 text-lg font-semibold"
              onClick={() => navigate('/chat')}
            >
              Start Exploring
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Key Features</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.8 }}
              >
                <Card glass className="text-center h-full">
                  <div className="flex justify-center mb-4 text-ocean-accent">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-ocean-text leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;