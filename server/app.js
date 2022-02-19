require('dotenv').config();
const colors = require('colors');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { notFound, errorHandler } = require('./middleware/error');
const connectDB = require('./db');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sgMail = require('@sendgrid/mail');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const notificationRouter = require('./routes/notification');
const conversationRouter = require('./routes/conversation');
const requestRouter = require('./routes/request');
const uploadRouter = require('./routes/upload');
const deleteRouter = require('./routes/delete');
const availabilityRouter = require('./routes/availability');
const reviewRouter = require('./routes/review');

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

if (process.env.NODE_ENV === "development") {
  server.listen(process.env.PORT, (err, res) => {
    if (err) return console.log(err);
    console.log('server is listening...');
  });
  app.use(logger('dev'));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationRouter);
app.use('/conversations', conversationRouter);
app.use('/requests', requestRouter);
app.use('/upload', uploadRouter);
app.use('/delete', deleteRouter);
app.use('/availability', availabilityRouter);
app.use('/reviews', reviewRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server, io };
