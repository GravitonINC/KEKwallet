resource "google_dns_managed_zone" "kekwallet" {
  name        = "kekwallet-zone"
  dns_name    = "lordkek.xyz."
  description = "DNS zone for KEKwallet application"
}

resource "google_dns_record_set" "kekwallet" {
  name         = "kekwallet.lordkek.xyz."
  managed_zone = google_dns_managed_zone.kekwallet.name
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_forwarding_rule.kekwallet.ip_address]
}
