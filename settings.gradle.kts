rootProject.name = "BookMyTicket"

// --- Shared Library ---
include("shared")

// --- API Gateway ---
include("gateway")

// --- Microservices ---
include("services:user-service")
include("services:event-service")
include("services:inventory-service")
include("services:booking-service")
include("services:payment-service")
include("services:notification-service")
