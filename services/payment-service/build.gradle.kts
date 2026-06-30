plugins {
    id("org.springframework.boot")
}

dependencies {
    implementation(project(":shared"))

    // Metrics
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    runtimeOnly("io.micrometer:micrometer-registry-prometheus")
}
