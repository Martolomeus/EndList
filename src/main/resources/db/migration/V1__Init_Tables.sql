CREATE TABLE task (
                      id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                      subject      VARCHAR(255) NOT NULL,
                      description  TEXT,
                      completed    BOOLEAN NOT NULL DEFAULT FALSE,
                      completed_at TIMESTAMPTZ
);