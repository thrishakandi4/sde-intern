import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

export function useSocket() {
  const socketRef = useRef(null);
  const [lastBookedSlot, setLastBookedSlot] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('slotBooked', (payload) => {
      setLastBookedSlot(payload);
    });

    return () => {
      socket.off('slotBooked');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return { socket: socketRef.current, lastBookedSlot };
}