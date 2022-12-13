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

import io.swagger.client.model.PhotoAlbumEntity;
import io.swagger.client.model.PhotoAlbumsIdBody;
import org.junit.Test;
import org.junit.Ignore;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * API tests for PhotoAlbumsApi
 */
@Ignore
public class PhotoAlbumsApiTest {

    private final PhotoAlbumsApi api = new PhotoAlbumsApi();

    /**
     * 
     *
     * Returns a list of photo albums relevant to the user. Photos are not returned on this endpoint.
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void getV1PhotoAlbumsTest() throws Exception {
        String xPartnerToken = null;
        String xUserToken = null;
        PhotoAlbumEntity response = api.getV1PhotoAlbums(xPartnerToken, xUserToken);

        // TODO: test validations
    }
    /**
     * 
     *
     * Returns detailed information about a photo album, including photos
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void getV1PhotoAlbumsIdTest() throws Exception {
        String xPartnerToken = null;
        String xUserToken = null;
        String id = null;
        PhotoAlbumEntity response = api.getV1PhotoAlbumsId(xPartnerToken, xUserToken, id);

        // TODO: test validations
    }
    /**
     * 
     *
     * Upload a new photo to a photo album
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void postV1PhotoAlbumsIdTest() throws Exception {
        PhotoAlbumsIdBody body = null;
        String xPartnerToken = null;
        String xUserToken = null;
        String id = null;
        PhotoAlbumEntity response = api.postV1PhotoAlbumsId(body, xPartnerToken, xUserToken, id);

        // TODO: test validations
    }
}
