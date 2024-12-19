data "google_dns_managed_zone" "kekwallet" {
  name = "kekwallet"
}

resource "google_dns_record_set" "kekwallet_online" {
  name         = "kekwallet.lordkek.online."
  managed_zone = data.google_dns_managed_zone.kekwallet.name
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_forwarding_rule.kekwallet.ip_address]
}
