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

package io.swagger.client.api;

import io.swagger.client.model.UsersIdBody;
import org.junit.Test;
import org.junit.Ignore;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * API tests for UsersApi
 */
@Ignore
public class UsersApiTest {

    private final UsersApi api = new UsersApi();

    /**
     * 
     *
     * Returns a list of users
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void getV1UsersTest() throws Exception {
        String xPartnerToken = null;
        String xUserToken = null;
        api.getV1Users(xPartnerToken, xUserToken);

        // TODO: test validations
    }
    /**
     * 
     *
     * Returns detailed information about a user
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void getV1UsersIdTest() throws Exception {
        String xPartnerToken = null;
        String xUserToken = null;
        Integer id = null;
        api.getV1UsersId(xPartnerToken, xUserToken, id);

        // TODO: test validations
    }
    /**
     * 
     *
     * Update detailed information about a user
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void postV1UsersIdTest() throws Exception {
        String xPartnerToken = null;
        String xUserToken = null;
        Integer id = null;
        UsersIdBody body = null;
        api.postV1UsersId(xPartnerToken, xUserToken, id, body);

        // TODO: test validations
    }
}
