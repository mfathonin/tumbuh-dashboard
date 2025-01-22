-- Migration Up Script  
-- Enable the moddatetime extension  
CREATE extension IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";
-- Create Enums  
CREATE TYPE role_enum AS ENUM ('Admin', 'Viewer');
CREATE TYPE status_enum AS ENUM (
    'Pending',
    'Accepted',
    'Declined',
    'Active',
    'Archived'
);
CREATE TYPE transaction_status_enum AS ENUM ('Draft', 'Finalized', 'Canceled');
CREATE TYPE entity_type_enum AS ENUM ('Wallets', 'Goals');
CREATE TYPE update_status_enum AS ENUM ('Pending', 'Processing', 'Completed', 'Failed');
CREATE TYPE wallet_type_enum AS ENUM ('Bank', 'Cash');
-- Create Trigger Function to Update `updated_at`
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER
SET search_path = '' AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create Tables  
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE plans (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES users(id),
    status status_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE wallets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
    plan_id UUID NOT NULL REFERENCES plans(id),
    type wallet_type_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE goals (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    target DECIMAL(10, 2) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
    plan_id UUID NOT NULL REFERENCES plans(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE budgets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    started_at DATE,
    ended_at DATE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    plan_id UUID NOT NULL REFERENCES plans(id),
    amount DECIMAL(10, 2) NOT NULL,
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    category_id UUID NOT NULL REFERENCES categories(id),
    goal_id UUID REFERENCES goals(id),
    budget_id UUID REFERENCES budgets(id),
    transaction_date DATE NOT NULL,
    effective_date DATE NOT NULL,
    status transaction_status_enum NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE transaction_details (
    id UUID PRIMARY KEY,
    transaction_id UUID NOT NULL REFERENCES transactions(id),
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE plan_access (
    id UUID PRIMARY KEY,
    plan_id UUID NOT NULL REFERENCES plans(id),
    user_id UUID NOT NULL REFERENCES users(id),
    role role_enum NOT NULL,
    status status_enum NOT NULL,
    invited_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);
CREATE TABLE updates_tracking (
    id UUID PRIMARY KEY,
    entity_type entity_type_enum NOT NULL,
    entity_id UUID NOT NULL,
    status update_status_enum NOT NULL,
    message TEXT,
    last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Create Trigger on Auth.users insert to copy user profile data
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = '' AS $$ BEGIN
INSERT INTO public.users (id, name, email, avatar)
VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'name',
        NEW.email,
        NEW.raw_user_meta_data->>'avatar'
    );
RETURN NEW;
END;
$$;
-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
-- Create Triggers for Each Table to Update `updated_at`  
CREATE TRIGGER update_users_updated_at BEFORE
UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE
UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plans_updated_at BEFORE
UPDATE ON plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE
UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE
UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE
UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE
UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transaction_details_updated_at BEFORE
UPDATE ON transaction_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plan_access_updated_at BEFORE
UPDATE ON plan_access FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_updates_tracking_updated_at BEFORE
UPDATE ON updates_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();