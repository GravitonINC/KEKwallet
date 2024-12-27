# Google Cloud Deployment Configuration

## Environment Variables
When deploying to Google Cloud, ensure the following environment variable is set:
```
NEXT_PUBLIC_DEPLOYMENT_ENV=gcp
```
This ensures that the application uses the normal runtime environment detection logic instead of forcing PWA mode.

## Deployment Steps
1. Set environment variables in Google Cloud:
   ```bash
   gcloud app deploy app.yaml
   ```

2. Verify deployment:
   - Check that the application is not forcing PWA mode on desktop
   - Confirm that mobile detection works correctly
   - Test PWA installation on mobile devices

## Configuration Files
Create `app.yaml` in the root directory with:
```yaml
runtime: nodejs18
env_variables:
  NEXT_PUBLIC_DEPLOYMENT_ENV: "gcp"
  # Add other environment variables from .env.sample here
```

## Testing
Before deploying:
1. Test locally with `NEXT_PUBLIC_DEPLOYMENT_ENV=gcp`
2. Verify that desktop users see the mobile prompt
3. Confirm PWA installation works on mobile devices

## Troubleshooting
If PWA mode is incorrectly enabled on desktop:
1. Verify `NEXT_PUBLIC_DEPLOYMENT_ENV` is set to "gcp"
2. Check deployment logs for environment variable issues
3. Clear browser cache and reload the page
