import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Battle {
  id: string;
  attacker_address: string;
  defender_address: string;
  attacker_won: boolean;
  battle_reward: string;
  attacker_power: string;
  defender_power: string;
  attacker_level: number;
  defender_level: number;
  transaction_hash: string;
  block_number: number;
  timestamp: string;
  created_at: string;
}

export interface PlayerStats {
  player_address: string;
  player_level: number;
  total_battles: number;
  battles_won: number;
  kingdom_size: number;
  battle_score: number;
  win_rate: number;
  current_power: string;
  league_name: string;
  league_id: number;
  last_attack_time: string;
  updated_at: string;
}

export interface PlayerEvent {
  id: string;
  player_address: string;
  event_type: string;
  event_data: any;
  read: boolean;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  player_address: string;
  ranking: number;
  power: string;
  level: number;
  win_rate: number;
  total_battles: number;
  league_name: string;
  updated_at: string;
}

class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToPlayerBattles(
    playerAddress: string,
    onBattle: (battle: Battle) => void
  ): () => void {
    const channelName = `player-battles:${playerAddress}`;

    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'battles',
          filter: `attacker_address=eq.${playerAddress.toLowerCase()}`
        },
        (payload) => {
          onBattle(payload.new as Battle);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'battles',
          filter: `defender_address=eq.${playerAddress.toLowerCase()}`
        },
        (payload) => {
          onBattle(payload.new as Battle);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  subscribeToPlayerStats(
    playerAddress: string,
    onStatsUpdate: (stats: PlayerStats) => void
  ): () => void {
    const channelName = `player-stats:${playerAddress}`;

    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player_stats_cache',
          filter: `player_address=eq.${playerAddress.toLowerCase()}`
        },
        (payload) => {
          if (payload.new) {
            onStatsUpdate(payload.new as PlayerStats);
          }
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  subscribeToPlayerEvents(
    playerAddress: string,
    onEvent: (event: PlayerEvent) => void
  ): () => void {
    const channelName = `player-events:${playerAddress}`;

    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'player_events',
          filter: `player_address=eq.${playerAddress.toLowerCase()}`
        },
        (payload) => {
          onEvent(payload.new as PlayerEvent);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  subscribeToLeaderboard(
    onUpdate: (entry: LeaderboardEntry) => void
  ): () => void {
    const channelName = 'leaderboard-updates';

    if (this.channels.has(channelName)) {
      this.channels.get(channelName)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard_cache'
        },
        (payload) => {
          if (payload.new) {
            onUpdate(payload.new as LeaderboardEntry);
          }
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  async getBattleHistory(playerAddress: string, limit = 50): Promise<Battle[]> {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .or(`attacker_address.eq.${playerAddress.toLowerCase()},defender_address.eq.${playerAddress.toLowerCase()}`)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching battle history:', error);
      return [];
    }

    return data || [];
  }

  async getPlayerStats(playerAddress: string): Promise<PlayerStats | null> {
    const { data, error } = await supabase
      .from('player_stats_cache')
      .select('*')
      .eq('player_address', playerAddress.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error('Error fetching player stats:', error);
      return null;
    }

    return data;
  }

  async getPlayerEvents(playerAddress: string, unreadOnly = false): Promise<PlayerEvent[]> {
    let query = supabase
      .from('player_events')
      .select('*')
      .eq('player_address', playerAddress.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(50);

    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching player events:', error);
      return [];
    }

    return data || [];
  }

  async markEventAsRead(eventId: string): Promise<void> {
    const { error } = await supabase
      .from('player_events')
      .update({ read: true })
      .eq('id', eventId);

    if (error) {
      console.error('Error marking event as read:', error);
    }
  }

  async markAllEventsAsRead(playerAddress: string): Promise<void> {
    const { error } = await supabase
      .from('player_events')
      .update({ read: true })
      .eq('player_address', playerAddress.toLowerCase())
      .eq('read', false);

    if (error) {
      console.error('Error marking all events as read:', error);
    }
  }

  async getLeaderboard(limit = 100): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase
      .from('leaderboard_cache')
      .select('*')
      .order('ranking', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data || [];
  }

  async syncContractEvents(
    contractAddress: string,
    rpcUrl: string,
    fromBlock?: number,
    toBlock?: number
  ): Promise<any> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contract-event-listener`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            action: 'sync',
            contractAddress,
            rpcUrl,
            fromBlock,
            toBlock
          })
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error syncing contract events:', error);
      throw error;
    }
  }

  unsubscribeAll(): void {
    this.channels.forEach(channel => {
      channel.unsubscribe();
    });
    this.channels.clear();
  }
}

export const realtimeService = new RealtimeService();
