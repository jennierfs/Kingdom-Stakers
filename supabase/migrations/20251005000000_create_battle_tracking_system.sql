/*
  # Battle Tracking System - Real-time Event Listener

  ## Overview
  Complete system to track blockchain events and provide real-time updates to players.

  ## New Tables

  ### 1. battles
  Stores complete battle history from blockchain events
  - `id` (uuid, primary key)
  - `attacker_address` (text) - Attacker wallet address
  - `defender_address` (text) - Defender wallet address
  - `attacker_won` (boolean) - Battle result
  - `battle_reward` (numeric) - Tokens won/lost
  - `attacker_power` (numeric) - Attacker power at battle
  - `defender_power` (numeric) - Defender power at battle
  - `attacker_level` (numeric) - Attacker level at battle
  - `defender_level` (numeric) - Defender level at battle
  - `transaction_hash` (text) - Blockchain transaction hash
  - `block_number` (bigint) - Block number
  - `timestamp` (timestamptz) - Battle timestamp
  - `created_at` (timestamptz) - Record creation time

  ### 2. player_stats_cache
  Cached player statistics for fast queries
  - `player_address` (text, primary key)
  - `player_level` (numeric)
  - `total_battles` (numeric)
  - `battles_won` (numeric)
  - `kingdom_size` (numeric)
  - `battle_score` (numeric)
  - `win_rate` (numeric)
  - `current_power` (numeric)
  - `league_name` (text)
  - `league_id` (numeric)
  - `last_attack_time` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. player_events
  Real-time player events for notifications
  - `id` (uuid, primary key)
  - `player_address` (text)
  - `event_type` (text) - 'battle', 'level_up', 'league_change', etc.
  - `event_data` (jsonb) - Event details
  - `read` (boolean) - Whether player has seen it
  - `created_at` (timestamptz)

  ### 4. leaderboard_cache
  Cached leaderboard for instant display
  - `id` (uuid, primary key)
  - `player_address` (text)
  - `ranking` (numeric)
  - `power` (numeric)
  - `level` (numeric)
  - `win_rate` (numeric)
  - `total_battles` (numeric)
  - `league_name` (text)
  - `updated_at` (timestamptz)

  ### 5. contract_sync_status
  Track last synced block to avoid reprocessing
  - `id` (uuid, primary key)
  - `contract_address` (text)
  - `last_synced_block` (bigint)
  - `last_sync_time` (timestamptz)
  - `is_syncing` (boolean)

  ## Security
  - Enable RLS on all tables
  - Players can read their own data
  - Only service role can write (Edge Functions)
  - Public read access for leaderboard
*/

-- Create battles table
CREATE TABLE IF NOT EXISTS battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attacker_address text NOT NULL,
  defender_address text NOT NULL,
  attacker_won boolean NOT NULL,
  battle_reward numeric NOT NULL DEFAULT 0,
  attacker_power numeric NOT NULL DEFAULT 0,
  defender_power numeric NOT NULL DEFAULT 0,
  attacker_level numeric NOT NULL DEFAULT 0,
  defender_level numeric NOT NULL DEFAULT 0,
  transaction_hash text UNIQUE NOT NULL,
  block_number bigint NOT NULL,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for battles
CREATE INDEX IF NOT EXISTS idx_battles_attacker ON battles(attacker_address);
CREATE INDEX IF NOT EXISTS idx_battles_defender ON battles(defender_address);
CREATE INDEX IF NOT EXISTS idx_battles_timestamp ON battles(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_battles_block ON battles(block_number);
CREATE INDEX IF NOT EXISTS idx_battles_tx_hash ON battles(transaction_hash);

-- Create player_stats_cache table
CREATE TABLE IF NOT EXISTS player_stats_cache (
  player_address text PRIMARY KEY,
  player_level numeric DEFAULT 0,
  total_battles numeric DEFAULT 0,
  battles_won numeric DEFAULT 0,
  kingdom_size numeric DEFAULT 0,
  battle_score numeric DEFAULT 1000,
  win_rate numeric DEFAULT 0,
  current_power numeric DEFAULT 0,
  league_name text DEFAULT 'Bronce',
  league_id numeric DEFAULT 0,
  last_attack_time timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Create index for player stats
CREATE INDEX IF NOT EXISTS idx_player_stats_power ON player_stats_cache(current_power DESC);
CREATE INDEX IF NOT EXISTS idx_player_stats_level ON player_stats_cache(player_level DESC);

-- Create player_events table
CREATE TABLE IF NOT EXISTS player_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_address text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for player events
CREATE INDEX IF NOT EXISTS idx_player_events_address ON player_events(player_address);
CREATE INDEX IF NOT EXISTS idx_player_events_created ON player_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_player_events_unread ON player_events(player_address, read) WHERE read = false;

-- Create leaderboard_cache table
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_address text UNIQUE NOT NULL,
  ranking numeric NOT NULL,
  power numeric NOT NULL DEFAULT 0,
  level numeric NOT NULL DEFAULT 0,
  win_rate numeric DEFAULT 0,
  total_battles numeric DEFAULT 0,
  league_name text DEFAULT 'Bronce',
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for leaderboard
CREATE INDEX IF NOT EXISTS idx_leaderboard_ranking ON leaderboard_cache(ranking);
CREATE INDEX IF NOT EXISTS idx_leaderboard_power ON leaderboard_cache(power DESC);

-- Create contract_sync_status table
CREATE TABLE IF NOT EXISTS contract_sync_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_address text UNIQUE NOT NULL,
  last_synced_block bigint NOT NULL DEFAULT 0,
  last_sync_time timestamptz DEFAULT now(),
  is_syncing boolean DEFAULT false
);

-- Enable RLS on all tables
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_sync_status ENABLE ROW LEVEL SECURITY;

-- RLS Policies for battles
CREATE POLICY "Anyone can read battles"
  ON battles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can insert battles"
  ON battles FOR INSERT
  TO service_role
  WITH CHECK (true);

-- RLS Policies for player_stats_cache
CREATE POLICY "Anyone can read player stats"
  ON player_stats_cache FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage player stats"
  ON player_stats_cache FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for player_events
CREATE POLICY "Players can read own events"
  ON player_events FOR SELECT
  TO authenticated
  USING (player_address = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Service role can insert events"
  ON player_events FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Players can update own events"
  ON player_events FOR UPDATE
  TO authenticated
  USING (player_address = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (player_address = current_setting('request.jwt.claims', true)::json->>'sub');

-- RLS Policies for leaderboard_cache
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard_cache FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage leaderboard"
  ON leaderboard_cache FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for contract_sync_status
CREATE POLICY "Anyone can read sync status"
  ON contract_sync_status FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage sync status"
  ON contract_sync_status FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
