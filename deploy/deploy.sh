#!/bin/bash
set -e

# Update repository
cd /var/www/kekwallet
git pull

# Install dependencies
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18
pnpm install

# Build application
pnpm build

# Copy deployment files
sudo cp deploy/nginx.conf /etc/nginx/sites-available/kekwallet
sudo ln -sf /etc/nginx/sites-available/kekwallet /etc/nginx/sites-enabled/kekwallet
sudo cp deploy/kekwallet.service /etc/systemd/system/

# Reload systemd and restart services
sudo systemctl daemon-reload
sudo systemctl enable kekwallet
sudo systemctl restart kekwallet
sudo nginx -t && sudo systemctl restart nginx

echo "Deployment complete"
