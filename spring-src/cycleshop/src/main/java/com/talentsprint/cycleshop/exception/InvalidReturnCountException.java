package com.talentsprint.cycleshop.exception;

public class InvalidReturnCountException extends RuntimeException {
    public InvalidReturnCountException() {
        super("Invalid return count.");
    }

    public InvalidReturnCountException(String message) {
        super(message);
    }

    public InvalidReturnCountException(String message, Throwable cause) {
        super(message, cause);
    }
}