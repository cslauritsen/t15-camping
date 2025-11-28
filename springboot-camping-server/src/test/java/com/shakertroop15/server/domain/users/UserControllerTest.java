package com.shakertroop15.server.domain.users;

import jakarta.servlet.http.HttpSession;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

class UserControllerTest {
    public static MockWebServer mockBackEnd;

    private UserController userController;

    @Mock
    private HttpSession session;

    @Mock
    private UserService userService;
    @Mock
    private UserRepository userRepository;

    AutoCloseable closeable;

    @BeforeEach
    void setUp() throws Exception {
        mockBackEnd = new MockWebServer();
        mockBackEnd.start();
        closeable = MockitoAnnotations.openMocks(this);
        RestClient restClient = RestClient.builder().baseUrl(mockBackEnd.url("/").toString()).build();
        userController = new UserController(userRepository, userService, restClient);
        userController.setBaseUrl(mockBackEnd.url("/").toString());
        userController.setPartnerToken("hello");
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
        mockBackEnd.shutdown();
    }

    @Test
    void login404Returns404() {
        mockBackEnd.enqueue(new MockResponse().setResponseCode(404));
        try {
            userController.login(session, "login", "password");
            fail("expected exception");
        } catch (RestClientResponseException e) {
            assertEquals(404, e.getStatusCode().value());
        }
    }

    @Test
    void login401Returns401() {
        mockBackEnd.enqueue(new MockResponse().setResponseCode(401));
        try {
            userController.login(session, "login", "password");
            fail("expected exception");
        } catch (RestClientResponseException e) {
            assertEquals(401, e.getStatusCode().value());
        }
    }

    @Test
    void getAllUsers() {
    }

    @Test
    void findUserByTtid() {
    }

    @Test
    void updateUserByTtid() {
    }
}