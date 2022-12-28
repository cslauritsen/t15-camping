package com.shakertroop15.server.domain.users;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("users")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class User {
    @Id
    private String userId;
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

    // Troop-15-specific fields
    private boolean annualFee = false;
    private boolean active = true;
    private boolean deleted = false;
    
    public static void map(User src, User dest) {
        dest.userId = src.userId;
        dest.firstName = src.firstName;
        dest.lastName = src.lastName;
        dest.middleName = src.middleName;
        dest.email = src.email;
        dest.cellPhone = src.cellPhone;
        dest.homePhone = src.homePhone;
        dest.workPhone = src.workPhone;
        dest.gender = src.gender;
        dest.scout = src.scout;
        dest.employer = src.employer;
        dest.occupation = src.occupation;
        dest.maritalStatus = src.maritalStatus;
        dest.currentPosition = src.currentPosition;
        dest.currentRank = src.currentRank;
        dest.currentRankTracker = src.currentRankTracker;
        dest.currentRankTrackerPercentComplete = src.currentRankTrackerPercentComplete;
        dest.avatar = src.avatar;
        dest.patrol = src.patrol;
//    dest.patrolId = src.patrolId;
        dest.troopNumber = src.troopNumber;
        dest.bornOn = src.bornOn;

        // Troop-15-specific fields
        dest.active = src.active;
        dest.annualFee  = src.annualFee;
        dest.deleted = src.deleted;
    }

    public User copy() {
        User user = new User();
        map(this, user);
        return user;
    }
}
