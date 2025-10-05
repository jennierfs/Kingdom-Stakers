/*
  # Create battle history table

  1. New Tables
    - `battle_history`
      - `id` (uuid, primary key)
      - `player_address` (text) - Player's wallet address (indexed)
      - `opponent_address` (text) - Opponent's wallet address
      - `is_attacker` (boolean) - Whether player was attacker
      - `won_battle` (boolean) - Whether player won
      - `battle_reward` (numeric) - Reward/loss amount
      - `block_number` (bigint) - Block number of battle
      - `transaction_hash` (text) - Transaction hash
      - `battle_timestamp` (timestamptz) - When battle occurred
      - `created_at` (timestamptz) - Record creation time

  2. Security
    - Enable RLS on `battle_history` table
    - Add policy for users to read battle history
    - Add policy for inserting battle records

  3. Indexes
    - Index on player_address for fast queries
    - Index on battle_timestamp for sorting
*/

CREATE TABLE IF NOT EXISTS battle_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_address text NOT NULL,
  opponent_address text NOT NULL,
  is_attacker boolean NOT NULL,
  won_battle boolean NOT NULL,
  battle_reward numeric NOT NULL DEFAULT 0,
  block_number bigint NOT NULL,
  transaction_hash text NOT NULL,
  battle_timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE battle_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all battle history"
  ON battle_history
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert battle history"
  ON battle_history
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_battle_history_player 
  ON battle_history(player_address);

CREATE INDEX IF NOT EXISTS idx_battle_history_timestamp 
  ON battle_history(battle_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_battle_history_transaction 
  ON battle_history(transaction_hash);
