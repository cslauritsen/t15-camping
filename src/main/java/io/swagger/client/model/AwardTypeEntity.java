/*
 * API title
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

package io.swagger.client.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.client.model.AchievementEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
/**
 * AwardTypeEntity model
 */
@Schema(description = "AwardTypeEntity model")
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaClientCodegen", date = "2022-12-12T23:02:08.677823-05:00[America/New_York]")
public class AwardTypeEntity {
  @SerializedName("award_type_id")
  private Integer awardTypeId = null;

  @SerializedName("name")
  private String name = null;

  @SerializedName("active_achievements")
  private List<AchievementEntity> activeAchievements = null;

  public AwardTypeEntity awardTypeId(Integer awardTypeId) {
    this.awardTypeId = awardTypeId;
    return this;
  }

   /**
   * ID of the Award Type Record
   * @return awardTypeId
  **/
  @Schema(description = "ID of the Award Type Record")
  public Integer getAwardTypeId() {
    return awardTypeId;
  }

  public void setAwardTypeId(Integer awardTypeId) {
    this.awardTypeId = awardTypeId;
  }

  public AwardTypeEntity name(String name) {
    this.name = name;
    return this;
  }

   /**
   * Name of the Award Type
   * @return name
  **/
  @Schema(description = "Name of the Award Type")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public AwardTypeEntity activeAchievements(List<AchievementEntity> activeAchievements) {
    this.activeAchievements = activeAchievements;
    return this;
  }

  public AwardTypeEntity addActiveAchievementsItem(AchievementEntity activeAchievementsItem) {
    if (this.activeAchievements == null) {
      this.activeAchievements = new ArrayList<AchievementEntity>();
    }
    this.activeAchievements.add(activeAchievementsItem);
    return this;
  }

   /**
   * Array of Achievements for this award type
   * @return activeAchievements
  **/
  @Schema(description = "Array of Achievements for this award type")
  public List<AchievementEntity> getActiveAchievements() {
    return activeAchievements;
  }

  public void setActiveAchievements(List<AchievementEntity> activeAchievements) {
    this.activeAchievements = activeAchievements;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AwardTypeEntity awardTypeEntity = (AwardTypeEntity) o;
    return Objects.equals(this.awardTypeId, awardTypeEntity.awardTypeId) &&
        Objects.equals(this.name, awardTypeEntity.name) &&
        Objects.equals(this.activeAchievements, awardTypeEntity.activeAchievements);
  }

  @Override
  public int hashCode() {
    return Objects.hash(awardTypeId, name, activeAchievements);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AwardTypeEntity {\n");
    
    sb.append("    awardTypeId: ").append(toIndentedString(awardTypeId)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    activeAchievements: ").append(toIndentedString(activeAchievements)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}
