package org.example.backend.security;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtRequestFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String jwt = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            Claims claims = JwtUtil.extractAllClaims(jwt);
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                List<SimpleGrantedAuthority> authorities =
                        ((List<?>) claims.get("authorities")).stream()
                                .map(authority -> new SimpleGrantedAuthority((String) authority))
                                .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        new User("user", "", authorities), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(request, response);
    }
}
