package com.github.kdudley9.orion.services;

import java.util.Optional;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.github.kdudley9.orion.enums.AuthProvider;
import com.github.kdudley9.orion.models.User;
import com.github.kdudley9.orion.models.UserInfo;
import com.github.kdudley9.orion.repositories.UserRepository;

@Service
public class GoogleOidcUserService extends OidcUserService {
    private final UserRepository userRepository;

    public GoogleOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        try {
            return processOidcUser(userRequest, oidcUser);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OidcUser processOidcUser(OidcUserRequest userRequest, OidcUser oidcUser) {
        UserInfo userInfo = new UserInfo(oidcUser.getAttributes());

        Optional<User> userOptional = userRepository.findByEmail(userInfo.getEmail());
        if (!userOptional.isPresent()) {
            User user = new User();
            user.setId(userInfo.getId());
            user.setEmail(userInfo.getEmail());
            user.setName(userInfo.getName());
            user.setImageUrl(userInfo.getPicture());
            user.setProvider(AuthProvider.GOOGLE);
            userRepository.save(user);
        }

        return oidcUser;
    }
}
