package com.isj.inscription.exception;

public class DuplicateInscriptionException extends RuntimeException {
    public DuplicateInscriptionException(String message) {
        super(message);
    }
}