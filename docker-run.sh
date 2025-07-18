#!/bin/bash

# Docker run script for Expo React Native app

case "$1" in
  "web")
    echo "Starting Expo web development server in Docker..."
    docker compose up expo-web
    ;;
  "android")
    echo "Starting Expo with Android emulator in Docker..."
    echo "Note: This requires privileged mode and may not work in all environments"
    docker compose --profile android up expo-android
    ;;
  "build")
    echo "Building Docker images..."
    docker compose build
    ;;
  "clean")
    echo "Cleaning up Docker containers and images..."
    docker compose down
    docker system prune -f
    ;;
  *)
    echo "Usage: $0 {web|android|build|clean}"
    echo ""
    echo "Commands:"
    echo "  web     - Run Expo web development server"
    echo "  android - Run Expo with Android emulator (experimental)"
    echo "  build   - Build Docker images"
    echo "  clean   - Clean up Docker containers and images"
    echo ""
    echo "Examples:"
    echo "  ./docker-run.sh web"
    echo "  ./docker-run.sh android"
    exit 1
    ;;
esac
