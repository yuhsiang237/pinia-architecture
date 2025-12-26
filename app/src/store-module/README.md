# Store Module

Pinia store architecture with Service Layer pattern and Dependency Injection for testing.

## Overview

This module separates state management into layers:
- **Stores**: State containers (Pinia stores)
- **Services**: Business logic layer
- **Composables**: Singleton service instances
- **Interfaces**: Type definitions

## Directory Structure

```
store-module/
├── stores/              # Pinia stores
├── store-services/      # Service layer
│   └── __tests__/      # Unit tests
├── composables/         # Singleton providers
│   └── index.ts        # Barrel export
├── interfaces/          # TypeScript types
└── index.ts            # Public API
```

## Design Patterns

- **Service Layer** - Business logic separated from state
- **Dependency Injection** - Mock stores in tests via constructor
- **Singleton** - Single service instance via composables
- **Type Safety** - Auto-inferred types using `ReturnType`
- **Barrel Exports** - Clean imports via `index.ts`

## Usage

```vue
<script setup lang="ts">
import { useAuthService, useUserService, type User } from '@/store-module'

// Get singleton instances
const authService = useAuthService()
const userService = useUserService()

// Call service methods
authService.login('token', ['admin'])
userService.setUser({ id: '1', name: 'John', email: 'john@example.com' })

// Reactive computed
const isAuthenticated = computed(() => authService.isAuthenticated())
const currentUser = computed(() => userService.getCurrentUser())
</script>
```

## Adding a New Store

### 1. Define Interface

```typescript
// interfaces/product.interface.ts
export interface Product {
  id: string
  name: string
  price: number
}
```

### 2. Create Store Type

```typescript
// interfaces/product-store.interface.ts
import { useProductStore } from '../stores/product.store'

export type ProductStoreType = ReturnType<typeof useProductStore>
```

### 3. Create Pinia Store

```typescript
// stores/product.store.ts
import { defineStore } from 'pinia'
import type { Product } from '../interfaces/product.interface'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    addProduct(product: Product) {
      this.products.push(product)
    },
  },
})
```

### 4. Create Service

```typescript
// store-services/product.store.service.ts
import { useProductStore } from '../stores/product.store'
import type { ProductStoreType } from '../interfaces/product-store.interface'
import type { Product } from '../interfaces/product.interface'

export class ProductService {
  private productStore: ProductStoreType

  constructor(productStore?: ProductStoreType) {
    this.productStore = productStore ?? useProductStore()
  }

  addProduct(product: Product): void {
    this.productStore.addProduct(product)
  }

  getProducts(): Product[] {
    return this.productStore.products
  }
}
```

### 5. Create Composable

```typescript
// composables/useProductService.ts
import { ProductService } from '../store-services/product.store.service'

let instance: ProductService | undefined

export function useProductService(): ProductService {
  if (!instance) {
    instance = new ProductService()
  }
  return instance
}
```

### 6. Add to Composables Export

```typescript
// composables/index.ts
export { useAuthService } from './useAuthService'
export { useUserService } from './useUserService'
export { useProductService } from './useProductService'
```

### 7. Export from Module Root

```typescript
// index.ts
export type { User } from './interfaces/user.interface'
export type { Product } from './interfaces/product.interface'
export type { ProductStoreType } from './interfaces/product-store.interface'

export { ProductService } from './store-services/product.store.service'
export { useProductService } from './composables/useProductService'
```

## Testing

```typescript
// store-services/__tests__/product.store.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ProductService } from '../product.store.service'
import type { ProductStoreType } from '../../interfaces/product-store.interface'

describe('ProductService', () => {
  let mockStore: ProductStoreType
  let service: ProductService

  beforeEach(() => {
    mockStore = {
      products: [],
      addProduct: vi.fn((product) => {
        mockStore.products.push(product)
      }),
    } as any

    service = new ProductService(mockStore)
  })

  it('adds product to store', () => {
    const product = { id: '1', name: 'Laptop', price: 1000 }

    service.addProduct(product)

    expect(mockStore.addProduct).toHaveBeenCalledWith(product)
    expect(mockStore.products).toContain(product)
  })
})
```

**Benefits:**
- No Pinia setup needed
- Fast execution
- Easy mocking
- Isolated tests

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Store | `use[Name]Store` | `useAuthStore` |
| Service | `[Name]Service` | `AuthService` |
| Composable | `use[Name]Service` | `useAuthService` |
| Store Type | `[Name]StoreType` | `AuthStoreType` |

## Best Practices

### ✅ Do
- Use composables in components: `useAuthService()`
- Keep stores simple (state + basic mutations only)
- Put business logic in services
- Inject mock stores in tests

### ❌ Don't
- Use stores directly in components
- Create service instances in components: `new AuthService()`
- Put complex logic in stores
- Create circular dependencies between services

## Architecture Benefits

1. **Testability** - Test services without Vue/Pinia setup
2. **Separation of Concerns** - Clear layer boundaries
3. **Type Safety** - Full TypeScript support
4. **Scalability** - Consistent patterns for growth
5. **Maintainability** - Centralized business logic
