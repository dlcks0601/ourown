/**
 * Application Constants
 *
 * This file centralizes all constants used across the application.
 * Import from this file instead of defining constants in individual files.
 */

// Google OAuth Constants
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/auth/google`;
export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const VERIFY_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/auth/google/verify`;

// Environment Constants
export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const APP_SCHEME = process.env.EXPO_PUBLIC_SCHEME;

// Kakao OAuth Constants
export const KAKAO_NATIVE_APP_KEY = process.env.KAKAO_NATIVE_APP_KEY;
