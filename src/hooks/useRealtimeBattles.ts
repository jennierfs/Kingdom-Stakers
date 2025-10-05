import { useState, useEffect } from 'react';
import { realtimeService, type Battle, type PlayerStats, type PlayerEvent } from '../services/realtimeService';

export function useRealtimeBattles(playerAddress: string | null) {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerAddress) {
      setLoading(false);
      return;
    }

    const loadBattles = async () => {
      setLoading(true);
      const history = await realtimeService.getBattleHistory(playerAddress);
      setBattles(history);
      setLoading(false);
    };

    loadBattles();

    const unsubscribe = realtimeService.subscribeToPlayerBattles(
      playerAddress,
      (newBattle) => {
        setBattles(prev => [newBattle, ...prev]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [playerAddress]);

  return { battles, loading };
}

export function useRealtimePlayerStats(playerAddress: string | null) {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerAddress) {
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      setLoading(true);
      const playerStats = await realtimeService.getPlayerStats(playerAddress);
      setStats(playerStats);
      setLoading(false);
    };

    loadStats();

    const unsubscribe = realtimeService.subscribeToPlayerStats(
      playerAddress,
      (updatedStats) => {
        setStats(updatedStats);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [playerAddress]);

  return { stats, loading };
}

export function useRealtimeNotifications(playerAddress: string | null) {
  const [events, setEvents] = useState<PlayerEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playerAddress) {
      setLoading(false);
      return;
    }

    const loadEvents = async () => {
      setLoading(true);
      const playerEvents = await realtimeService.getPlayerEvents(playerAddress);
      setEvents(playerEvents);
      setUnreadCount(playerEvents.filter(e => !e.read).length);
      setLoading(false);
    };

    loadEvents();

    const unsubscribe = realtimeService.subscribeToPlayerEvents(
      playerAddress,
      (newEvent) => {
        setEvents(prev => [newEvent, ...prev]);
        if (!newEvent.read) {
          setUnreadCount(prev => prev + 1);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [playerAddress]);

  const markAsRead = async (eventId: string) => {
    await realtimeService.markEventAsRead(eventId);
    setEvents(prev =>
      prev.map(e => e.id === eventId ? { ...e, read: true } : e)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!playerAddress) return;
    await realtimeService.markAllEventsAsRead(playerAddress);
    setEvents(prev => prev.map(e => ({ ...e, read: true })));
    setUnreadCount(0);
  };

  return { events, unreadCount, loading, markAsRead, markAllAsRead };
}
