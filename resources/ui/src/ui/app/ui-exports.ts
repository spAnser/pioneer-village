/**
 * UI Store Exports
 * 
 * These stores can be imported by other UI components or resources
 * to interact with the centralized state management.
 * 
 * Usage:
 * import { chatStore, notificationStore } from '@ui/app/ui-exports';
 */

import { chatStore, notificationStore, inventoryStore } from './stores';

// Export stores for external use
export const stores = {
  chat: chatStore,
  notification: notificationStore,
  inventory: inventoryStore,
};

// Helper functions for common operations

/**
 * Send a notification from any component
 */
export const notify = (
  text: string,
  options?: {
    duration?: number;
    type?: UI.Notification.Type;
    centered?: boolean;
  }
) => {
  notificationStore.notify(text, options);
};

/**
 * Send a success notification
 */
export const notifySuccess = (text: string, duration?: number, centered?: boolean) => {
  notificationStore.notifySuccess(text, duration, centered);
};

/**
 * Send an error notification
 */
export const notifyError = (text: string, duration?: number, centered?: boolean) => {
  notificationStore.notifyError(text, duration, centered);
};

/**
 * Send an info notification
 */
export const notifyInfo = (text: string, duration?: number, centered?: boolean) => {
  notificationStore.notifyInfo(text, duration, centered);
};

/**
 * Add a chat message programmatically
 */
export const addChatMessage = (message: UI.Chat.Message) => {
  chatStore.addMessage(message);
};

/**
 * Send a chat message
 */
export const sendChatMessage = (text: string, channel?: string) => {
  chatStore.sendMessage(text, channel);
};

/**
 * Toggle chat visibility
 */
export const toggleChat = (show?: boolean) => {
  chatStore.toggleChat(show);
};

// Re-export the stores themselves for direct access
export { chatStore, notificationStore, inventoryStore };