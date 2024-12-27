#!/bin/bash
set -e

# Submit the build to Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# Wait for the new revision to be ready
echo "Waiting for deployment to complete..."
gcloud run services wait kekwallet --region us-central1

echo "Deployment completed successfully!"
