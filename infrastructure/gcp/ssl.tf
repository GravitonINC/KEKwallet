resource "google_compute_managed_ssl_certificate" "kekwallet" {
  name = "kekwallet-cert"
  managed {
    domains = [var.domain]
  }
}
