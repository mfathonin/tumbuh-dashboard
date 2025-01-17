#!/bin/bash

# Read from standard input and store the initial environment variables
initial_vars=$(cat)

# Initialize variables to store mapped values
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
DB_URL=""

# Read each line from the initial variables
while IFS= read -r line; do
  # Extract the key and value from the line
  key=$(echo "$line" | cut -d'=' -f1)
  value=$(echo "$line" | cut -d'=' -f2-)

  # Map the variables
  case "$key" in
  API_URL)
    NEXT_PUBLIC_SUPABASE_URL="$value"
    ;;
  ANON_KEY)
    NEXT_PUBLIC_SUPABASE_ANON_KEY="$value"
    ;;
  SERVICE_ROLE_KEY)
    SUPABASE_SERVICE_ROLE_KEY="$value"
    ;;
  DB_URL)
    DB_URL="$value"
    ;;
  *)
    # Store other variables for later output
    other_vars+="$line"$'\n'
    ;;
  esac
done <<<"$initial_vars"

# Output the mapped variables
echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY"
echo "DB_URL=$DB_URL"

# Add a comment line
echo "# Other generated variables from supabase local"

# Output the remaining variables
echo -e "$other_vars"
