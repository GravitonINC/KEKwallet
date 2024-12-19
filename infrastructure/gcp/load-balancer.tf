resource "google_compute_global_forwarding_rule" "kekwallet" {
  name                  = "kekwallet-https-forwarding-rule"
  target                = google_compute_target_https_proxy.kekwallet.id
  port_range           = "443"
  load_balancing_scheme = "EXTERNAL_MANAGED"
}

resource "google_compute_target_https_proxy" "kekwallet" {
  name             = "kekwallet-https-proxy"
  url_map          = google_compute_url_map.kekwallet.id
  ssl_certificates = [google_compute_managed_ssl_certificate.kekwallet.id]
}

resource "google_compute_url_map" "kekwallet" {
  name            = "kekwallet-url-map"
  default_service = google_compute_backend_service.kekwallet.id
}

resource "google_compute_backend_service" "kekwallet" {
  name                  = "kekwallet-backend"
  protocol              = "HTTP"
  port_name             = "http"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  timeout_sec           = 30
  health_checks        = [google_compute_health_check.kekwallet.id]

  backend {
    group = google_compute_instance_group.kekwallet.id
    balancing_mode = "UTILIZATION"
    capacity_scaler = 1.0
  }
}

resource "google_compute_health_check" "kekwallet" {
  name               = "kekwallet-health-check"
  check_interval_sec = 5
  timeout_sec        = 5
  healthy_threshold  = 2
  unhealthy_threshold = 10

  http_health_check {
    port = 80
  }
}

resource "google_compute_instance_group" "kekwallet" {
  name        = "kekwallet-instance-group"
  description = "KEKwallet application instance group"
  zone        = "${var.region}-a"

  named_port {
    name = "http"
    port = 80
  }
}
