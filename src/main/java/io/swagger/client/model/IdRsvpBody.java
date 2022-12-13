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
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.IOException;
/**
 * IdRsvpBody
 */

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaClientCodegen", date = "2022-12-12T23:02:08.677823-05:00[America/New_York]")
public class IdRsvpBody {
  @SerializedName("user_id")
  private Integer userId = null;

  @SerializedName("status_cd")
  private String statusCd = null;

  @SerializedName("number_of_youth_guests")
  private Integer numberOfYouthGuests = null;

  @SerializedName("number_of_adult_guests")
  private Integer numberOfAdultGuests = null;

  public IdRsvpBody userId(Integer userId) {
    this.userId = userId;
    return this;
  }

   /**
   * ID of the user for whom you are RSVP&#x27;ing. Must be within your scope as a user AND must be invited to the event.
   * @return userId
  **/
  @Schema(required = true, description = "ID of the user for whom you are RSVP'ing. Must be within your scope as a user AND must be invited to the event.")
  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public IdRsvpBody statusCd(String statusCd) {
    this.statusCd = statusCd;
    return this;
  }

   /**
   * yes: Coming. no: Not coming. tbd: No clue.
   * @return statusCd
  **/
  @Schema(required = true, description = "yes: Coming. no: Not coming. tbd: No clue.")
  public String getStatusCd() {
    return statusCd;
  }

  public void setStatusCd(String statusCd) {
    this.statusCd = statusCd;
  }

  public IdRsvpBody numberOfYouthGuests(Integer numberOfYouthGuests) {
    this.numberOfYouthGuests = numberOfYouthGuests;
    return this;
  }

   /**
   * Get numberOfYouthGuests
   * @return numberOfYouthGuests
  **/
  @Schema(description = "")
  public Integer getNumberOfYouthGuests() {
    return numberOfYouthGuests;
  }

  public void setNumberOfYouthGuests(Integer numberOfYouthGuests) {
    this.numberOfYouthGuests = numberOfYouthGuests;
  }

  public IdRsvpBody numberOfAdultGuests(Integer numberOfAdultGuests) {
    this.numberOfAdultGuests = numberOfAdultGuests;
    return this;
  }

   /**
   * Get numberOfAdultGuests
   * @return numberOfAdultGuests
  **/
  @Schema(description = "")
  public Integer getNumberOfAdultGuests() {
    return numberOfAdultGuests;
  }

  public void setNumberOfAdultGuests(Integer numberOfAdultGuests) {
    this.numberOfAdultGuests = numberOfAdultGuests;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    IdRsvpBody idRsvpBody = (IdRsvpBody) o;
    return Objects.equals(this.userId, idRsvpBody.userId) &&
        Objects.equals(this.statusCd, idRsvpBody.statusCd) &&
        Objects.equals(this.numberOfYouthGuests, idRsvpBody.numberOfYouthGuests) &&
        Objects.equals(this.numberOfAdultGuests, idRsvpBody.numberOfAdultGuests);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, statusCd, numberOfYouthGuests, numberOfAdultGuests);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class IdRsvpBody {\n");
    
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    statusCd: ").append(toIndentedString(statusCd)).append("\n");
    sb.append("    numberOfYouthGuests: ").append(toIndentedString(numberOfYouthGuests)).append("\n");
    sb.append("    numberOfAdultGuests: ").append(toIndentedString(numberOfAdultGuests)).append("\n");
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
