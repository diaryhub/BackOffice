# 1단계: 프론트엔드 빌드
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# 2단계: 백엔드 빌드
FROM gradle:8.14-jdk17 AS backend-build
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts ./
COPY src/ src/
COPY --from=frontend-build /app/frontend/dist src/main/resources/static
RUN gradle bootJar --no-daemon

# 3단계: 실행
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
