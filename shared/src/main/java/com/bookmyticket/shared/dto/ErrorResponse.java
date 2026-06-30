package com.bookmyticket.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Map;

/**
 * Standard error response returned by the {@link com.bookmyticket.shared.exception.GlobalExceptionHandler}.
 *
 * @param status     the HTTP status code
 * @param error      the HTTP reason phrase (e.g. "Not Found")
 * @param message    a human-readable error description
 * @param path       the request URI that caused the error
 * @param timestamp  the server time when the error occurred
 * @param details    optional field-level validation errors (omitted when {@code null})
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        int status,
        String error,
        String message,
        String path,
        Instant timestamp,
        Map<String, String> details
) {

    /**
     * Factory without field-level details.
     */
    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path, Instant.now(), null);
    }

    /**
     * Factory with field-level validation details.
     */
    public static ErrorResponse of(int status, String error, String message, String path,
                                   Map<String, String> details) {
        return new ErrorResponse(status, error, message, path, Instant.now(), details);
    }
}
