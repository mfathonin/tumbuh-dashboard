-- Migration Down Script  
  
-- Drop Triggers for Each Table  
DROP TRIGGER IF EXISTS update_users_updated_at ON users;  
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;  
DROP TRIGGER IF EXISTS update_plans_updated_at ON plans;  
DROP TRIGGER IF EXISTS update_wallets_updated_at ON wallets;  
DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;  
DROP TRIGGER IF EXISTS update_budgets_updated_at ON budgets;  
DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;  
DROP TRIGGER IF EXISTS update_transaction_details_updated_at ON transaction_details;  
DROP TRIGGER IF EXISTS update_plan_access_updated_at ON plan_access;  
DROP TRIGGER IF EXISTS update_updates_tracking_updated_at ON updates_tracking;  
  
-- Drop Tables in Reverse Order of Creation  
DROP TABLE IF EXISTS transaction_details CASCADE;  
DROP TABLE IF EXISTS plan_access CASCADE;  
DROP TABLE IF EXISTS updates_tracking CASCADE;  
DROP TABLE IF EXISTS transactions CASCADE;  
DROP TABLE IF EXISTS budgets CASCADE;  
DROP TABLE IF EXISTS goals CASCADE;  
DROP TABLE IF EXISTS wallets CASCADE;  
DROP TABLE IF EXISTS plans CASCADE;  
DROP TABLE IF EXISTS categories CASCADE;  
DROP TABLE IF EXISTS users CASCADE;  
  
-- Drop Enums  
DROP TYPE IF EXISTS wallet_type_enum CASCADE;  
DROP TYPE IF EXISTS update_status_enum CASCADE;  
DROP TYPE IF EXISTS entity_type_enum CASCADE;  
DROP TYPE IF EXISTS transaction_status_enum CASCADE;  
DROP TYPE IF EXISTS status_enum CASCADE;  
DROP TYPE IF EXISTS role_enum CASCADE;  
  
-- Drop the moddatetime extension  
DROP EXTENSION IF EXISTS "moddatetime";
