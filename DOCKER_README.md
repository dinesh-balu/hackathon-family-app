# Docker Setup for React Native Expo App

This project includes Docker configuration to run your React Native Expo app in containers.

## Quick Start

### Web Development (Recommended)
```bash
# Build and run the web version
./docker-run.sh web
```

The app will be available at:
- Web app: http://localhost:19002
- Expo DevTools: http://localhost:19000

### Android Development (Experimental)
```bash
# Build and run with Android emulator
./docker-run.sh android
```

**Note**: Android emulator in Docker requires privileged mode and may not work in all environments.

## Manual Docker Commands

### Web Development
```bash
# Build the image
docker compose build expo-web

# Run the container
docker compose up expo-web

# Run in detached mode
docker compose up -d expo-web
```

### Android Development
```bash
# Build the Android image
docker compose --profile android build expo-android

# Run with Android emulator
docker compose --profile android up expo-android
```

## Available Scripts

- `./docker-run.sh web` - Start web development server
- `./docker-run.sh android` - Start with Android emulator
- `./docker-run.sh build` - Build all Docker images
- `./docker-run.sh clean` - Clean up containers and images

## Ports

- **8081**: Expo development server
- **19000**: Expo DevTools
- **19001**: Expo development tools
- **19002**: Expo web interface
- **5554/5555**: Android emulator (Android setup only)

## Development Workflow

1. **Start the container**: `./docker-run.sh web`
2. **Open your browser**: Navigate to http://localhost:19002
3. **Make changes**: Edit files in your local directory - changes will be reflected immediately
4. **Mobile testing**: Use the Expo Go app on your phone to scan the QR code

## Troubleshooting

### Port Conflicts
If ports are already in use, stop other services or modify the ports in `docker-compose.yml`.

### Android Emulator Issues
The Android emulator setup is experimental and may not work in all Docker environments. For reliable Android development, consider:
- Using the Expo Go app on a physical device
- Running the emulator on your host machine
- Using cloud-based Android emulators

### File Changes Not Reflecting
Make sure the volume mounts are working correctly. The current directory is mounted to `/app` in the container.

## Files

- `Dockerfile` - Web development container
- `Dockerfile.android` - Android development container (experimental)
- `docker-compose.yml` - Docker Compose configuration
- `docker-run.sh` - Helper script for common operations
- `.dockerignore` - Files to exclude from Docker build context