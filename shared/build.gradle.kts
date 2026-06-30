// The shared module is a plain Java library — it does NOT boot as a Spring app.
// It only provides common entities, DTOs, and exception handlers for other modules.
plugins {
    `java-library`
}

// Disable Spring Boot's fat-jar packaging (this is a library, not a runnable app)
tasks.named<Jar>("jar") {
    archiveBaseName.set("shared")
}
