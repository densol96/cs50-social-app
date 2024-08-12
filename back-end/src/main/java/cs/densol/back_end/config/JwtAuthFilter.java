package cs.densol.back_end.config;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.lang.NonNullApi;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import cs.densol.back_end.models.User;
import cs.densol.back_end.repo.IUserRepo;
import cs.densol.back_end.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final IUserRepo repo;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // "Bearer " [0:6] => need to cut it off
            String jwt = authHeader.substring(7);

            try {
                // Will throw an error if not valid token
                String email = jwtService.extractEmail(jwt);
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    if (userDetails.isEnabled() && userDetails.isAccountNonLocked()) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        this.markWhenLastActive(email);
                    }

                }
            } catch (Exception e) {
                // JWT is either expired or invalid, simply leave the SecurityContext empty
                System.out.println(
                        "User not authenticated due to -> " + e.getClass().getSimpleName() + ": " + e.getMessage());

            }
        }
        filterChain.doFilter(request, response);
    }

    private void markWhenLastActive(String email) {
        User user = repo.findByEmail(email).get();
        user.setLastActive(LocalDateTime.now());
        repo.save(user);
    }
}