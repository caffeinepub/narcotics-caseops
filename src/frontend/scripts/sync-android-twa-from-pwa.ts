#!/usr/bin/env node
/**
 * Sync Android TWA manifest from PWA metadata
 * Reads frontend/public/manifest.webmanifest and frontend/index.html
 * to keep frontend/android-twa/twa-manifest.json aligned with PWA branding
 */

import * as fs from 'fs';
import * as path from 'path';

interface PWAManifest {
  name: string;
  short_name: string;
  description?: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  orientation?: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose: string;
  }>;
}

interface TWAManifest {
  packageId: string;
  host: string;
  name: string;
  launcherName: string;
  display: string;
  backgroundColor: string;
  themeColor: string;
  navigationColor: string;
  navigationColorDark: string;
  navigationDividerColor: string;
  navigationDividerColorDark: string;
  orientation: string;
  startUrl: string;
  iconUrl: string;
  maskableIconUrl: string;
  monochromeIconUrl: string;
  splashScreenFadeOutDuration: number;
  signingKey: {
    path: string;
    alias: string;
  };
  appVersionName: string;
  appVersionCode: number;
  shortcuts: any[];
  generatorApp: string;
  webManifestUrl: string;
  fallbackType: string;
  enableNotifications: boolean;
  features: any;
  alphaDependencies: any;
  enableSiteSettingsShortcut: boolean;
  isChromeOSOnly: boolean;
  minSdkVersion: number;
  targetSdkVersion: number;
}

const rootDir = path.resolve(__dirname, '..');
const pwaManifestPath = path.join(rootDir, 'public', 'manifest.webmanifest');
const twaManifestPath = path.join(rootDir, 'android-twa', 'twa-manifest.json');

function syncManifests() {
  console.log('🔄 Syncing Android TWA manifest from PWA metadata...');

  // Read PWA manifest
  if (!fs.existsSync(pwaManifestPath)) {
    console.error(`❌ PWA manifest not found at ${pwaManifestPath}`);
    process.exit(1);
  }

  const pwaManifest: PWAManifest = JSON.parse(
    fs.readFileSync(pwaManifestPath, 'utf-8')
  );

  // Read existing TWA manifest
  if (!fs.existsSync(twaManifestPath)) {
    console.error(`❌ TWA manifest not found at ${twaManifestPath}`);
    process.exit(1);
  }

  const twaManifest: TWAManifest = JSON.parse(
    fs.readFileSync(twaManifestPath, 'utf-8')
  );

  // Find icons
  const icon512 = pwaManifest.icons.find(
    (icon) => icon.sizes === '512x512' && icon.purpose === 'any'
  );
  const maskableIcon = pwaManifest.icons.find(
    (icon) => icon.purpose === 'maskable'
  );

  // Update TWA manifest with PWA values
  twaManifest.name = pwaManifest.name;
  twaManifest.launcherName = pwaManifest.short_name;
  twaManifest.display = pwaManifest.display;
  twaManifest.backgroundColor = pwaManifest.background_color;
  twaManifest.themeColor = pwaManifest.theme_color;
  twaManifest.navigationColor = pwaManifest.background_color;
  twaManifest.navigationColorDark = pwaManifest.background_color;
  twaManifest.navigationDividerColor = pwaManifest.theme_color;
  twaManifest.navigationDividerColorDark = pwaManifest.theme_color;
  twaManifest.orientation = pwaManifest.orientation || 'portrait';
  twaManifest.startUrl = pwaManifest.start_url;

  if (icon512) {
    twaManifest.iconUrl = icon512.src;
    twaManifest.monochromeIconUrl = icon512.src;
  }

  if (maskableIcon) {
    twaManifest.maskableIconUrl = maskableIcon.src;
  }

  // Write updated TWA manifest
  fs.writeFileSync(twaManifestPath, JSON.stringify(twaManifest, null, 2));

  console.log('✅ TWA manifest synced successfully!');
  console.log(`   Name: ${twaManifest.name}`);
  console.log(`   Launcher: ${twaManifest.launcherName}`);
  console.log(`   Theme: ${twaManifest.themeColor}`);
  console.log(`   Background: ${twaManifest.backgroundColor}`);
  console.log(`   Icon: ${twaManifest.iconUrl}`);
  console.log(`   Maskable: ${twaManifest.maskableIconUrl}`);
}

try {
  syncManifests();
} catch (error) {
  console.error('❌ Error syncing manifests:', error);
  process.exit(1);
}
