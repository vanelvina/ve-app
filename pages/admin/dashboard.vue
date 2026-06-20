<template>
  <div class="min-h-screen bg-warm-ivory/50 flex flex-col lg:flex-row font-ui">
    <!-- 1. RESPONSIVE SIDEBAR -->
    <aside class="w-full lg:w-72 shrink-0 bg-deep-plum text-white lg:sticky lg:top-0 lg:h-screen flex flex-col shadow-premium z-30 transition-all duration-300">
      <!-- Sidebar Brand & Pattern Overlay -->
      <div class="p-6 border-b border-white/10 relative overflow-hidden shrink-0">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.03] pointer-events-none" />
        <h1 class="text-2xl font-serif text-white font-bold tracking-wide">Van Elvina</h1>
        <p class="text-[10px] text-rose-blush/60 uppercase tracking-[0.2em] font-semibold mt-1">Store Console</p>
      </div>

      <!-- Navigation Tabs -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 group border"
          :class="activeTab === tab.id
            ? 'bg-rose-blush text-deep-plum border-white/20 shadow-md scale-[1.02]'
            : 'bg-transparent text-white/80 hover:bg-white/10 border-transparent hover:text-white'"
        >
          <div class="flex items-center gap-3.5">
            <span class="text-lg transition-transform group-hover:scale-110">{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
          </div>
          <!-- Tiny counts indicator -->
          <span 
            v-if="tab.id === 'products' && products.length"
            class="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold"
          >
            {{ products.length }}
          </span>
          <span 
            v-else-if="tab.id === 'widgets' && widgets.length"
            class="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold"
          >
            {{ widgets.length }}
          </span>
        </button>
      </nav>

      <!-- Sidebar Footer (Admin profile info) -->
      <div class="p-4 border-t border-white/10 shrink-0 bg-black/10">
        <div class="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-rose-blush text-deep-plum font-bold flex items-center justify-center text-xs shadow-soft">
              AD
            </div>
            <div>
              <p class="text-xs font-bold text-white">Administrator</p>
              <p class="text-[9px] text-white/50">Level: Root</p>
            </div>
          </div>
          <button @click="handleLogout" class="p-1.5 hover:bg-white/15 rounded-lg text-white/70 hover:text-white transition-colors" title="Sign Out">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- 2. MAIN CONTAINER -->
    <main class="flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">
      
      <!-- Top header bar -->
      <header class="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-charcoal/20 shadow-soft">
        <div>
          <h2 class="text-xl font-bold text-deep-plum font-serif">Storefront Management</h2>
          <p class="text-xs text-charcoal/60 mt-0.5">Welcome back, admin. Monitor system states, banners, widgets, and dynamic catalog models.</p>
        </div>
        
        <!-- Live status chips panel -->
        <div class="flex flex-wrap items-center gap-3.5 text-xs font-semibold">
          <div class="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Server: Connected
          </div>
          <div v-if="lowStockProductsCount" class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">
            ⚠️ {{ lowStockProductsCount }} items low stock
          </div>
        </div>
      </header>

      <!-- TAB 1: OVERVIEW -->
      <section v-if="activeTab === 'overview'" class="space-y-8 animate-fade-in">
        <!-- Dashboard executive analytics grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Total Products Widget -->
          <div class="bg-white p-5 rounded-2xl border border-charcoal/20 shadow-soft flex items-center justify-between">
            <div class="space-y-2">
              <span class="text-2xl" title="Products">🛍️</span>
              <p class="text-2xl font-bold text-deep-plum font-serif">{{ products.length }}</p>
              <p class="text-[10px] uppercase tracking-wider text-charcoal/50">Total Products</p>
            </div>
            <!-- SVG Progress dial -->
            <div class="w-12 h-12 relative flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#FAF0F1" stroke-width="4" fill="transparent" />
                <circle cx="24" cy="24" r="20" stroke="#8A4F5A" stroke-width="4" fill="transparent" :stroke-dasharray="125" :stroke-dashoffset="125 - (125 * Math.min(products.length, 100)) / 100" />
              </svg>
              <span class="absolute text-[9px] font-bold text-deep-plum">{{ Math.min(products.length, 100) }}%</span>
            </div>
          </div>

          <!-- Total Categories Widget -->
          <div class="bg-white p-5 rounded-2xl border border-charcoal/20 shadow-soft flex items-center justify-between">
            <div class="space-y-2">
              <span class="text-2xl" title="Categories">🗂️</span>
              <p class="text-2xl font-bold text-deep-plum font-serif">{{ categories.length }}</p>
              <p class="text-[10px] uppercase tracking-wider text-charcoal/50">Product Categories</p>
            </div>
            <!-- SVG Progress dial -->
            <div class="w-12 h-12 relative flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#FAF0F1" stroke-width="4" fill="transparent" />
                <circle cx="24" cy="24" r="20" stroke="#C5A58E" stroke-width="4" fill="transparent" :stroke-dasharray="125" :stroke-dashoffset="125 - (125 * Math.min(categories.length, 10)) / 10" />
              </svg>
              <span class="absolute text-[9px] font-bold text-soft-gold">{{ categories.length }}</span>
            </div>
          </div>

          <!-- Low stock Inventory Widget -->
          <div class="bg-white p-5 rounded-2xl border border-charcoal/20 shadow-soft flex items-center justify-between" :class="{'border-amber-200 bg-amber-50/10': lowStockProductsCount}">
            <div class="space-y-2">
              <span class="text-2xl" title="Low stock items">⚠️</span>
              <p class="text-2xl font-bold text-deep-plum font-serif">{{ lowStockProductsCount }}</p>
              <p class="text-[10px] uppercase tracking-wider text-charcoal/50">Low stock Alert</p>
            </div>
            <div class="text-right text-[10px]">
              <span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold uppercase" v-if="lowStockProductsCount">Action Needed</span>
              <span class="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold uppercase" v-else>All Stocked</span>
            </div>
          </div>

          <!-- Active Homepage widgets Widget -->
          <div class="bg-white p-5 rounded-2xl border border-charcoal/20 shadow-soft flex items-center justify-between">
            <div class="space-y-2">
              <span class="text-2xl" title="Widgets active">⚙️</span>
              <p class="text-2xl font-bold text-deep-plum font-serif">{{ enabledWidgetsCount }} <span class="text-xs text-charcoal/40 font-sans">/ {{ widgets.length }}</span></p>
              <p class="text-[10px] uppercase tracking-wider text-charcoal/50">Active Widgets</p>
            </div>
            <!-- SVG Progress dial -->
            <div class="w-12 h-12 relative flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#FAF0F1" stroke-width="4" fill="transparent" />
                <circle cx="24" cy="24" r="20" stroke="#B76E79" stroke-width="4" fill="transparent" :stroke-dasharray="125" :stroke-dashoffset="125 - (125 * (widgets.length ? enabledWidgetsCount / widgets.length : 0))" />
              </svg>
              <span class="absolute text-[8px] font-bold text-dusty-rose">{{ widgets.length ? Math.round((enabledWidgetsCount/widgets.length)*100) : 0 }}%</span>
            </div>
          </div>
        </div>

        <!-- Catalog details / action grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Low Inventory Items Panel (BA Tool) -->
          <div class="bg-white p-6 rounded-2xl border border-charcoal/20 shadow-soft space-y-4 lg:col-span-2">
            <div class="flex items-center justify-between">
              <h3 class="font-serif text-base font-bold text-deep-plum">Inventory Stock Alert Panel</h3>
              <span class="text-[10px] text-charcoal/50">Filters items with &lt;= 5 stock</span>
            </div>
            
            <div v-if="lowStockProducts.length === 0" class="p-8 text-center text-xs text-charcoal/40 border border-dashed border-rose-blush/50 rounded-xl">
              No product stock warnings found. All storefront items are sufficiently supplied.
            </div>
            <div v-else class="space-y-2 max-h-[220px] overflow-y-auto">
              <div v-for="item in lowStockProducts" :key="item._id" class="flex items-center justify-between p-3 bg-rose-blush/20 hover:bg-rose-blush/40 rounded-xl transition-all text-xs border border-rose-blush/10">
                <div class="flex items-center gap-2.5">
                  <img :src="item.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/150'" class="w-8 h-8 object-cover rounded bg-white shadow-soft" />
                  <div>
                    <p class="font-semibold text-charcoal">{{ item.name }}</p>
                    <p class="text-[9px] text-charcoal/50 uppercase">{{ item.category }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-mono font-bold text-amber-700">{{ item.stockCount }} Left</p>
                  <p class="text-[9px]" :class="item.inStock ? 'text-green-600' : 'text-red-500'">{{ item.inStock ? 'Visible' : 'Hidden' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Action Workflows (PO Tool) -->
          <div class="bg-white p-6 rounded-2xl border border-charcoal/20 shadow-soft space-y-4">
            <h3 class="font-serif text-base font-bold text-deep-plum">Executive Quick Actions</h3>
            <div class="space-y-2">
              <button @click="activeTab = 'products'; openProductModal(null)" class="w-full flex items-center justify-between p-3.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded-xl font-semibold text-xs transition-all shadow-soft group">
                <span>Add Store Product</span>
                <span class="text-sm transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button @click="activeTab = 'widgets'; openWidgetModal(null)" class="w-full flex items-center justify-between p-3.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded-xl font-semibold text-xs transition-all shadow-soft group">
                <span>Create Homepage Widget</span>
                <span class="text-sm transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button @click="activeTab = 'banners'; openBannerModal(null)" class="w-full flex items-center justify-between p-3.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded-xl font-semibold text-xs transition-all shadow-soft group">
                <span>Add Banner Slide</span>
                <span class="text-sm transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button @click="activeTab = 'categories'; openCategoryModal(null)" class="w-full flex items-center justify-between p-3.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded-xl font-semibold text-xs transition-all shadow-soft group">
                <span>Add Category Slug</span>
                <span class="text-sm transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dashboard User Tips -->
        <div class="bg-white border border-rose-blush rounded-2xl p-6 relative overflow-hidden shadow-soft">
          <div class="absolute inset-0.5 rounded-[14px] border border-dashed border-rose-blush/60 pointer-events-none" />
          <h4 class="font-serif font-bold text-deep-plum text-sm mb-3">Dashboard Administration Instructions</h4>
          <ul class="text-xs text-charcoal/80 space-y-2 list-disc pl-4 font-sans leading-relaxed">
            <li>Update hero promotional imagery in the <strong>Banners Carousel</strong> configuration panel.</li>
            <li>Define main navigation anchors and custom dropdown subcategories inside the <strong>Categories</strong> selector.</li>
            <li>Configure new apparel lines, variant colors, custom size grids, pricing values, and photos within the <strong>Products</strong> page.</li>
            <li>Reorder layout nodes, enable/disable elements, or customize promo content parameters in the <strong>Widgets &amp; Layout</strong> portal.</li>
          </ul>
        </div>
      </section>

      <!-- TAB 2: BANNERS -->
      <section v-if="activeTab === 'banners'" class="space-y-4 animate-fade-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="relative w-full md:max-w-xs shadow-soft rounded-xl">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal/40">🔍</span>
            <input v-model="searchQueries.banners" placeholder="Search banners..." class="w-full pl-9 pr-4 py-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum" />
          </div>
          <button @click="openBannerModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium transition-all self-end md:self-auto">
            + Add Slide Banner
          </button>
        </div>

        <div class="bg-white border border-charcoal/20 rounded-2xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/30 font-semibold">
                  <th class="p-4">Visual Preview</th>
                  <th class="p-4">Mobile Asset</th>
                  <th class="p-4">Heading Content</th>
                  <th class="p-4">CTA Target Link</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-rose-blush/10">
                <tr v-if="filteredBanners.length === 0">
                  <td colspan="5" class="p-8 text-center text-xs text-charcoal/45 italic">No banners match search criteria.</td>
                </tr>
                <tr v-for="banner in filteredBanners" :key="banner._id" class="hover:bg-warm-ivory/20 transition-colors">
                  <td class="p-4">
                    <img :src="banner.image" class="w-32 h-14 object-cover rounded-xl shadow-soft bg-warm-ivory hover:scale-105 transition-transform duration-200" />
                  </td>
                  <td class="p-4">
                    <img v-if="banner.imageMobile" :src="banner.imageMobile" class="w-14 h-14 object-cover rounded-xl shadow-soft bg-warm-ivory hover:scale-105 transition-transform duration-200" />
                    <span v-else class="text-[10px] text-charcoal/40 bg-charcoal/5 px-2 py-1 rounded">No Mobile Image</span>
                  </td>
                  <td class="p-4">
                    <p class="font-bold text-charcoal">{{ banner.title || 'Untitled Banner' }}</p>
                    <p class="text-[10px] text-charcoal/50 mt-0.5">{{ banner.subtitle || 'No Subtitle' }}</p>
                  </td>
                  <td class="p-4 text-charcoal font-semibold">{{ banner.ctaLink }}</td>
                  <td class="p-4 text-right">
                    <div class="inline-flex rounded-lg shadow-soft border border-rose-blush overflow-hidden bg-white">
                      <button @click="openBannerModal(banner)" class="px-3 py-1.5 text-[11px] font-bold text-deep-plum hover:bg-rose-blush/30 transition-colors border-r border-rose-blush">Edit</button>
                      <button @click="deleteBannerItem(banner._id)" class="px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 3: CATEGORIES -->
      <section v-if="activeTab === 'categories'" class="space-y-4 animate-fade-in">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="relative w-full md:max-w-xs shadow-soft rounded-xl">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal/40">🔍</span>
            <input v-model="searchQueries.categories" placeholder="Search categories..." class="w-full pl-9 pr-4 py-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum" />
          </div>
          <button @click="openCategoryModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium transition-all self-end md:self-auto">
            + Add Category
          </button>
        </div>

        <div class="bg-white border border-charcoal/20 rounded-2xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/30 font-semibold">
                  <th class="p-4">Cover Image</th>
                  <th class="p-4">Category Name</th>
                  <th class="p-4">URL Slug</th>
                  <th class="p-4">Subcategories Nodes</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-rose-blush/10">
                <tr v-if="filteredCategories.length === 0">
                  <td colspan="5" class="p-8 text-center text-xs text-charcoal/45 italic">No categories matching search query.</td>
                </tr>
                <tr v-for="cat in filteredCategories" :key="cat._id" class="hover:bg-warm-ivory/20 transition-colors">
                  <td class="p-4">
                    <img :src="cat.image" class="w-12 h-12 object-cover rounded-xl shadow-soft bg-warm-ivory hover:scale-105 transition-transform duration-200" />
                  </td>
                  <td class="p-4">
                    <p class="font-bold text-charcoal">{{ cat.name }}</p>
                    <p class="text-[9px] text-charcoal/50 leading-relaxed max-w-xs truncate" v-if="cat.description">{{ cat.description }}</p>
                  </td>
                  <td class="p-4 font-mono text-dusty-rose font-semibold bg-rose-blush/25 px-2 py-1 rounded inline-block mt-3 text-[10px]">{{ cat.slug }}</td>
                  <td class="p-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-if="!cat.subcategories?.length" class="text-[10px] text-charcoal/40">None configured</span>
                      <span v-for="sub in cat.subcategories" :key="sub.slug" class="px-2 py-0.5 bg-rose-blush text-deep-plum border border-rose-blush rounded-md text-[9px] font-semibold">
                        {{ sub.name }}
                      </span>
                    </div>
                  </td>
                  <td class="p-4 text-right">
                    <div class="inline-flex rounded-lg shadow-soft border border-rose-blush overflow-hidden bg-white">
                      <button @click="openCategoryModal(cat)" class="px-3 py-1.5 text-[11px] font-bold text-deep-plum hover:bg-rose-blush/30 transition-colors border-r border-rose-blush">Edit</button>
                      <button @click="deleteCategoryItem(cat._id)" class="px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 4: PRODUCTS -->
      <section v-if="activeTab === 'products'" class="space-y-4 animate-fade-in">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <!-- Search Queries, filters, selectors -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:max-w-2xl">
            <div class="relative shadow-soft rounded-xl w-full">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal/40">🔍</span>
              <input v-model="searchQueries.products" placeholder="Search products..." class="w-full pl-9 pr-4 py-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum" />
            </div>
            
            <select v-model="productFilterCategory" class="w-full p-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum shadow-soft">
              <option value="">-- All Categories --</option>
              <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
            </select>

            <select v-model="productFilterStock" class="w-full p-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum shadow-soft">
              <option value="all">-- All Stocks Status --</option>
              <option value="instock">In Stock (&gt; 5)</option>
              <option value="lowstock">Low Stock (&lt;= 5)</option>
              <option value="outofstock">Out of Stock (0)</option>
            </select>
          </div>
          
          <button @click="openProductModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium transition-all shrink-0 self-end lg:self-auto">
            + Add Product Item
          </button>
        </div>

        <div class="bg-white border border-charcoal/20 rounded-2xl shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/30 font-semibold">
                  <th class="p-4">Thumbnail</th>
                  <th class="p-4">Item Name / Category</th>
                  <th class="p-4">Price (INR)</th>
                  <th class="p-4">Warehouse Stock</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-rose-blush/10">
                <tr v-if="filteredProducts.length === 0">
                  <td colspan="5" class="p-8 text-center text-xs text-charcoal/45 italic">No products found matching filters.</td>
                </tr>
                <tr v-for="product in filteredProducts" :key="product._id" class="hover:bg-warm-ivory/20 transition-colors">
                  <td class="p-4">
                    <img :src="product.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/150'" class="w-11 h-11 object-cover rounded-xl shadow-soft bg-warm-ivory hover:scale-110 transition-transform duration-200" />
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-2">
                      <p class="font-bold text-charcoal text-sm">{{ product.name }}</p>
                      <!-- Product badge details -->
                      <span v-if="product.badge" class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-rose-blush text-deep-plum border border-rose-blush">
                        {{ product.badge }}
                      </span>
                    </div>
                    <p class="text-[10px] text-charcoal/50 mt-0.5 font-semibold">
                      {{ product.category }} <span v-if="product.subcategory">› {{ product.subcategory }}</span>
                    </p>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-1.5">
                      <span class="font-bold text-deep-plum text-sm">₹{{ product.price }}</span>
                      <span class="text-charcoal/40 line-through text-[10px]" v-if="product.originalPrice">₹{{ product.originalPrice }}</span>
                      <span v-if="product.discount" class="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">{{ product.discount }}% OFF</span>
                    </div>
                  </td>
                  <td class="p-4">
                    <div class="flex items-center gap-1.5">
                      <span 
                        class="w-2.5 h-2.5 rounded-full"
                        :class="!product.inStock || product.stockCount === 0 ? 'bg-red-500' : product.stockCount <= 5 ? 'bg-amber-500' : 'bg-green-500'"
                      ></span>
                      <span class="font-semibold text-charcoal">
                        {{ !product.inStock || product.stockCount === 0 ? 'Out of stock' : product.stockCount <= 5 ? `Low Stock (${product.stockCount})` : `In Stock (${product.stockCount})` }}
                      </span>
                    </div>
                  </td>
                  <td class="p-4 text-right">
                    <div class="inline-flex rounded-lg shadow-soft border border-rose-blush overflow-hidden bg-white">
                      <button @click="openProductModal(product)" class="px-3 py-1.5 text-[11px] font-bold text-deep-plum hover:bg-rose-blush/30 transition-colors border-r border-rose-blush">Edit</button>
                      <button @click="deleteProductItem(product._id)" class="px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- TAB 5: WIDGET LAYOUT -->
      <section v-if="activeTab === 'widgets'" class="space-y-4 animate-fade-in">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:max-w-md">
            <div class="relative shadow-soft rounded-xl w-full">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal/40">🔍</span>
              <input v-model="searchQueries.widgets" placeholder="Search widgets..." class="w-full pl-9 pr-4 py-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum" />
            </div>
            
            <select v-model="widgetFilterType" class="w-full p-2 border border-charcoal/20 bg-white rounded-xl text-xs focus:outline-none focus:border-deep-plum shadow-soft">
              <option value="all">-- All Types --</option>
              <option value="system">System Section</option>
              <option value="banner">Banner Image</option>
              <option value="editorial">Editorial Page</option>
              <option value="promo-grid">Promo Grid</option>
              <option value="countdown-banner">Countdown</option>
              <option value="flexible-grid">Flexible Photo Grid</option>
              <option value="square-grid">Square Pack Grid</option>
              <option value="shoppers-talk">Shoppers Talk Reviews</option>
            </select>
          </div>

          <button @click="openWidgetModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium transition-all shrink-0 self-end sm:self-auto">
            + Create Custom Widget
          </button>
        </div>

        <div class="space-y-3.5">
          <div
            v-for="(widget, index) in filteredWidgets"
            :key="widget._id"
            class="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-rose-blush/35 rounded-2xl shadow-soft hover:shadow-card hover:border-rose-blush/60 transition-all gap-4"
          >
            <div class="flex items-start gap-4">
              <!-- Reorder Sorting Controls -->
              <div class="flex flex-col gap-1 shrink-0 pt-0.5">
                <button 
                  @click="moveWidget(index, 'up')" 
                  :disabled="index === 0" 
                  class="w-7 h-7 flex items-center justify-center bg-rose-blush hover:bg-deep-plum hover:text-white rounded-lg text-deep-plum disabled:opacity-20 transition-all font-bold"
                  title="Move Up"
                >
                  ▲
                </button>
                <button 
                  @click="moveWidget(index, 'down')" 
                  :disabled="index === widgets.length - 1" 
                  class="w-7 h-7 flex items-center justify-center bg-rose-blush hover:bg-deep-plum hover:text-white rounded-lg text-deep-plum disabled:opacity-20 transition-all font-bold"
                  title="Move Down"
                >
                  ▼
                </button>
              </div>

              <!-- Info details -->
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="font-bold text-deep-plum text-sm leading-tight">{{ widget.name }}</p>
                  <span class="px-2 py-0.5 bg-rose-blush text-deep-plum rounded-full text-[9px] uppercase font-bold tracking-wider border border-charcoal/20">
                    {{ widget.type }}
                  </span>
                  <span class="px-1.5 py-0.5 bg-charcoal/10 text-charcoal/70 rounded text-[9px] font-mono">
                    Pos: {{ widget.position || index + 1 }}
                  </span>
                </div>
                <p class="text-xs text-charcoal/60" v-if="widget.title">Title: {{ widget.title }}</p>
                <p class="text-[10px] text-charcoal/45 font-mono">Section Key: {{ widget.key }}</p>
              </div>
            </div>

            <!-- Enable toggle / edit features actions -->
            <div class="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 border-rose-blush/10 pt-3 md:pt-0">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider">Status:</span>
                <!-- Custom Slide Toggle Switch -->
                <button
                  @click="toggleWidgetStatus(widget)"
                  class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="widget.enabled ? 'bg-green-600' : 'bg-gray-200'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-soft ring-0 transition duration-200 ease-in-out"
                    :class="widget.enabled ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>

              <div class="inline-flex rounded-lg shadow-soft border border-rose-blush overflow-hidden bg-white">
                <button @click="openWidgetModal(widget)" class="px-3 py-1.5 text-[11px] font-bold text-deep-plum hover:bg-rose-blush/30 transition-colors border-r border-rose-blush">Configure</button>
                <button v-if="widget.type !== 'system'" @click="deleteWidgetItem(widget._id)" class="px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- 3. BANNER MODAL -->
    <div v-if="bannerModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-charcoal/20 shadow-modal space-y-5 relative">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />
        
        <div class="relative z-10 flex items-center justify-between border-b border-rose-blush/10 pb-3">
          <h3 class="text-base font-serif text-deep-plum font-bold">{{ bannerModal.isEdit ? 'Edit Banner Slide' : 'Add Banner Slide' }}</h3>
          <button @click="bannerModal.show = false" class="text-charcoal/45 hover:text-deep-plum text-sm">✕</button>
        </div>

        <form @submit.prevent="saveBannerItem" class="space-y-4 text-xs font-ui relative z-10">
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Heading Slide Title</label>
            <input v-model="bannerModal.form.title" type="text" placeholder="e.g. Pure Cotton Bralettes" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Sub-heading Description</label>
            <input v-model="bannerModal.form.subtitle" type="text" placeholder="e.g. Seamless comfort on hot days" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Text Alignment</label>
              <select v-model="bannerModal.form.align" class="w-full p-2.5 border border-charcoal/20 rounded-xl">
                <option value="left">Left Aligned</option>
                <option value="center">Centered</option>
                <option value="right">Right Aligned</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Text Color Variant</label>
              <select v-model="bannerModal.form.textColor" class="w-full p-2.5 border border-charcoal/20 rounded-xl">
                <option value="light">Light (White text)</option>
                <option value="dark">Dark (Plum text)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Desktop Banner Image URL *</label>
            <div class="flex gap-2">
              <!-- Mini Image Preview -->
              <div class="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-warm-ivory border border-rose-blush flex items-center justify-center shadow-soft">
                <img v-if="bannerModal.form.image" :src="bannerModal.form.image" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-charcoal/40">No preview</span>
              </div>
              <input v-model="bannerModal.form.image" type="text" placeholder="https://example.com/image.jpg" required class="flex-1 p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <p class="text-[9px] text-charcoal/40 mt-1">Sizing standard: 1400x600 pixels (landscape ratio) recommended.</p>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Mobile Banner Image URL</label>
            <div class="flex gap-2">
              <!-- Mini Image Preview -->
              <div class="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-warm-ivory border border-rose-blush flex items-center justify-center shadow-soft">
                <img v-if="bannerModal.form.imageMobile" :src="bannerModal.form.imageMobile" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-charcoal/40">No preview</span>
              </div>
              <input v-model="bannerModal.form.imageMobile" type="text" placeholder="https://example.com/image-mobile.jpg" class="flex-1 p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <p class="text-[9px] text-charcoal/40 mt-1">Sizing standard: 800x800 pixels (square ratio) recommended.</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Action Button Text</label>
              <input v-model="bannerModal.form.cta" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" placeholder="Shop Now" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">CTA Destination Link *</label>
              <input v-model="bannerModal.form.ctaLink" type="text" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" placeholder="/products" />
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-rose-blush/10">
            <button type="button" @click="bannerModal.show = false" class="px-4 py-2 border border-charcoal/20 rounded-xl text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded-xl shadow-premium">Save Banner</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. CATEGORY MODAL -->
    <div v-if="categoryModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-charcoal/20 shadow-modal space-y-5 relative">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />
        
        <div class="relative z-10 flex items-center justify-between border-b border-rose-blush/10 pb-3">
          <h3 class="text-base font-serif text-deep-plum font-bold">{{ categoryModal.isEdit ? 'Edit Category' : 'Create Category' }}</h3>
          <button @click="categoryModal.show = false" class="text-charcoal/45 hover:text-deep-plum text-sm">✕</button>
        </div>

        <form @submit.prevent="saveCategoryItem" class="space-y-4 text-xs font-ui relative z-10">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Category Name *</label>
              <input v-model="categoryModal.form.name" type="text" required placeholder="e.g. Bras" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">URL Slug *</label>
              <input v-model="categoryModal.form.slug" type="text" required placeholder="e.g. bras" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Description</label>
            <textarea v-model="categoryModal.form.description" rows="2" placeholder="Describe the category comfort traits..." class="w-full p-2.5 border border-charcoal/20 rounded-xl"></textarea>
          </div>
          
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Category Cover Image URL *</label>
            <div class="flex gap-2">
              <div class="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-warm-ivory border border-rose-blush flex items-center justify-center shadow-soft">
                <img v-if="categoryModal.form.image" :src="categoryModal.form.image" class="w-full h-full object-cover" />
                <span v-else class="text-[10px] text-charcoal/40">No preview</span>
              </div>
              <input v-model="categoryModal.form.image" type="text" required placeholder="https://example.com/cat.jpg" class="flex-1 p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>

          <div class="border-t border-rose-blush/10 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum text-xs">Subcategories Nodes</label>
              <button type="button" @click="addSubcategoryField" class="text-deep-plum font-bold hover:underline">+ Add Subcategory</button>
            </div>
            
            <div v-if="!categoryModal.form.subcategories?.length" class="p-4 text-center text-[10px] text-charcoal/45 italic bg-rose-blush/10 rounded-xl border border-charcoal/20">
              No subcategory configured. Category is flat.
            </div>
            
            <div class="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              <div v-for="(sub, idx) in categoryModal.form.subcategories" :key="idx" class="flex gap-2 items-center bg-rose-blush/10 p-2 rounded-xl border border-charcoal/20">
                <input v-model="sub.name" placeholder="Name (e.g. Push-Up)" required class="flex-1 p-2 border border-charcoal/20 rounded-lg" />
                <input v-model="sub.slug" placeholder="Slug (e.g. push-up)" required class="flex-1 p-2 border border-charcoal/20 rounded-lg" />
                <button type="button" @click="categoryModal.form.subcategories.splice(idx, 1)" class="text-red-500 hover:text-red-700 text-xs font-bold px-1.5">✕</button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-rose-blush/10">
            <button type="button" @click="categoryModal.show = false" class="px-4 py-2 border border-charcoal/20 rounded-xl text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded-xl shadow-premium">Save Category</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 5. PRODUCT MODAL (SECTIONED TABS) -->
    <div v-if="productModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] border border-charcoal/20 shadow-modal space-y-4 relative">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />
        
        <div class="relative z-10 flex items-center justify-between border-b border-rose-blush/10 pb-2">
          <h3 class="text-base font-serif text-deep-plum font-bold">{{ productModal.isEdit ? 'Edit Product Item' : 'Create Store Product' }}</h3>
          <button @click="productModal.show = false" class="text-charcoal/45 hover:text-deep-plum text-sm">✕</button>
        </div>

        <!-- Inner Tabs Selector -->
        <div class="flex border-b border-rose-blush/20 text-xs relative z-10">
          <button 
            type="button" 
            @click="productFormTab = 'general'" 
            class="px-4 py-2 font-bold focus:outline-none transition-colors border-b-2"
            :class="productFormTab === 'general' ? 'border-deep-plum text-deep-plum' : 'border-transparent text-charcoal/60 hover:text-deep-plum'"
          >
            General Specs
          </button>
          <button 
            type="button" 
            @click="productFormTab = 'pricing'" 
            class="px-4 py-2 font-bold focus:outline-none transition-colors border-b-2"
            :class="productFormTab === 'pricing' ? 'border-deep-plum text-deep-plum' : 'border-transparent text-charcoal/60 hover:text-deep-plum'"
          >
            Pricing &amp; Inventory
          </button>
          <button 
            type="button" 
            @click="productFormTab = 'variants'" 
            class="px-4 py-2 font-bold focus:outline-none transition-colors border-b-2"
            :class="productFormTab === 'variants' ? 'border-deep-plum text-deep-plum' : 'border-transparent text-charcoal/60 hover:text-deep-plum'"
          >
            Color Variants
          </button>
        </div>

        <form @submit.prevent="saveProductItem" class="space-y-4 text-xs font-ui relative z-10">
          
          <!-- TAB A: GENERAL -->
          <div v-show="productFormTab === 'general'" class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Product Name *</label>
                <input v-model="productModal.form.name" type="text" required placeholder="e.g. Everyday Comfort Bralette" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Url Slug *</label>
                <input v-model="productModal.form.slug" type="text" required placeholder="e.g. everyday-comfort-bralette" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Primary Category *</label>
                <select v-model="productModal.form.category" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" @change="onProductCategoryChange">
                  <option value="">-- Select Category --</option>
                  <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Secondary Subcategory</label>
                <select v-model="productModal.form.subcategory" class="w-full p-2.5 border border-charcoal/20 rounded-xl">
                  <option value="">-- None --</option>
                  <option v-for="sub in selectedCategorySubcategories" :key="sub.slug" :value="sub.name">{{ sub.name }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Fabric Details</label>
                <input v-model="productModal.form.fabric" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" placeholder="e.g. 90% organic modal cotton, 10% lycra" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Special Badge Indicator</label>
                <select v-model="productModal.form.badge" class="w-full p-2.5 border border-charcoal/20 rounded-xl">
                  <option :value="null">-- None --</option>
                  <option value="new">New</option>
                  <option value="bestseller">Best Seller</option>
                  <option value="sale">Sale</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Product Description</label>
              <textarea v-model="productModal.form.description" rows="3" placeholder="Describe fit, padding options, and texture qualities..." class="w-full p-2.5 border border-charcoal/20 rounded-xl"></textarea>
            </div>
          </div>

          <!-- TAB B: PRICING & INVENTORY -->
          <div v-show="productFormTab === 'pricing'" class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Retail Selling Price (INR) *</label>
                <input v-model.number="productModal.form.price" type="number" required placeholder="e.g. 899" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">M.R.P Original Price (INR) *</label>
                <input v-model.number="productModal.form.originalPrice" type="number" required placeholder="e.g. 1299" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Delivery Promise Days</label>
                <input v-model.number="productModal.form.deliveryDays" type="number" placeholder="e.g. 3" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Warehouse stock count</label>
                <input v-model.number="productModal.form.stockCount" type="number" placeholder="e.g. 25" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div class="pt-5 flex items-center justify-start sm:justify-center">
                <span class="text-charcoal/70 font-semibold mr-2">Visible (In Stock):</span>
                <!-- Custom Slide Toggle Switch -->
                <button
                  type="button"
                  @click="productModal.form.inStock = !productModal.form.inStock"
                  class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="productModal.form.inStock ? 'bg-green-600' : 'bg-gray-200'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-soft ring-0 transition duration-200 ease-in-out"
                    :class="productModal.form.inStock ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- TAB C: DYNAMIC VARIANTS -->
          <div v-show="productFormTab === 'variants'" class="space-y-4 animate-fade-in">
            <div class="flex items-center justify-between border-b border-rose-blush/10 pb-2">
              <p class="font-bold text-deep-plum">Product Colors &amp; Asset URLs</p>
              <button type="button" @click="addProductVariant" class="px-2.5 py-1 bg-rose-blush text-deep-plum rounded-lg text-[10px] font-bold border border-rose-blush hover:bg-deep-plum hover:text-white transition-all">+ Add Color Variant</button>
            </div>

            <div v-if="!productModal.form.variants?.length" class="p-6 text-center text-xs text-charcoal/45 italic bg-rose-blush/10 rounded-xl border border-charcoal/20">
              No variant mapped. Add at least one color variant to list product.
            </div>

            <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              <div v-for="(v, vIdx) in productModal.form.variants" :key="vIdx" class="bg-warm-ivory p-3.5 rounded-2xl border border-charcoal/20 space-y-3 relative">
                <button type="button" @click="productModal.form.variants.splice(vIdx, 1)" class="absolute top-2.5 right-2.5 text-red-500 hover:text-red-700 text-xs font-bold">Remove</button>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-charcoal/50 font-bold mb-1">Color Title (e.g. Classic Black)</label>
                    <input v-model="v.color" required placeholder="Color Name" class="w-full p-2 border border-charcoal/20 rounded-lg text-xs bg-white" />
                  </div>
                  <div>
                    <label class="block text-charcoal/50 font-bold mb-1">Color Palette HEX (e.g. #000000)</label>
                    <div class="flex gap-2">
                      <input v-model="v.colorHex" type="color" class="w-8 h-8 rounded border border-charcoal/20 cursor-pointer" />
                      <input v-model="v.colorHex" placeholder="#Hex" class="flex-1 p-2 border border-charcoal/20 rounded-lg text-xs bg-white font-mono" />
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-charcoal/50 font-bold mb-1">Sizes (Comma separated tags, e.g. S, M, L or 32B, 34B)</label>
                  <input :value="v.sizes.join(', ')" @input="v.sizes = ($event.target as HTMLInputElement).value.split(',').map(s => s.trim())" placeholder="S, M, L" class="w-full p-2 border border-charcoal/20 rounded-lg text-xs bg-white" />
                </div>

                <div class="border-t border-rose-blush/10 pt-2.5">
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-charcoal/50 font-bold">Photo URLs (List)</label>
                    <button type="button" @click="v.images.push('')" class="text-deep-plum font-bold text-[9px] hover:underline">+ Add Image URL</button>
                  </div>
                  <div class="space-y-2">
                    <div v-for="(_, imgIdx) in v.images" :key="imgIdx" class="flex gap-2 items-center">
                      <!-- Mini Asset Preview -->
                      <div class="w-8 h-8 shrink-0 rounded bg-white border border-rose-blush flex items-center justify-center overflow-hidden shadow-soft">
                        <img v-if="v.images[imgIdx]" :src="v.images[imgIdx]" class="w-full h-full object-cover" />
                        <span v-else class="text-[8px] text-charcoal/30">Null</span>
                      </div>
                      <input v-model="v.images[imgIdx]" placeholder="https://example.com/color-pic.jpg" class="flex-1 p-2 border border-charcoal/20 rounded-lg text-xs bg-white" />
                      <button type="button" @click="v.images.splice(imgIdx, 1)" class="text-red-500 text-xs">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-rose-blush/10">
            <button type="button" @click="productModal.show = false" class="px-4 py-2 border border-charcoal/20 rounded-xl text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded-xl shadow-premium">Save Product Specs</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 6. WIDGET CONFIGURATION MODAL (CONTEXTUAL FIELDS) -->
    <div v-if="widgetModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-3xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-charcoal/20 shadow-modal space-y-4 relative">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />
        
        <div class="relative z-10 flex items-center justify-between border-b border-rose-blush/10 pb-3">
          <h3 class="text-base font-serif text-deep-plum font-bold">Configure: {{ widgetModal.form.name || 'Widget Setup' }}</h3>
          <button @click="widgetModal.show = false" class="text-charcoal/45 hover:text-deep-plum text-sm">✕</button>
        </div>

        <form @submit.prevent="saveWidgetConfig" class="space-y-4 text-xs font-ui relative z-10">
          
          <div v-if="widgetModal.isNew" class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Widget Name *</label>
              <input v-model="widgetModal.form.name" type="text" required placeholder="e.g. Summer Promo Grid" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Unique Key *</label>
              <input v-model="widgetModal.form.key" type="text" required placeholder="e.g. summer-grid" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>
          
          <div v-if="widgetModal.isNew">
            <label class="block font-semibold mb-1 text-charcoal/70">Widget Layout Type *</label>
            <select v-model="widgetModal.form.type" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" @change="onWidgetTypeChange">
              <option value="banner">Banner (Promo full-width)</option>
              <option value="editorial">Editorial (Side Text + Image)</option>
              <option value="html">Custom HTML Code</option>
              <option value="promo-grid">Promo Cards Grid (1-3 Columns)</option>
              <option value="collection-tabs">Collections Tabs Switcher</option>
              <option value="fit-calculator">Perfect Sizing Calculator</option>
              <option value="offers-slider">Saver Combo Combos Slider</option>
              <option value="countdown-banner">Sale Countdown Timer Banner</option>
              <option value="image-only">Plain Image Banner (No overlay text)</option>
              <option value="vertical-carousel">Autoplay Vertical Carousel</option>
              <option value="3-set-carousel">3 Image Showcase Set</option>
              <option value="heading-banner">Section Banner with Heading</option>
              <option value="flexible-grid">Flexible Multi Grid</option>
              <option value="square-grid">Centered Square Grid Icons</option>
              <option value="shoppers-talk">Shoppers Talk Reviews Grid</option>
            </select>
          </div>

          <!-- Position Dial & Margins Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-rose-blush/20 border border-charcoal/20 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <label class="block font-bold text-deep-plum">Home Order Position</label>
                <p class="text-[9px] text-charcoal/50 mt-0.5">Sequential rendering order value</p>
              </div>
              <input
                v-model.number="widgetModal.form.position"
                type="number"
                min="1"
                class="w-12 p-2 border border-charcoal/20 rounded-lg font-mono font-bold text-center bg-white"
              />
            </div>
            
            <div class="bg-rose-blush/20 border border-charcoal/20 rounded-2xl p-3">
              <label class="block font-bold text-deep-plum mb-1.5">Margins (Spacing toggles)</label>
              <div class="grid grid-cols-4 gap-1.5">
                <button type="button" @click="widgetModal.form.margins.top = !widgetModal.form.margins.top" class="p-1 border rounded text-[9px] font-bold" :class="widgetModal.form.margins.top ? 'bg-deep-plum text-white border-deep-plum':'bg-white text-charcoal/60 border-rose-blush/30'">Top</button>
                <button type="button" @click="widgetModal.form.margins.bottom = !widgetModal.form.margins.bottom" class="p-1 border rounded text-[9px] font-bold" :class="widgetModal.form.margins.bottom ? 'bg-deep-plum text-white border-deep-plum':'bg-white text-charcoal/60 border-rose-blush/30'">Btm</button>
                <button type="button" @click="widgetModal.form.margins.left = !widgetModal.form.margins.left" class="p-1 border rounded text-[9px] font-bold" :class="widgetModal.form.margins.left ? 'bg-deep-plum text-white border-deep-plum':'bg-white text-charcoal/60 border-rose-blush/30'">Lft</button>
                <button type="button" @click="widgetModal.form.margins.right = !widgetModal.form.margins.right" class="p-1 border rounded text-[9px] font-bold" :class="widgetModal.form.margins.right ? 'bg-deep-plum text-white border-deep-plum':'bg-white text-charcoal/60 border-rose-blush/30'">Rgt</button>
              </div>
            </div>
          </div>

          <!-- Title tags -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Main Title Header</label>
              <input v-model="widgetModal.form.title" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Small Subtitle Tag</label>
              <input v-model="widgetModal.form.subtitle" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Description / Embed HTML Code</label>
            <textarea v-model="widgetModal.form.description" rows="3" class="w-full p-2.5 border border-charcoal/20 rounded-xl"></textarea>
          </div>

          <div v-if="widgetModal.form.type !== 'html'" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Section Desktop Image URL</label>
              <input v-model="widgetModal.form.image" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Section Mobile Image URL</label>
              <input v-model="widgetModal.form.imageMobile" type="text" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>

          <!-- DYNAMIC TYPE-SPECIFIC EDITOR MODULES -->

          <!-- 1. Editorial Comfort Feature Checklist -->
          <div v-if="widgetModal.form.key === 'everyday-comfort'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Features Checklist Items</label>
              <button type="button" @click="widgetModal.form.items.push('')" class="text-deep-plum font-bold hover:underline">+ Add Feature Tag</button>
            </div>
            <div class="space-y-2 max-h-[140px] overflow-y-auto">
              <div v-for="(_, index) in widgetModal.form.items" :key="index" class="flex gap-2 items-center">
                <input v-model="widgetModal.form.items[index]" class="flex-1 p-2 border border-charcoal/20 bg-warm-ivory rounded-lg text-xs" required />
                <button type="button" @click="widgetModal.form.items.splice(index, 1)" class="text-red-500 font-bold px-1.5">✕</button>
              </div>
            </div>
          </div>

          <!-- 2. Promo Card Grid -->
          <div v-if="widgetModal.form.type === 'promo-grid'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Promo Cards</label>
              <button type="button" @click="addPromoCardField" class="text-deep-plum font-bold hover:underline">+ Add Promo Card</button>
            </div>
            <div class="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory border border-rose-blush/25 rounded-2xl space-y-2 relative">
                <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="absolute top-2 right-2 text-red-500 text-xs">✕</button>
                <span class="font-bold text-[9px] uppercase text-deep-plum">Promo Card #{{ idx + 1 }}</span>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                </div>
                <input v-model="item.link" placeholder="Destination Link (e.g. /products)" required class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
                <input v-model="item.title" placeholder="Accessible Text Title (e.g. Buy 2 Get 1)" class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
              </div>
            </div>
          </div>

          <!-- 3. Square Pack Grid -->
          <div v-if="widgetModal.form.type === 'square-grid'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Centered Square Grid (Max 8)</label>
              <button type="button" @click="addSquareGridItemField" :disabled="widgetModal.form.items?.length >= 8" class="text-deep-plum font-bold hover:underline disabled:opacity-30">+ Add Item</button>
            </div>
            <div class="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory border border-rose-blush/25 rounded-2xl space-y-2 relative">
                <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="absolute top-2 right-2 text-red-500 text-xs">✕</button>
                <span class="font-bold text-[9px] uppercase text-deep-plum">Square Card #{{ idx + 1 }}</span>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                  <input v-model="item.link" placeholder="Destination Link *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Shoppers Talk Reviews Grid -->
          <div v-if="widgetModal.form.type === 'shoppers-talk'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Reviews Carousel Items (Image URLs only)</label>
              <button type="button" @click="addShoppersTalkReviewField" class="text-deep-plum font-bold hover:underline">+ Add Card Image</button>
            </div>
            <div class="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory border border-rose-blush/25 rounded-2xl flex items-center gap-2 relative">
                <!-- Mini Asset Preview -->
                <div class="w-10 h-10 shrink-0 bg-white border border-rose-blush rounded overflow-hidden flex items-center justify-center shadow-soft">
                  <img v-if="item.image" :src="item.image" class="w-full h-full object-cover" />
                  <span v-else class="text-[9px] text-charcoal/30">Null</span>
                </div>
                <input v-model="item.image" placeholder="Review Image URL *" required class="flex-1 p-2.5 border border-charcoal/20 bg-white rounded-lg text-xs" />
                <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="text-red-500 text-xs font-bold px-1.5">✕</button>
              </div>
            </div>
          </div>

          <!-- 5. Category Tabs Slider -->
          <div v-if="widgetModal.form.type === 'collection-tabs'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Curated Category Tab Showcase</label>
              <button type="button" @click="addCategoryTabField" class="text-deep-plum font-bold hover:underline">+ Add Category Tag</button>
            </div>
            <div class="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              <div v-for="(_, index) in widgetModal.form.items" :key="index" class="flex gap-2 items-center">
                <input v-model="widgetModal.form.items[index]" placeholder="Category name matching database..." class="flex-1 p-2.5 border border-charcoal/20 bg-warm-ivory rounded-lg text-xs" required />
                <button type="button" @click="widgetModal.form.items.splice(index, 1)" class="text-red-500 font-bold px-1.5">✕</button>
              </div>
            </div>
          </div>

          <!-- 6. Fit Sizing Calculator Config -->
          <div v-if="widgetModal.form.type === 'fit-calculator'" class="space-y-3 border-t border-rose-blush/15 pt-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Mobile Banner Image</label>
              <input v-model="widgetModal.form.items.imageMobile" placeholder="https://example.com/mobile-calc.jpg" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Button Label</label>
                <input v-model="widgetModal.form.items.btnText" placeholder="Start Sizing Test" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Button Redirect Path</label>
                <input v-model="widgetModal.form.items.btnLink" placeholder="#" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
            </div>
          </div>

          <!-- 7. Saver Combos Offer list -->
          <div v-if="widgetModal.form.type === 'offers-slider'" class="border-t border-rose-blush/15 pt-3">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Saver Combos Showcase</label>
              <button type="button" @click="addOfferCardField" class="text-deep-plum font-bold hover:underline">+ Add Combo Slide</button>
            </div>
            <div class="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory border border-rose-blush/25 rounded-2xl space-y-2 relative">
                <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="absolute top-2 right-2 text-red-500 text-xs">✕</button>
                <span class="font-bold text-[9px] uppercase text-deep-plum">Combo Card #{{ idx + 1 }}</span>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                </div>
                <input v-model="item.link" placeholder="Combo Link (e.g. /products)" required class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
                <div class="grid grid-cols-3 gap-2">
                  <input v-model="item.title" placeholder="Combo Title *" required class="col-span-2 p-2 border border-charcoal/20 bg-white rounded-lg" />
                  <input v-model="item.price" placeholder="Price (e.g. ₹999) *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                </div>
                <input v-model="item.subtitle" placeholder="Short description details..." class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
              </div>
            </div>
          </div>

          <!-- 8. Countdown timers banner settings -->
          <div v-if="widgetModal.form.type === 'countdown-banner'" class="space-y-3 border-t border-rose-blush/15 pt-3">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Redirect CTA Link</label>
                <input v-model="widgetModal.form.items.link" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
              <div>
                <label class="block font-semibold mb-1 text-charcoal/70">Timer Target Date (ISO format)</label>
                <input v-model="widgetModal.form.items.endDate" placeholder="YYYY-MM-DDTHH:MM:SS" class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
              </div>
            </div>
          </div>

          <!-- 9. Plain Image / Timer / Header Banners settings -->
          <div v-if="widgetModal.form.type === 'image-only' || widgetModal.form.type === 'heading-banner' || widgetModal.form.type === 'banner'" class="border-t border-rose-blush/15 pt-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Banner Redirect Link</label>
              <input v-model="widgetModal.form.items.link" required class="w-full p-2.5 border border-charcoal/20 rounded-xl" />
            </div>
          </div>

          <!-- 10. Vertical Autoplay Carousel details -->
          <div v-if="widgetModal.form.type === 'vertical-carousel' || widgetModal.form.type === '3-set-carousel'" class="border-t border-rose-blush/15 pt-3 space-y-3">
            <div class="flex items-center gap-6 bg-rose-blush/20 p-2.5 rounded-xl border border-charcoal/20">
              <div v-if="widgetModal.form.type === 'vertical-carousel'" class="flex-1">
                <label class="block font-semibold mb-0.5 text-charcoal/70">Autoplay interval (Seconds)</label>
                <input v-model.number="widgetModal.form.items.interval" type="number" min="1" class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
              </div>
              <label class="inline-flex items-center cursor-pointer pt-3">
                <input type="checkbox" v-model="widgetModal.form.items.widthFull" class="sr-only peer" />
                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-deep-plum"></div>
                <span class="ms-2 text-[10px] font-bold text-charcoal/85">Full Width</span>
              </label>
            </div>
            
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-deep-plum">Slides List</label>
              <button type="button" @click="addVerticalCarouselCardField" class="text-deep-plum font-bold hover:underline">+ Add Card Slide</button>
            </div>
            
            <div class="space-y-3 max-h-[180px] overflow-y-auto pr-1">
              <div v-for="(item, idx) in widgetModal.form.items.list" :key="idx" class="p-3 bg-warm-ivory border border-rose-blush/25 rounded-2xl space-y-2 relative">
                <button type="button" @click="widgetModal.form.items.list.splice(idx, 1)" class="absolute top-2 right-2 text-red-500 text-xs">✕</button>
                <span class="font-bold text-[9px] uppercase text-deep-plum">Slide #{{ idx + 1 }}</span>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-charcoal/20 bg-white rounded-lg" />
                </div>
                <input v-model="item.link" placeholder="Destination Redirect Link *" required class="w-full p-2 border border-charcoal/20 bg-white rounded-lg" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-rose-blush/10">
            <button type="button" @click="widgetModal.show = false" class="px-4 py-2 border border-charcoal/20 rounded-xl text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded-xl shadow-premium">Save Config</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '~/stores/admin'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  layout: 'admin'
})

const adminStore = useAdminStore()
const uiStore = useUIStore()

const activeTab = ref('overview')
const productFormTab = ref('general')

const tabs = [
  { id: 'overview', name: 'Dashboard Overview', icon: '📊' },
  { id: 'banners', name: 'Banners Carousel', icon: '🖼️' },
  { id: 'categories', name: 'Categories Selector', icon: '🗂️' },
  { id: 'products', name: 'Products Catalog', icon: '🛍️' },
  { id: 'widgets', name: 'Widgets & Layout', icon: '⚙️' },
]

// Base loaded lists
const banners = ref<any[]>([])
const categories = ref<any[]>([])
const products = ref<any[]>([])
const widgets = ref<any[]>([])

const loadingData = ref(false)

// Search Queries & Filters
const searchQueries = ref({
  banners: '',
  categories: '',
  products: '',
  widgets: ''
})
const productFilterCategory = ref('')
const productFilterStock = ref('all') // 'all' | 'instock' | 'lowstock' | 'outofstock'
const widgetFilterType = ref('all')

// Calculated metrics for overview tab
const lowStockProductsCount = computed(() => {
  return products.value.filter(p => p.stockCount <= 5 && p.stockCount > 0).length
})
const enabledWidgetsCount = computed(() => {
  return widgets.value.filter(w => w.enabled).length
})

// Filtered lists
const filteredBanners = computed(() => {
  const q = searchQueries.value.banners.toLowerCase().trim()
  if (!q) return banners.value
  return banners.value.filter(b => 
    (b.title && b.title.toLowerCase().includes(q)) || 
    (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
    (b.ctaLink && b.ctaLink.toLowerCase().includes(q))
  )
})

const filteredCategories = computed(() => {
  const q = searchQueries.value.categories.toLowerCase().trim()
  if (!q) return categories.value
  return categories.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.slug.toLowerCase().includes(q)
  )
})

const filteredProducts = computed(() => {
  let list = products.value
  const q = searchQueries.value.products.toLowerCase().trim()
  if (q) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.slug.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q))
    )
  }
  if (productFilterCategory.value) {
    list = list.filter(p => p.category === productFilterCategory.value)
  }
  if (productFilterStock.value === 'instock') {
    list = list.filter(p => p.inStock && p.stockCount > 5)
  } else if (productFilterStock.value === 'lowstock') {
    list = list.filter(p => p.inStock && p.stockCount <= 5 && p.stockCount > 0)
  } else if (productFilterStock.value === 'outofstock') {
    list = list.filter(p => !p.inStock || p.stockCount === 0)
  }
  return list
})

const lowStockProducts = computed(() => {
  return products.value.filter(p => p.stockCount <= 5 && p.stockCount > 0)
})

const filteredWidgets = computed(() => {
  let list = widgets.value
  const q = searchQueries.value.widgets.toLowerCase().trim()
  if (q) {
    list = list.filter(w => 
      w.name.toLowerCase().includes(q) || 
      w.key.toLowerCase().includes(q) ||
      (w.title && w.title.toLowerCase().includes(q))
    )
  }
  if (widgetFilterType.value !== 'all') {
    list = list.filter(w => w.type === widgetFilterType.value)
  }
  return list
})

// Modals states
const bannerModal = ref({
  show: false,
  isEdit: false,
  itemId: '',
  form: {
    title: '',
    subtitle: '',
    cta: '',
    ctaLink: '',
    image: '',
    imageMobile: '',
    badge: '',
    textColor: 'light',
    align: 'left'
  }
})

const categoryModal = ref({
  show: false,
  isEdit: false,
  itemId: '',
  form: {
    name: '',
    slug: '',
    description: '',
    image: '',
    subcategories: [] as { name: string; slug: string }[]
  }
})

const productModal = ref({
  show: false,
  isEdit: false,
  itemId: '',
  form: {
    name: '',
    slug: '',
    category: '',
    subcategory: '',
    description: '',
    price: 0,
    originalPrice: 0,
    badge: null as string | null,
    fabric: '',
    deliveryDays: 3,
    stockCount: 10,
    inStock: true,
    variants: [] as any[]
  }
})

const widgetModal = ref({
  show: false,
  isNew: false,
  itemId: '',
  form: {
    key: '',
    name: '',
    type: 'system',
    title: '',
    subtitle: '',
    description: '',
    image: '',
    imageMobile: '',
    position: 1 as number,
    margins: { top: false, bottom: false, left: false, right: false },
    items: [] as any
  }
})

onMounted(async () => {
  adminStore.init()
  if (!adminStore.isAuthenticated) {
    navigateTo('/admin/login')
    return
  }

  const valid = await adminStore.checkAuth()
  if (!valid) {
    uiStore.addToast('error', 'Session expired. Please login again.')
    navigateTo('/admin/login')
    return
  }

  loadAllData()
})

const loadAllData = async () => {
  loadingData.value = true
  const config = useRuntimeConfig()
  try {
    const [bannersData, categoriesData, productsData, widgetsData] = await Promise.all([
      $fetch<any[]>(`${config.public.apiBase}/banners`),
      $fetch<any[]>(`${config.public.apiBase}/categories`),
      $fetch<any[]>(`${config.public.apiBase}/products`),
      $fetch<any[]>(`${config.public.apiBase}/widgets`)
    ])
    banners.value = bannersData
    categories.value = categoriesData
    products.value = productsData
    widgets.value = widgetsData
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    uiStore.addToast('error', 'Error loading database resources')
  } finally {
    loadingData.value = false
  }
}

const handleLogout = () => {
  adminStore.logout()
  uiStore.addToast('success', 'Logged out successfully!')
}

// BANNERS CRUD
const openBannerModal = (banner: any | null) => {
  if (banner) {
    bannerModal.value.isEdit = true
    bannerModal.value.itemId = banner._id
    bannerModal.value.form = {
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      cta: banner.cta || '',
      ctaLink: banner.ctaLink,
      image: banner.image,
      imageMobile: banner.imageMobile || '',
      badge: banner.badge || '',
      textColor: banner.textColor || 'light',
      align: banner.align || 'left'
    }
  } else {
    bannerModal.value.isEdit = false
    bannerModal.value.itemId = ''
    bannerModal.value.form = {
      title: '',
      subtitle: '',
      cta: 'Shop Now',
      ctaLink: '/products',
      image: '',
      imageMobile: '',
      badge: '',
      textColor: 'light',
      align: 'left'
    }
  }
  bannerModal.value.show = true
}

const saveBannerItem = async () => {
  try {
    if (bannerModal.value.isEdit) {
      await adminStore.updateBanner(bannerModal.value.itemId, bannerModal.value.form)
      uiStore.addToast('success', 'Banner updated successfully')
    } else {
      await adminStore.createBanner(bannerModal.value.form)
      uiStore.addToast('success', 'Banner created successfully')
    }
    bannerModal.value.show = false
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to save banner')
  }
}

const deleteBannerItem = async (id: string) => {
  if (!confirm('Are you sure you want to delete this banner?')) return
  try {
    await adminStore.deleteBanner(id)
    uiStore.addToast('success', 'Banner deleted successfully')
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to delete banner')
  }
}

// CATEGORIES CRUD
const openCategoryModal = (cat: any | null) => {
  if (cat) {
    categoryModal.value.isEdit = true
    categoryModal.value.itemId = cat._id
    categoryModal.value.form = {
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      subcategories: cat.subcategories ? JSON.parse(JSON.stringify(cat.subcategories)) : []
    }
  } else {
    categoryModal.value.isEdit = false
    categoryModal.value.itemId = ''
    categoryModal.value.form = {
      name: '',
      slug: '',
      description: '',
      image: '',
      subcategories: []
    }
  }
  categoryModal.value.show = true
}

const addSubcategoryField = () => {
  categoryModal.value.form.subcategories.push({ name: '', slug: '' })
}

const saveCategoryItem = async () => {
  try {
    if (categoryModal.value.isEdit) {
      await adminStore.updateCategory(categoryModal.value.itemId, categoryModal.value.form)
      uiStore.addToast('success', 'Category updated successfully')
    } else {
      await adminStore.createCategory(categoryModal.value.form)
      uiStore.addToast('success', 'Category created successfully')
    }
    categoryModal.value.show = false
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to save category')
  }
}

const deleteCategoryItem = async (id: string) => {
  if (!confirm('Are you sure you want to delete this category? All dynamic product counts will update.')) return
  try {
    await adminStore.deleteCategory(id)
    uiStore.addToast('success', 'Category deleted successfully')
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to delete category')
  }
}

// PRODUCTS CRUD
const openProductModal = (prod: any | null) => {
  productFormTab.value = 'general'
  if (prod) {
    productModal.value.isEdit = true
    productModal.value.itemId = prod._id
    productModal.value.form = {
      name: prod.name,
      slug: prod.slug,
      category: prod.category,
      subcategory: prod.subcategory || '',
      description: prod.description || '',
      price: prod.price,
      originalPrice: prod.originalPrice,
      badge: prod.badge || null,
      fabric: prod.fabric || '',
      deliveryDays: prod.deliveryDays || 3,
      stockCount: prod.stockCount || 0,
      inStock: prod.inStock !== undefined ? prod.inStock : true,
      variants: prod.variants ? JSON.parse(JSON.stringify(prod.variants)) : []
    }
  } else {
    productModal.value.isEdit = false
    productModal.value.itemId = ''
    productModal.value.form = {
      name: '',
      slug: '',
      category: '',
      subcategory: '',
      description: '',
      price: 0,
      originalPrice: 0,
      badge: null,
      fabric: '',
      deliveryDays: 3,
      stockCount: 10,
      inStock: true,
      variants: [
        {
          color: 'Default Color',
          colorHex: '#1a1a1a',
          sizes: ['S', 'M', 'L'],
          images: ['']
        }
      ]
    }
  }
  productModal.value.show = true
}

const addProductVariant = () => {
  productModal.value.form.variants.push({
    color: '',
    colorHex: '#ffffff',
    sizes: ['M'],
    images: ['']
  })
}

const onProductCategoryChange = () => {
  productModal.value.form.subcategory = ''
}

const selectedCategorySubcategories = computed(() => {
  const catName = productModal.value.form.category
  const found = categories.value.find(c => c.name.toLowerCase() === catName.toLowerCase())
  return found ? found.subcategories || [] : []
})

const saveProductItem = async () => {
  const original = productModal.value.form.originalPrice
  const price = productModal.value.form.price
  let discount = 0
  if (original > price && original > 0) {
    discount = Math.round(((original - price) / original) * 100)
  }

  const payload = {
    ...productModal.value.form,
    discount
  }

  try {
    if (productModal.value.isEdit) {
      await adminStore.updateProduct(productModal.value.itemId, payload)
      uiStore.addToast('success', 'Product updated successfully')
    } else {
      await adminStore.createProduct(payload)
      uiStore.addToast('success', 'Product created successfully')
    }
    productModal.value.show = false
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to save product')
  }
}

const deleteProductItem = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await adminStore.deleteProduct(id)
    uiStore.addToast('success', 'Product deleted successfully')
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to delete product')
  }
}

// WIDGETS CRUD & SORTING
const openWidgetModal = (w: any | null) => {
  if (w) {
    widgetModal.value.isNew = false
    widgetModal.value.itemId = w._id
    let itemsVal: any = []
    if (w.type === 'fit-calculator') {
      itemsVal = (w.items && typeof w.items === 'object' && !Array.isArray(w.items))
        ? JSON.parse(JSON.stringify(w.items))
        : { btnText: 'Start Sizing Test', btnLink: '#', image: '', imageMobile: '' }
    } else if (w.type === 'countdown-banner' || w.type === 'image-only' || w.type === 'heading-banner' || w.type === 'banner') {
      itemsVal = (w.items && typeof w.items === 'object' && !Array.isArray(w.items))
        ? JSON.parse(JSON.stringify(w.items))
        : { link: '/products', endDate: '' }
      if (!itemsVal.link) {
        itemsVal.link = '/products'
      }
    } else if (w.type === 'flexible-grid') {
      itemsVal = (w.items && typeof w.items === 'object' && !Array.isArray(w.items))
        ? JSON.parse(JSON.stringify(w.items))
        : { layout: '2-col', photos: [] }
    } else if (w.type === 'vertical-carousel' || w.type === '3-set-carousel') {
      itemsVal = (w.items && typeof w.items === 'object' && !Array.isArray(w.items))
        ? JSON.parse(JSON.stringify(w.items))
        : { list: [] }
      if (!itemsVal.list) {
        itemsVal = { ...itemsVal, list: [] }
      }
    } else {
      itemsVal = Array.isArray(w.items) ? JSON.parse(JSON.stringify(w.items)) : []
    }
    widgetModal.value.form = {
      key: w.key,
      name: w.name,
      type: w.type || 'system',
      title: w.title || '',
      subtitle: w.subtitle || '',
      description: w.description || '',
      image: w.image || '',
      imageMobile: w.imageMobile || '',
      position: (widgets.value.findIndex((x: any) => x._id === w._id) + 1) || 1,
      margins: w.margins ? JSON.parse(JSON.stringify(w.margins)) : { top: false, bottom: false, left: false, right: false },
      items: itemsVal
    }
  } else {
    widgetModal.value.isNew = true
    widgetModal.value.itemId = ''
    widgetModal.value.form = {
      key: '',
      name: '',
      type: 'banner',
      title: '',
      subtitle: '',
      description: '',
      image: '',
      imageMobile: '',
      position: widgets.value.length + 1,
      margins: { top: false, bottom: false, left: false, right: false },
      items: []
    }
  }
  widgetModal.value.show = true
}

const onWidgetTypeChange = () => {
  if (widgetModal.value.form.type === 'fit-calculator') {
    widgetModal.value.form.items = { btnText: 'Start Sizing Test', btnLink: '#', image: '', imageMobile: '' }
  } else if (widgetModal.value.form.type === 'countdown-banner' || widgetModal.value.form.type === 'image-only' || widgetModal.value.form.type === 'heading-banner' || widgetModal.value.form.type === 'banner') {
    widgetModal.value.form.items = { link: '/products', endDate: '' }
  } else if (widgetModal.value.form.type === 'flexible-grid') {
    widgetModal.value.form.items = { layout: '2-col', photos: [] }
  } else if (widgetModal.value.form.type === 'vertical-carousel' || widgetModal.value.form.type === '3-set-carousel') {
    widgetModal.value.form.items = { interval: 3, list: [] }
  } else if (widgetModal.value.form.type === 'square-grid' || widgetModal.value.form.type === 'shoppers-talk') {
    widgetModal.value.form.items = []
  } else {
    widgetModal.value.form.items = []
  }
}

const addSquareGridItemField = () => {
  if (!Array.isArray(widgetModal.value.form.items)) {
    widgetModal.value.form.items = []
  }
  if (widgetModal.value.form.items.length < 8) {
    widgetModal.value.form.items.push({ image: '', link: '/products' })
  }
}

const addShoppersTalkReviewField = () => {
  if (!Array.isArray(widgetModal.value.form.items)) {
    widgetModal.value.form.items = []
  }
  widgetModal.value.form.items.push({ image: '' })
}

const addPromoCardField = () => {
  if (!Array.isArray(widgetModal.value.form.items)) {
    widgetModal.value.form.items = []
  }
  widgetModal.value.form.items.push({ image: '', imageMobile: '', link: '', title: '' })
}

const addCategoryTabField = () => {
  if (!Array.isArray(widgetModal.value.form.items)) {
    widgetModal.value.form.items = []
  }
  widgetModal.value.form.items.push('')
}

const addOfferCardField = () => {
  if (!Array.isArray(widgetModal.value.form.items)) {
    widgetModal.value.form.items = []
  }
  widgetModal.value.form.items.push({ image: '', imageMobile: '', link: '', title: '', subtitle: '', price: '' })
}

const addVerticalCarouselCardField = () => {
  if (!widgetModal.value.form.items.list) {
    widgetModal.value.form.items.list = []
  }
  widgetModal.value.form.items.list.push({ image: '', imageMobile: '', link: '' })
}

const saveWidgetConfig = async () => {
  try {
    const desiredPosition = Number(widgetModal.value.form.position) || (widgets.value.length + 1)
    if (widgetModal.value.isNew) {
      const payload = {
        ...widgetModal.value.form,
        order: widgets.value.length + 1,
        enabled: true
      }
      await adminStore.createWidget(payload)
      uiStore.addToast('success', 'Custom widget created')

      await loadAllData()
      const newList = [...widgets.value]
      const newWidgetIdx = newList.length - 1
      const targetIdx = Math.max(0, Math.min(desiredPosition - 1, newList.length - 1))
      if (newWidgetIdx !== targetIdx) {
        const [moved] = newList.splice(newWidgetIdx, 1)
        newList.splice(targetIdx, 0, moved)
        await Promise.all(
          newList.map((w: any, i: number) => adminStore.updateWidget(w._id, { order: i + 1 }))
        )
      }
    } else {
      await adminStore.updateWidget(widgetModal.value.itemId, widgetModal.value.form)
      uiStore.addToast('success', 'Widget settings saved')

      const currentIdx = widgets.value.findIndex((w: any) => w._id === widgetModal.value.itemId)
      const targetIdx = Math.max(0, Math.min(desiredPosition - 1, widgets.value.length - 1))
      if (currentIdx !== targetIdx && currentIdx !== -1) {
        const newList = [...widgets.value]
        const [moved] = newList.splice(currentIdx, 1)
        newList.splice(targetIdx, 0, moved)
        await Promise.all(
          newList.map((w: any, i: number) => adminStore.updateWidget(w._id, { order: i + 1 }))
        )
      }
    }
    widgetModal.value.show = false
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to save widget settings')
  }
}

const toggleWidgetStatus = async (widget: any) => {
  try {
    await adminStore.updateWidget(widget._id, { enabled: !widget.enabled })
    uiStore.addToast('success', `${widget.name} ${!widget.enabled ? 'enabled' : 'disabled'} successfully`)
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to toggle widget')
  }
}

const deleteWidgetItem = async (id: string) => {
  if (!confirm('Are you sure you want to delete this custom widget?')) return
  try {
    await adminStore.deleteWidget(id)
    uiStore.addToast('success', 'Widget deleted successfully')
    loadAllData()
  } catch (error: any) {
    uiStore.addToast('error', error.message || 'Failed to delete widget')
  }
}

const moveWidget = async (index: number, direction: 'up' | 'down') => {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= widgets.value.length) return

  const newList = [...widgets.value]
  const tmp = newList[index]
  newList[index] = newList[targetIndex]
  newList[targetIndex] = tmp
  widgets.value = newList

  try {
    await Promise.all(
      newList.map((w: any, i: number) => adminStore.updateWidget(w._id, { order: i + 1 }))
    )
  } catch (error: any) {
    uiStore.addToast('error', 'Failed to save new widget order')
    loadAllData()
  }
}
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.shadow-premium {
  box-shadow: 0 16px 36px -12px rgba(138, 79, 90, 0.08);
}
.shadow-soft {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
