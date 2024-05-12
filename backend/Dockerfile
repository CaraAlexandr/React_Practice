# Use the official Maven image to build the project
FROM maven:3.8.1-openjdk-17 as builder

# Copy the local code to the container image
WORKDIR /app
COPY pom.xml ./
COPY src ./src

# Perform a clean install, skip tests if necessary
RUN mvn clean install -DskipTests

# Use the official OpenJDK image to run the application
FROM openjdk:17-slim

# Copy the built jar file from the builder stage
COPY --from=builder /app/target/*.jar /app.jar

# Set the container to run the application
ENTRYPOINT ["java", "-jar", "/app.jar"]