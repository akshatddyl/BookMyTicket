package com.bookmyticket.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

/**
 * Standard API response envelope used by all microservices.
 *
 * @param <T>       the type of the response payload
 * @param success   whether the request was successful
 * @param message   a human-readable status message
 * @param data      the response payload (omitted from JSON when {@code null})
 * @param timestamp the server time when the response was generated
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResponseWrapper<T>(
        boolean success,
        String message,
        T data,
        Instant timestamp
) {

    /**
     * Factory for successful responses with data.
     */
    public static <T> ResponseWrapper<T> success(String message, T data) {
        return new ResponseWrapper<>(true, message, data, Instant.now());
    }

    /**
     * Factory for successful responses without data.
     */
    public static <T> ResponseWrapper<T> success(String message) {
        return new ResponseWrapper<>(true, message, null, Instant.now());
    }

    /**
     * Factory for failure responses (no data payload).
     */
    public static <T> ResponseWrapper<T> failure(String message) {
        return new ResponseWrapper<>(false, message, null, Instant.now());
    }
}
