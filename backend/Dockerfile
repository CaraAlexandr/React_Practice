# Stage 1: Build the application
FROM maven:3.8.1-openjdk-17 AS builder

# Set the working directory
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Copy the source code
COPY src ./src

# Package the application, skipping tests for speed
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy the packaged jar file from the builder stage
COPY --from=builder /app/target/*.jar /app.jar

# Expose port 8080 and 5005 for debugging
EXPOSE 8080
EXPOSE 5005

# Run the application with debugging enabled
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "/app.jar"]
