# KEKwallet Infrastructure

This directory contains the infrastructure configuration for KEKwallet, including:
- DNS configuration for kekwallet.lordkek.xyz
- SSL certificate management
- Load balancer configuration

## Prerequisites
- Google Cloud CLI authenticated
- Terraform installed

## Usage
```bash
cd infrastructure/gcp
terraform init
terraform plan
terraform apply
```

## Components

### DNS Configuration
- Managed zone: kekwallet-zone
- Domain: lordkek.xyz
- A record: kekwallet.lordkek.xyz -> Load Balancer IP

### SSL Certificate
- Managed SSL certificate for kekwallet.lordkek.xyz
- Auto-renewed by Google Cloud

### Load Balancer
- Global HTTPS load balancer
- SSL termination with managed certificate
- Backend service: kekwallet-backend

## Maintenance

### Updating Infrastructure
1. Make changes to Terraform configurations
2. Run `terraform plan` to review changes
3. Apply changes with `terraform apply`

### Monitoring
- Check SSL certificate status in Google Cloud Console
- Monitor DNS propagation using `dig kekwallet.lordkek.xyz`
- Verify HTTPS access to the domain
