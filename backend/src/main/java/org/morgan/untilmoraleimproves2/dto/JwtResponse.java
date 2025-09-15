package org.morgan.untilmoraleimproves2.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String userName;

    public JwtResponse(String accessToken, Long id, String userName) {
        this.token = accessToken;
        this.id = id;
        this.userName = userName;
    }

    public String getAccessToken() {
        return token;
    }

    public String getTokenType() {
        return type;
    }
}