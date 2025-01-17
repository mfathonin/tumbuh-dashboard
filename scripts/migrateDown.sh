#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 [--db-url <db_url>] [--target <target_timestamp>]"
    exit 1
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
    --db-url)
        DB_URL="$2"
        shift
        ;;
    --target)
        TARGET="$2"
        shift
        ;;
    *) usage ;;
    esac
    shift
done

# Set default DB_URL if not provided
if [ -z "$DB_URL" ]; then
    DB_URL="$DB_URL"
fi

# Check if DB_URL is set
if [ -z "$DB_URL" ]; then
    echo "Error: DB_URL must be provided either via --db-url or as an environment variable."
    exit 1
fi

# Validate TARGET if provided
if [ -n "$TARGET" ]; then
    if ! [[ "$TARGET" =~ ^[0-9]{14}$ ]]; then
        echo "Error: --target must be a 14-character numeric string."
        exit 1
    fi
fi

# Directory containing the SQL files
DIRECTORY="./supabase/migrations-down"

# Find and sort files by timestamp in descending order
FILES=$(find "$DIRECTORY" -type f -name "*.sql" | grep '_down.sql' | sort -r)

# Prepare the list of files to be executed
FILES_TO_EXECUTE=()
for FILE in $FILES; do
    # Extract the timestamp from the filename
    TIMESTAMP=$(basename "$FILE" | sed 's/_down.sql//')

    # If target is provided, filter files
    if [ -n "$TARGET" ]; then
        if [[ "$TIMESTAMP" == "$TARGET" || "$TIMESTAMP" < "$TARGET" ]]; then
            break
        fi
    fi

    FILES_TO_EXECUTE+=("$FILE")
done

# Check if there are any files to execute
if [ ${#FILES_TO_EXECUTE[@]} -eq 0 ]; then
    echo "No files to execute."
    exit 0
fi

# Print the list of files to be executed
echo "The following files will be executed:"
for FILE in "${FILES_TO_EXECUTE[@]}"; do
    echo "$FILE"
done

# Wait for user confirmation
read -p "Do you want to proceed? (y/N): " CONFIRMATION
if [[ "$CONFIRMATION" != "y" && "$CONFIRMATION" != "Y" ]]; then
    echo "Execution aborted."
    exit 1
fi

for FILE in "${FILES_TO_EXECUTE[@]}"; do
    # Extract the timestamp from the filename
    TIMESTAMP=$(basename "$FILE" | grep -o '^[0-9]\{14\}')

    echo "Running psql command for file: $FILE"
    psql -d "$DB_URL" -f "$FILE"

    # Run supabase migration repair
    echo "Running supabase migration repair for timestamp: $TIMESTAMP"
    pnpm dlx supabase migration repair "$TIMESTAMP" --status reverted --db-url "$DB_URL"
done
