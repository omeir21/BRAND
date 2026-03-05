// ============================================
// NOTIFICATIONS/TOASTS COMPONENT
// ============================================

"use client";
import { useUIStore } from "@/store/ui";

const Notifications: React.FC = () => {
  const notifications = useUIStore((state) => state.notifications);
  const removeNotification = useUIStore((state) => state.removeNotification);

  return (
    <div className="fixed right-4 top-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`animate-slide-left rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p>{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="transition-opacity hover:opacity-70"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
