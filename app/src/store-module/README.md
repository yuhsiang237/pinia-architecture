# Store Module

A well-structured Pinia store implementation using multiple design patterns for maintainability, testability, and separation of concerns.

## Directory Structure

```
store-module/
├── stores/              # Pinia stores (state management)
├── store-services/      # Service layer (business logic)
├── interfaces/          # TypeScript interfaces
└── index.ts            # Barrel export
```

## Design Patterns

| Pattern | Purpose | Implementation |
|---------|---------|----------------|
| **Service Layer** | Separates state management from business logic | Services wrap stores and provide business methods |
| **Singleton** | Single instance per service | `export const authService = new AuthService()` |
| **Lazy Initialization** | Prevents Pinia initialization errors | Use getter: `private get authStore() { return useAuthStore() }` |
| **Facade** | Simplified interface to stores | Services provide high-level methods like `hasRole()`, `isAuthenticated()` |
| **Barrel Export** | Centralized exports | `index.ts` exports all services and types |

## Key Benefits

- **Separation of Concerns**: State (stores) vs logic (services)
- **Testability**: Services can be unit tested independently
- **Maintainability**: Clear structure and single responsibility
- **Type Safety**: Full TypeScript support
- **Reusability**: Services work across the entire app

## Usage Examples

```typescript
import { authService, userService } from '@/store-module'
import type { User } from '@/store-module'

// Authentication
authService.login('jwt-token', ['admin', 'user'])
authService.isAuthenticated() // true
authService.hasRole('admin') // true
authService.logout()

// User Management
userService.setUser({ id: '123', name: 'John', email: 'john@example.com' })
userService.updateUserName('Jane')
const user = userService.getCurrentUser()
userService.clearUser()
```

## Adding New Stores

Follow these steps:

1. Create interface in `interfaces/` (if needed)
2. Create store in `stores/` (state + actions)
3. Create service in `store-services/` (business logic)
4. Export from `index.ts`

**Example structure:**

```typescript
// 1. interfaces/product.interface.ts
export interface Product { id: string; name: string; price: number }

// 2. stores/product.store.ts
export const useProductStore = defineStore('product', {
  state: () => ({ products: [] as Product[] }),
  actions: { addProduct(product: Product) { this.products.push(product) } }
})

// 3. store-services/product.store.service.ts
export class ProductService {
  private get productStore() { return useProductStore() }
  addProduct(product: Product) { this.productStore.addProduct(product) }
  getProducts(): Product[] { return this.productStore.products }
}
export const productService = new ProductService()

// 4. index.ts
export type { Product } from './interfaces/product.interface'
export { productService } from './store-services/product.store.service'
```

## Best Practices

- Keep stores simple (state + basic actions only)
- Put business logic in services
- Use TypeScript interfaces
- Naming: `use[Name]Store`, `[name]Service`, `[Name]` interface
- Components interact with services, not stores directly

## Testing

```typescript
import { authService } from '@/store-module'
import { setActivePinia, createPinia } from 'pinia'

describe('AuthService', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('should login user', () => {
    authService.login('token', ['admin'])
    expect(authService.isAuthenticated()).toBe(true)
  })
})
```
