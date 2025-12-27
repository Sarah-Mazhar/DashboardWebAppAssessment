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
  private channel: BroadcastChannel | null;

  constructor() {
    this.channel = new BroadcastChannel(CHANNEL_NAME);
  }

  emit(event: RealtimeEvent) {
    if (!this.channel) return;
    this.channel.postMessage(event);
  }

  subscribe(callback: (event: RealtimeEvent) => void) {
    if (!this.channel) return;

    this.channel.onmessage = (message) => {
      callback(message.data);
    };
  }

  close() {
    this.channel?.close();
    this.channel = null;
  }
}

export const realtimeChannel = new RealtimeChannel();
