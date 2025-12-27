/*
Real-time communication layer
Simulates WebSocket / SignalR behavior using BroadcastChannel
*/

export type RealtimeEvent =
  | { type: "TASK_ADDED"; payload: any }
  | { type: "TASK_UPDATED"; payload: any }
  | { type: "TASK_BULK_UPDATED"; payload: any };

const CHANNEL_NAME = "project-realtime";

class RealtimeChannel {
  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel(CHANNEL_NAME);
  }

  emit(event: RealtimeEvent) {
    this.channel.postMessage(event);
  }

  subscribe(callback: (event: RealtimeEvent) => void) {
    this.channel.onmessage = (message) => {
      callback(message.data);
    };
  }

  close() {
    this.channel.close();
  }
}

export const realtimeChannel = new RealtimeChannel();
