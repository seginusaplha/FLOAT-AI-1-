const mongoose = require('mongoose');
const ragLlmService = require('../services/ragLlmService');

class HealthController {
  async healthCheck(req, res) {
    try {
      const pythonServiceHealth = await ragLlmService.healthCheck();
      
      const health = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        services: {
          nodejs: 'healthy',
          mongodb: mongoose.connection.readyState === 1 ? 'healthy' : 'unhealthy',
          python_rag_llm: pythonServiceHealth ? 'healthy' : 'unhealthy'
        },
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          env: process.env.NODE_ENV
        }
      };

      const overall = Object.values(health.services).every(status => status === 'healthy');
      
      res.status(overall ? 200 : 503).json(health);
    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }
}

module.exports = new HealthController();
