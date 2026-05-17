const express = require('express');
const client = require('prom-client');
const { router: healthRouter } = require('./routes/health');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 4000;

// Prometheus metrics — auto-collect default Node.js metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom HTTP request counter
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Routes
app.use('/', healthRouter);
app.use('/api', apiRouter);

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
