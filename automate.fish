#!/usr/bin/env fish

# fetch notes
bun run fetch

# Add all changed files to the commit
git add .

# Commit with the message "update"
git commit -m "update"

# Push the changes to the remote repository (origin) on the main branch
git push origin main
