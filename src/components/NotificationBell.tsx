import { useState, useEffect } from 'react';
import { Bell, X, Swords, TrendingUp, Crown, Shield } from 'lucide-react';
import { useRealtimeNotifications } from '../hooks/useRealtimeBattles';
import { useWeb3 } from '../contexts/Web3Context';

export function NotificationBell() {
  const { account } = useWeb3();
  const { events, unreadCount, markAsRead, markAllAsRead } = useRealtimeNotifications(account);
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'battle_won':
        return <Swords className="w-5 h-5 text-green-500" />;
      case 'battle_lost':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'level_up':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'league_promotion':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEventMessage = (event: any) => {
    const { event_type, event_data } = event;

    switch (event_type) {
      case 'battle_won':
        return `Victory! You ${event_data.isAttacker ? 'attacked' : 'defended against'} ${event_data.opponent.slice(0, 6)}... and won ${event_data.reward} tokens!`;
      case 'battle_lost':
        return `Defeat! You ${event_data.isAttacker ? 'attacked' : 'were attacked by'} ${event_data.opponent.slice(0, 6)}... and lost ${event_data.reward} tokens.`;
      case 'level_up':
        return `Level Up! You reached level ${event_data.newLevel}!`;
      case 'league_promotion':
        return `Promoted! You advanced from ${event_data.oldLeague} to ${event_data.newLeague} league!`;
      default:
        return 'New event';
    }
  };

  const handleMarkAsRead = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await markAsRead(eventId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  if (!account) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all ${
          showAnimation ? 'animate-pulse' : ''
        }`}
      >
        <Bell className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 max-h-[500px] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {events.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 hover:bg-gray-800 transition-colors cursor-pointer ${
                      !event.read ? 'bg-gray-800/50' : ''
                    }`}
                    onClick={(e) => !event.read && handleMarkAsRead(event.id, e)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getEventIcon(event.event_type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!event.read ? 'text-white font-semibold' : 'text-gray-300'}`}>
                          {getEventMessage(event)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.created_at).toLocaleString()}
                        </p>
                      </div>
                      {!event.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
