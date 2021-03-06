"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
                this.io.emit('mensaje-from-server', data);
            });
        });
    }
}
exports.default = Sockets;
//# sourceMappingURL=sockets.js.map