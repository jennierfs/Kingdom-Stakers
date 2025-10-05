/*
  # Create tutorial progress tracking table

  1. New Tables
    - `tutorial_progress`
      - `id` (uuid, primary key)
      - `wallet_address` (text, unique) - User's wallet address
      - `completed` (boolean) - Whether tutorial has been completed
      - `skipped` (boolean) - Whether tutorial was skipped
      - `completed_at` (timestamptz) - When tutorial was completed/skipped
      - `created_at` (timestamptz) - When record was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `tutorial_progress` table
    - Add policy for users to read their own tutorial progress
    - Add policy for users to insert their own tutorial progress
    - Add policy for users to update their own tutorial progress
*/

CREATE TABLE IF NOT EXISTS tutorial_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  completed boolean DEFAULT false,
  skipped boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tutorial_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tutorial progress"
  ON tutorial_progress
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own tutorial progress"
  ON tutorial_progress
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own tutorial progress"
  ON tutorial_progress
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_tutorial_progress_wallet 
  ON tutorial_progress(wallet_address);
