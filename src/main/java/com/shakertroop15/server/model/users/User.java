package com.shakertroop15.server.model.users;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("users")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class User {
    @Id
    private String userId;
    private Long ttid;
    private Boolean annualFee;
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String cellPhone;
    private String homePhone;
    private String workPhone;
    private String gender;
    private Boolean scout;
    private String employer;
    private String occupation;
    private String maritalStatus;
    private String currentPosition;
    private String currentRank;
    private String currentRankTracker;
    private String currentRankTrackerPercentComplete;
    private String avatar;
    private String patrol;
//    private Long patrolId;
    private String troopNumber;
    private String bornOn;
}
