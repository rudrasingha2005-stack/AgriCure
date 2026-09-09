let ioInstance;

const initSocket = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    socket.on('joinCentre', (centreId) => {
      socket.join(centreId);
    });
  });
};

const notifyQueueUpdate = (centreId, updateData) => {
  if (ioInstance) {
    ioInstance.to(centreId).emit('queue:update', updateData);
  }
};

module.exports = { initSocket, notifyQueueUpdate };