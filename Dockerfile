# ---- Build stage: compile the jar with the Maven wrapper ----
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
# The cache mount keeps downloaded Maven dependencies between builds.
# Tests are skipped because they need a running database.
RUN --mount=type=cache,target=/root/.m2 ./mvnw -q package -DskipTests

# ---- Run stage: only a JRE and the jar ----
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
