<script setup>
import { ref } from 'vue'

// Product categories
const categories = ref(['Tous', 'Vêtements', 'Accessoires', 'Livres', 'Affiches'])
const selectedCategory = ref('Tous')

// Products
const products = ref([
  {
    id: 1,
    name: 'T-Shirt Radical Prospérité',
    description: 'T-shirt officiel avec le logo du parti.',
    price: 25.00,
    category: 'Vêtements',
    image: null,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  {
    id: 2,
    name: 'Casquette Tricolore',
    description: 'Casquette aux couleurs de la France.',
    price: 18.00,
    category: 'Accessoires',
    image: null,
    inStock: true
  },
  {
    id: 3,
    name: 'Sweat à Capuche',
    description: 'Sweat confortable avec broderie du logo.',
    price: 45.00,
    category: 'Vêtements',
    image: null,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 4,
    name: 'Pin\'s Officiel',
    description: 'Pin\'s émaillé avec le logo du parti.',
    price: 8.00,
    category: 'Accessoires',
    image: null,
    inStock: true
  },
  {
    id: 5,
    name: 'Manifeste de la Prospérité',
    description: 'Livre fondateur présentant notre vision politique.',
    price: 15.00,
    category: 'Livres',
    image: null,
    inStock: true
  },
  {
    id: 6,
    name: 'Affiche "Liberté"',
    description: 'Affiche de propagande artistique, format A2.',
    price: 12.00,
    category: 'Affiches',
    image: null,
    inStock: false
  },
  {
    id: 7,
    name: 'Mug Tricolore',
    description: 'Mug en céramique avec citation inspirante.',
    price: 14.00,
    category: 'Accessoires',
    image: null,
    inStock: true
  },
  {
    id: 8,
    name: 'Drapeau du Parti',
    description: 'Drapeau officiel, 150x90cm.',
    price: 35.00,
    category: 'Accessoires',
    image: null,
    inStock: true
  }
])

// Filtered products
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

// Cart (simplified)
const cart = ref([])

const addToCart = (product) => {
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<template>
  <main class="main-content min-h-screen pb-24">
    <div class="content-container">
      <!-- Page Header -->
      <section class="page-header mb-12 text-center">
        <div class="header-badge inline-block px-4 py-2 rounded-full mb-4 text-sm font-medium">
          <FontAwesomeIcon icon="fa-solid fa-store" class="mr-2" />
          Boutique Officielle
        </div>
        <h1 class="page-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Magasin
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Soutenez le mouvement en portant fièrement nos couleurs
        </p>
      </section>

      <!-- Cart Summary -->
      <section class="cart-summary mb-8">
        <div class="cart-bar rp-card p-4 rounded-xl flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="cart-icon-wrapper p-3 rounded-full">
              <FontAwesomeIcon icon="fa-solid fa-shopping-cart" class="text-xl" />
            </div>
            <div>
              <span class="font-bold">{{ cartCount }}</span> article(s) dans le panier
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-lg font-bold">{{ cartTotal.toFixed(2) }} €</span>
            <button class="checkout-btn rp-btn-primary px-6 py-2 rounded-lg font-semibold" :disabled="cartCount === 0">
              Commander
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="ml-2" />
            </button>
          </div>
        </div>
      </section>

      <!-- Category Filter -->
      <section class="filter-section mb-8">
        <div class="flex flex-wrap justify-center gap-2">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            class="filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all"
            :class="{ 'active rp-btn-primary': selectedCategory === cat }"
          >
            {{ cat }}
          </button>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="products-section mb-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card rp-card rounded-xl overflow-hidden">
            <!-- Product Image Placeholder -->
            <div class="product-image aspect-square flex items-center justify-center">
              <FontAwesomeIcon 
                :icon="product.category === 'Vêtements' ? 'fa-solid fa-shirt' : 
                       product.category === 'Livres' ? 'fa-solid fa-book' :
                       product.category === 'Affiches' ? 'fa-solid fa-image' :
                       'fa-solid fa-gift'" 
                class="text-5xl opacity-30" 
              />
            </div>
            
            <!-- Product Info -->
            <div class="product-info p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-bold text-lg">{{ product.name }}</h3>
                <span v-if="!product.inStock" class="out-of-stock-badge px-2 py-0.5 rounded text-xs">
                  Rupture
                </span>
              </div>
              <p class="text-sm opacity-70 mb-3">{{ product.description }}</p>
              
              <!-- Sizes if applicable -->
              <div v-if="product.sizes" class="sizes mb-3">
                <span class="text-xs opacity-50 block mb-1">Tailles:</span>
                <div class="flex gap-1">
                  <span v-for="size in product.sizes" :key="size" class="size-tag px-2 py-0.5 rounded text-xs">
                    {{ size }}
                  </span>
                </div>
              </div>
              
              <div class="flex items-center justify-between mt-4">
                <span class="price text-xl font-bold">{{ product.price.toFixed(2) }} €</span>
                <button 
                  @click="addToCart(product)"
                  class="add-btn rp-btn-primary px-4 py-2 rounded-lg text-sm font-semibold"
                  :disabled="!product.inStock"
                >
                  <FontAwesomeIcon icon="fa-solid fa-cart-plus" class="mr-1" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="info-card rp-card p-5 rounded-xl text-center">
          <div class="info-icon icon-gradient mb-3">
            <FontAwesomeIcon icon="fa-solid fa-truck" class="text-3xl" />
          </div>
          <h3 class="font-bold mb-2">Livraison Gratuite</h3>
          <p class="text-sm opacity-70">À partir de 50€ d'achat en France métropolitaine</p>
        </div>
        
        <div class="info-card rp-card p-5 rounded-xl text-center">
          <div class="info-icon icon-gradient mb-3">
            <FontAwesomeIcon icon="fa-solid fa-shield-check" class="text-3xl" />
          </div>
          <h3 class="font-bold mb-2">Paiement Sécurisé</h3>
          <p class="text-sm opacity-70">Vos transactions sont 100% sécurisées</p>
        </div>
        
        <div class="info-card rp-card p-5 rounded-xl text-center">
          <div class="info-icon icon-gradient mb-3">
            <FontAwesomeIcon icon="fa-solid fa-rotate-left" class="text-3xl" />
          </div>
          <h3 class="font-bold mb-2">Retours Faciles</h3>
          <p class="text-sm opacity-70">30 jours pour changer d'avis</p>
        </div>
      </section>

      <!-- Support Note -->
      <section class="support-section rp-section p-6 rounded-2xl text-center">
        <FontAwesomeIcon icon="fa-solid fa-heart" class="text-3xl mb-4" style="color: #c8102e" />
        <h2 class="text-xl font-bold mb-2">Vos achats soutiennent notre cause</h2>
        <p class="text-sm opacity-70 max-w-xl mx-auto">
          100% des bénéfices de la boutique sont réinvestis dans les actions du parti. 
          En achetant nos produits, vous contribuez directement à la construction d'une France prospère.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* Hierarchical Depth Design Tokens */
:root {
  /* Level 0: Base (page-background) */
  --shadow-level-0: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* Level 1: Main Blocks (sections) */
  --shadow-level-1: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  --shadow-level-1-inner: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Level 2: Cards/Items inside sections */
  --shadow-level-2: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  --shadow-level-2-inner: inset 0 2px 4px rgba(0, 0, 0, 0.08);

  /* Level 3: Buttons/Clickables (Highest) */
  --shadow-level-3: 
    0 12px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  --shadow-level-3-hover: 
    0 15px 35px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.dark {
  --shadow-level-0: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-level-1: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  --shadow-level-1-inner: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-level-2: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  --shadow-level-2-inner: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-level-3: 
    0 12px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  --shadow-level-3-hover: 
    0 15px 35px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-shadow: var(--shadow-level-0);
  border-radius: var(--radius-2xl);
  background: rgba(128, 128, 128, 0.03);
}

@media (min-width: 640px) {
  .content-container {
    padding: 2rem;
  }
}

/* Cart Bar - Level 1 */
.cart-bar {
  box-shadow: var(--shadow-level-1);
}

/* Filter Button - Level 2/3 */
.filter-btn {
  box-shadow: var(--shadow-level-2);
  transition: all 0.3s ease;
}

.filter-btn:hover {
  box-shadow: var(--shadow-level-3);
  transform: translateY(-2px);
}

.filter-btn.active {
  box-shadow: var(--shadow-level-3);
}

/* Product Card - Level 2 */
.product-card {
  box-shadow: var(--shadow-level-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-level-3);
}

/* Info Card - Level 2 */
.info-card {
  box-shadow: var(--shadow-level-2);
}

/* Support Section - Level 1 */
.support-section {
  box-shadow: var(--shadow-level-1);
}

/* Checkout Button - Level 3 */
.checkout-btn {
  box-shadow: var(--shadow-level-3);
}

.checkout-btn:hover:not(:disabled) {
  box-shadow: var(--shadow-level-3-hover);
}

/* Add Button - Level 3 */
.add-btn {
  box-shadow: var(--shadow-level-3);
}

.add-btn:hover:not(:disabled) {
  box-shadow: var(--shadow-level-3-hover);
}

/* Cart icon wrapper (page-specific) */
.cart-icon-wrapper {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  color: white;
}

.dark .cart-icon-wrapper {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
}

/* Filter buttons: non-active state (page-specific) */
.filter-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 51, 153, 0.2);
  color: var(--text-light);
}

.dark .filter-btn {
  background: rgba(30, 30, 45, 0.9);
  border-color: rgba(77, 127, 191, 0.2);
  color: var(--text-dark);
}

.filter-btn:hover {
  border-color: rgba(200, 16, 46, 0.5);
}

.dark .filter-btn:hover {
  border-color: rgba(255, 77, 109, 0.5);
}

.filter-btn.active {
  border-color: transparent;
}

/* Product image placeholder background */
.product-image {
  background: linear-gradient(135deg, rgba(0, 51, 153, 0.05) 0%, rgba(200, 16, 46, 0.05) 100%);
}

.dark .product-image {
  background: linear-gradient(135deg, rgba(77, 127, 191, 0.1) 0%, rgba(255, 77, 109, 0.1) 100%);
}

/* Out-of-stock badge */
.out-of-stock-badge {
  background: #c8102e;
  color: white;
}

/* Size tags */
.size-tag {
  background: rgba(0, 51, 153, 0.1);
  border: 1px solid rgba(0, 51, 153, 0.2);
}

.dark .size-tag {
  background: rgba(77, 127, 191, 0.1);
  border-color: rgba(77, 127, 191, 0.2);
}

/* Price gradient text */
.price {
  background: linear-gradient(135deg, #003399 0%, #c8102e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .price {
  background: linear-gradient(135deg, #4d7fbf 0%, #ff4d6d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Add-to-cart button: scale on hover (page-specific tweak) */
.add-btn:hover:not(:disabled) {
  transform: scale(1.05);
}
</style>
