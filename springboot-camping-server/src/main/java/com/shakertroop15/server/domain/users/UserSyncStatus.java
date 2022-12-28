package com.shakertroop15.server.domain.users;

import lombok.Data;

@Data
public class UserSyncStatus {
    private String message;
    private boolean success;
}
