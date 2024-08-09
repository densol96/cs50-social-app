package cs.densol.back_end.services;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.util.*;

@Service
public class JwtService {

    private final Integer HOURS_VALID_FOR = 48;
    private final String jwtSecret;

    public JwtService(@Value("${spring.security.jwtSecret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    private Key createKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(createKey())
                .build()
                /*
                 * The method below does the JWT verification and might throw an error:
                 * ExpiredJwtException, UnsupportedJwtException, MalformedJwtException,
                 * SignatureException, IllegalArgumentException;
                 */
                .parseClaimsJws(jwt)
                .getBody();
    }

    public String extractEmail(String jwt) {
        return extractAllClaims(jwt).getSubject();
    }

    public <T> T extractAnyClaim(String jwt, String claimName, Class<T> type) {
        return extractAllClaims(jwt).get(claimName, type);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60L * 60L * HOURS_VALID_FOR))
                .signWith(createKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
}