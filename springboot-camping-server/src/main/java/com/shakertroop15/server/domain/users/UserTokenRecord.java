package com.shakertroop15.server.domain.users;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.List;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserTokenRecord {
    private String token;
    private Long userId;
    private String troop;
    private String troopId;
    private String troopType;
    private String cacheScope;
    private String troopNumber;
    private Long troopTypeId;
    private List<String> privileges;

//     "token": "string",
//             "user_id": 0,
//             "troop": "string",
//             "troop_id": 0,
//             "cache_scope": "string",
//             "troop_number": "string",
//             "troop_type": "string",
//             "troop_type_id": 0,
//             "privileges": [
//             "string"
//             ]
}
