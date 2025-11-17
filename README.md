# @tanquealo/shared
Shared types, schemas, and utilities for the Tanquealo platform.

## Installation
 
### Backend (Node.js)
 
```bash
# Set up authentication for GitHub Packages
echo "@tanquealo:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc

# Install
yarn add @tanquealo/shared

```

 

### Mobile (React Native)

```bash

# Install

yarn add @tanquealo/shared

```

## Usage

### Domain-Specific Imports (Recommended)

```typescript

// Auth types and schemas
import { User, registerSchema, JWTPayload } from '@tanquealo/shared/auth';

// Station types and schemas
import { GasStation, createStationSchema, StationType } from '@tanquealo/shared/station';

// API types
import { APIResponse, PaginationMeta } from '@tanquealo/shared/api';
```
### Flat Imports

```typescript

import { User, GasStation, APIResponse } from '@tanquealo/shared';

```
### Namespace Imports
 
```typescript

import * as Auth from '@tanquealo/shared/auth';

import * as Station from '@tanquealo/shared/station';

const user: Auth.User = { ... };

const station: Station.GasStation = { ... };

```

## What's Included

### Auth Domain (`@tanquealo/shared/auth`)

- **Types**: `User`, `AuthResponse`, `JWTPayload`, etc.

- **Schemas**: `registerSchema`, `loginSchema`, `verifyCodeSchema`, etc.


- **Type Guards**: Express Request augmentation

### Station Domain (`@tanquealo/shared/station`)

- **Types**: `GasStation`, `StationType`, `FuelType`, `StationStatus`, etc.

- **Schemas**: `createStationSchema`, `updateStationSchema`, `nearbyStationsSchema`, etc.

 

### API Domain (`@tanquealo/shared/api`)

- **Types**: `APIResponse`, `PaginationMeta`, `ErrorResponse`

 

## Development
```bash

# Install dependencies
yarn install

# Build
yarn build

# Watch mode
yarn watch

# Clean
yarn clean

```
## Publishing

```bash
# Bump version
npm version patch  # or minor, major
# Publish to GitHub Packages
npm publish
```

## License
ISC