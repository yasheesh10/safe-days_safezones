import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cron from 'node-cron';

// Import routes
import authRoutes from './routes/auth.js';
import emergencyRoutes from './routes/emergency.js';
import culturalRoutes from './routes/cultural.js';
import geofencingRoutes from './routes/geofencing.js';
import blockchainRoutes from './routes/blockchain.js';
import dashboardRoutes from './routes/dashboard.js';
import chatRoutes from "./routes/chat.js";
import sosAlertRoutes from "./routes/sosAlert.js";
import "./crimeScraper.js";
// Import middleware
import { authenticateToken } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Import services
import { EmergencyService } from './services/emergencyService.js';
import { GeofencingService } from './services/geofencingService.js';
import { BlockchainService } from './services/blockchainService.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

/* -------------------------------------------------------
   ✅ SECURITY HEADERS
------------------------------------------------------- */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


/* -------------------------------------------------------
   ✅ GENERAL MIDDLEWARE
------------------------------------------------------- */
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use("/api/chat", chatRoutes);

/* -------------------------------------------------------
   ✅ HEALTH CHECK
------------------------------------------------------- */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'NE Tourist Safety Backend',
    version: '1.0.0',
  });
});

/* -------------------------------------------------------
   ✅ API ROUTES
------------------------------------------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/cultural', culturalRoutes);
app.use('/api/geofencing', geofencingRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);
app.use('/api', sosAlertRoutes);
/* -------------------------------------------------------
   ✅ WEBSOCKET CONNECTION HANDLING
------------------------------------------------------- */
wss.on('connection', (ws) => {
  console.log('🌐 New WebSocket connection established');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case 'EMERGENCY_ALERT':
          await EmergencyService.handleEmergencyAlert(data.payload, ws);
          break;
        case 'LOCATION_UPDATE':
          await GeofencingService.updateLocation(data.payload, ws);
          break;
        case 'HEARTBEAT':
          ws.send(JSON.stringify({ type: 'HEARTBEAT_ACK', timestamp: Date.now() }));
          break;
        default:
          ws.send(JSON.stringify({ type: 'ERROR', message: 'Unknown message type' }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => console.log('🔌 WebSocket connection closed'));
  ws.on('error', (error) => console.error('⚠️ WebSocket error:', error));
});

/* -------------------------------------------------------
   ✅ SCHEDULED TASKS
------------------------------------------------------- */
cron.schedule('0 */6 * * *', () => {
  console.log('⏰ Running scheduled safety zone updates...');
  GeofencingService.updateSafetyZones();
});

cron.schedule('0 0 * * *', () => {
  console.log('🔁 Running daily blockchain sync...');
  BlockchainService.syncDailyTransactions();
});

/* -------------------------------------------------------
   ✅ ERROR HANDLERS
------------------------------------------------------- */
app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
  });
});

/* -------------------------------------------------------
   ✅ START SERVER
------------------------------------------------------- */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 NE Tourist Safety Backend running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for real-time connections`);
  console.log(`🛡️  Security middleware active`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

/* -------------------------------------------------------
   ✅ GRACEFUL SHUTDOWN
------------------------------------------------------- */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
