#!/bin/bash

# Set default .env file name
ENV_FILE=".env.local"

# Check if an argument is provided
if [ -n "$1" ]; then
  ENV_FILE="$1"
fi

# Check if the specified .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE file not found!"
  return 1
fi

echo "Unsetting variables in $ENV_FILE"
# Read the .env file line by line
while IFS='=' read -r key value; do
  # Skip lines that are comments or empty
  if [[ "$key" =~ ^# ]]; then
    continue
  fi

  # Unset the variable
  unset "$key"
done <"$ENV_FILE"
