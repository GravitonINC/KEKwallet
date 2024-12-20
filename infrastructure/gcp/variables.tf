variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
  default     = "lordkekwallet-prod"
}

variable "region" {
  description = "The region to deploy resources to"
  type        = string
  default     = "us-central1"
}

variable "domain" {
  description = "The domain name for the application"
  type        = string
  default     = "kekwallet.lordkek.xyz"
}
