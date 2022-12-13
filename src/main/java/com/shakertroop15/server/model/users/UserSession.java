package com.shakertroop15.server.model.users;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Scope(value="session", proxyMode=ScopedProxyMode.TARGET_CLASS)
@Data
public class UserSession implements Serializable {
   private static final long serialVersionUID = 1L;
   private String userToken;
}
