<template>
  <div class="min-h-screen bg-warm-ivory/50 py-10 px-4 sm:px-6 lg:px-8 font-ui">
    <div class="max-w-7xl mx-auto">
      <!-- Top header bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-rose-blush/20 shadow-sm mb-8">
        <div>
          <h1 class="text-2xl font-serif text-deep-plum font-bold">Admin Console</h1>
          <p class="text-xs text-charcoal/60 mt-1">Manage your storefront, upload products, custom widgets and banners.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs px-3 py-1 bg-rose-blush text-deep-plum rounded-full font-semibold">Logged as: admin</span>
          <button @click="handleLogout" class="px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-xs font-semibold tracking-wide transition-all">
            Sign Out
          </button>
        </div>
      </div>

      <!-- Dashboard Grid Layout with Sidebar Tab Selectors -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1 space-y-2.5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-left text-sm font-semibold transition-all border"
            :class="activeTab === tab.id
              ? 'bg-deep-plum text-white border-deep-plum shadow-md'
              : 'bg-white text-charcoal/80 hover:bg-rose-blush/20 border-rose-blush/20 hover:text-deep-plum'"
          >
            <span>{{ tab.name }}</span>
            <span class="text-lg">{{ tab.icon }}</span>
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-rose-blush/20 shadow-sm min-h-[500px]">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-8">
            <h2 class="text-xl font-serif text-deep-plum font-semibold">Store Overview</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center">
                <span class="text-3xl">🛍️</span>
                <h3 class="text-2xl font-bold text-deep-plum mt-2">{{ products.length }}</h3>
                <p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Total Products</p>
              </div>
              <div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center">
                <span class="text-3xl">🗂️</span>
                <h3 class="text-2xl font-bold text-deep-plum mt-2">{{ categories.length }}</h3>
                <p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Categories</p>
              </div>
              <div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center">
                <span class="text-3xl">🖼️</span>
                <h3 class="text-2xl font-bold text-deep-plum mt-2">{{ banners.length }}</h3>
                <p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Hero Banners</p>
              </div>
              <div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center">
                <span class="text-3xl">⚙️</span>
                <h3 class="text-2xl font-bold text-deep-plum mt-2">{{ widgets.length }}</h3>
                <p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Active Widgets</p>
              </div>
            </div>

            <!-- Fast access tips -->
            <div class="bg-rose-blush/10 border border-rose-blush/30 rounded-xl p-5 space-y-3">
              <h4 class="font-semibold text-deep-plum text-xs uppercase tracking-wider">Quick Instructions</h4>
              <ul class="text-xs text-charcoal/80 space-y-2 list-disc pl-4">
                <li>Go to <strong>Banners</strong> to update the sliding carousel on the top page.</li>
                <li>Go to <strong>Products</strong> to upload and update new clothing styles, configure colors, sizes, and upload pictures.</li>
                <li>Go to <strong>Categories</strong> to manage top-level lines (e.g. Bras, Panties) and their subcategories.</li>
                <li>Go to <strong>Widgets</strong> to customize sections title/details, enable/disable segments, create custom banners and reorder homepage layout.</li>
              </ul>
            </div>
          </div>

          <!-- Banners Tab -->
          <div v-if="activeTab === 'banners'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Hero Banners</h2>
              <button @click="openBannerModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm">
                + Add Slide
              </button>
            </div>

            <div class="border border-rose-blush/20 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold">
                    <th class="p-3">Preview</th>
                    <th class="p-3">Destination Link</th>
                    <th class="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-rose-blush/10">
                  <tr v-for="banner in banners" :key="banner._id" class="hover:bg-warm-ivory/20">
                    <td class="p-3">
                      <img :src="banner.image" class="w-28 h-12 object-cover rounded shadow-sm bg-warm-ivory" />
                    </td>
                    <td class="p-3 text-charcoal font-semibold">{{ banner.ctaLink }}</td>
                    <td class="p-3 text-right space-x-1.5">
                      <button @click="openBannerModal(banner)" class="text-deep-plum hover:underline font-semibold">Edit</button>
                      <button @click="deleteBannerItem(banner._id)" class="text-red-500 hover:underline font-semibold">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Categories Tab -->
          <div v-if="activeTab === 'categories'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Categories</h2>
              <button @click="openCategoryModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm">
                + Add Category
              </button>
            </div>

            <div class="border border-rose-blush/20 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold">
                    <th class="p-3">Image</th>
                    <th class="p-3">Name / Slug</th>
                    <th class="p-3">Subcategories</th>
                    <th class="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-rose-blush/10">
                  <tr v-for="cat in categories" :key="cat._id" class="hover:bg-warm-ivory/20">
                    <td class="p-3">
                      <img :src="cat.image" class="w-10 h-10 object-cover rounded shadow-sm bg-warm-ivory" />
                    </td>
                    <td class="p-3">
                      <p class="font-semibold text-charcoal">{{ cat.name }}</p>
                      <p class="text-[10px] text-charcoal/50 mt-0.5">{{ cat.slug }}</p>
                    </td>
                    <td class="p-3">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="sub in cat.subcategories" :key="sub.slug" class="px-2 py-0.5 bg-rose-blush/50 text-deep-plum rounded-[4px] text-[10px]">
                          {{ sub.name }}
                        </span>
                      </div>
                    </td>
                    <td class="p-3 text-right space-x-1.5">
                      <button @click="openCategoryModal(cat)" class="text-deep-plum hover:underline font-semibold">Edit</button>
                      <button @click="deleteCategoryItem(cat._id)" class="text-red-500 hover:underline font-semibold">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Products Tab -->
          <div v-if="activeTab === 'products'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Products</h2>
              <button @click="openProductModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm">
                + Add Product
              </button>
            </div>

            <div class="border border-rose-blush/20 rounded-xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold">
                    <th class="p-3">Thumbnail</th>
                    <th class="p-3">Name / Category</th>
                    <th class="p-3">Price</th>
                    <th class="p-3">Badge &amp; Stock</th>
                    <th class="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-rose-blush/10">
                  <tr v-for="product in products" :key="product._id" class="hover:bg-warm-ivory/20">
                    <td class="p-3">
                      <img :src="product.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/150'" class="w-10 h-10 object-cover rounded shadow-sm bg-warm-ivory" />
                    </td>
                    <td class="p-3">
                      <p class="font-semibold text-charcoal">{{ product.name }}</p>
                      <p class="text-[10px] text-charcoal/50 mt-0.5">{{ product.category }} - {{ product.subcategory }}</p>
                    </td>
                    <td class="p-3 font-semibold text-deep-plum">
                      ₹{{ product.price }} <span class="text-charcoal/45 line-through font-normal" v-if="product.originalPrice">₹{{ product.originalPrice }}</span>
                    </td>
                    <td class="p-3">
                      <span v-if="product.badge" class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mr-1.5" :class="product.badge === 'bestseller' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'">{{ product.badge }}</span>
                      <span class="text-[10px] font-medium" :class="product.inStock ? 'text-green-600' : 'text-red-500'">{{ product.inStock ? `In Stock (${product.stockCount})` : 'Out of stock' }}</span>
                    </td>
                    <td class="p-3 text-right space-x-1.5">
                      <button @click="openProductModal(product)" class="text-deep-plum hover:underline font-semibold">Edit</button>
                      <button @click="deleteProductItem(product._id)" class="text-red-500 hover:underline font-semibold">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Widgets Layout Tab -->
          <div v-if="activeTab === 'widgets'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-serif text-deep-plum font-semibold">Home Page Widgets &amp; Layout</h2>
              <button @click="openWidgetModal(null)" class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm">
                + Create Custom Widget
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(widget, index) in widgets"
                :key="widget._id"
                class="flex items-center justify-between p-4 bg-warm-ivory/30 border border-rose-blush/20 rounded-xl hover:shadow-sm transition-all"
              >
                <div class="flex items-center gap-3">
                  <!-- Order sorting triggers -->
                  <div class="flex flex-col gap-1.5">
                    <button @click="moveWidget(index, 'up')" :disabled="index === 0" class="text-charcoal/40 hover:text-deep-plum disabled:opacity-20 text-xs">▲</button>
                    <button @click="moveWidget(index, 'down')" :disabled="index === widgets.length - 1" class="text-charcoal/40 hover:text-deep-plum disabled:opacity-20 text-xs">▼</button>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-semibold text-deep-plum text-sm">{{ widget.name }}</p>
                      <span class="px-2 py-0.5 bg-deep-plum/10 text-deep-plum rounded-full text-[9px] uppercase font-bold">{{ widget.type }}</span>
                    </div>
                    <p class="text-xs text-charcoal/60 mt-1" v-if="widget.title">Title: {{ widget.title }}</p>
                    <p class="text-[10px] text-charcoal/45 mt-0.5">Section Key: {{ widget.key }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <!-- Enable/disable toggle -->
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-semibold text-charcoal/50">Status:</span>
                    <button
                      @click="toggleWidgetStatus(widget)"
                      class="px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase transition-all"
                      :class="widget.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    >
                      {{ widget.enabled ? 'Enabled' : 'Disabled' }}
                    </button>
                  </div>

                  <!-- Edit buttons -->
                  <div class="space-x-2">
                    <button @click="openWidgetModal(widget)" class="text-xs font-semibold text-deep-plum hover:underline">Edit settings</button>
                    <button v-if="widget.type !== 'system'" @click="deleteWidgetItem(widget._id)" class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BANNER FORM MODAL -->
    <div v-if="bannerModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4">
        <h3 class="text-lg font-serif text-deep-plum font-bold">{{ bannerModal.isEdit ? 'Edit Banner Slide' : 'Add Banner Slide' }}</h3>
        <form @submit.prevent="saveBannerItem" class="space-y-4 text-xs font-ui">
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Image URL *</label>
            <input v-model="bannerModal.form.image" type="text" placeholder="https://example.com/image.jpg" required class="w-full p-2 border border-rose-blush/30 rounded" />
            <p class="text-[10px] text-charcoal/40 mt-1">Image size tip: 1400x600 pixels (or wider) is best.</p>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Mobile Image URL</label>
            <input v-model="bannerModal.form.imageMobile" type="text" placeholder="https://example.com/image-mobile.jpg" class="w-full p-2 border border-rose-blush/30 rounded" />
            <p class="text-[10px] text-charcoal/40 mt-1">Image size tip: 800x800 pixels is best.</p>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Click Destination Link (e.g. /products?category=bras) *</label>
            <input v-model="bannerModal.form.ctaLink" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="/products" />
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="bannerModal.show = false" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- CATEGORY FORM MODAL -->
    <div v-if="categoryModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4">
        <h3 class="text-lg font-serif text-deep-plum font-bold">{{ categoryModal.isEdit ? 'Edit Category' : 'Create Category' }}</h3>
        <form @submit.prevent="saveCategoryItem" class="space-y-4 text-xs font-ui">
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Category Name *</label>
            <input v-model="categoryModal.form.name" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Category Slug *</label>
            <input v-model="categoryModal.form.slug" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="bras" />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Description</label>
            <textarea v-model="categoryModal.form.description" rows="2" class="w-full p-2 border border-rose-blush/30 rounded"></textarea>
          </div>
          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Cover Image URL *</label>
            <input v-model="categoryModal.form.image" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block font-semibold text-charcoal/70">Subcategories</label>
              <button type="button" @click="addSubcategoryField" class="text-deep-plum font-semibold hover:underline">+ Add subcategory</button>
            </div>
            <div class="space-y-2">
              <div v-for="(sub, idx) in categoryModal.form.subcategories" :key="idx" class="flex gap-2 items-center">
                <input v-model="sub.name" placeholder="Name (e.g. T-Shirt Bras)" required class="flex-1 p-2 border border-rose-blush/30 rounded" />
                <input v-model="sub.slug" placeholder="Slug (e.g. t-shirt-bras)" required class="flex-1 p-2 border border-rose-blush/30 rounded" />
                <button type="button" @click="categoryModal.form.subcategories.splice(idx, 1)" class="text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="categoryModal.show = false" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- PRODUCT FORM MODAL -->
    <div v-if="productModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4">
        <h3 class="text-lg font-serif text-deep-plum font-bold">{{ productModal.isEdit ? 'Edit Product' : 'Add New Product' }}</h3>
        <form @submit.prevent="saveProductItem" class="space-y-4 text-xs font-ui">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Product Name *</label>
              <input v-model="productModal.form.name" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Product Slug *</label>
              <input v-model="productModal.form.slug" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="everyday-cotton-bra" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Category *</label>
              <select v-model="productModal.form.category" required class="w-full p-2 border border-rose-blush/30 rounded" @change="onProductCategoryChange">
                <option value="">-- Select Category --</option>
                <option v-for="cat in categories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Subcategory</label>
              <select v-model="productModal.form.subcategory" class="w-full p-2 border border-rose-blush/30 rounded">
                <option value="">-- None --</option>
                <option v-for="sub in selectedCategorySubcategories" :key="sub.slug" :value="sub.name">{{ sub.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Price (INR) *</label>
              <input v-model.number="productModal.form.price" type="number" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Original Price (INR) *</label>
              <input v-model.number="productModal.form.originalPrice" type="number" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Badge</label>
              <select v-model="productModal.form.badge" class="w-full p-2 border border-rose-blush/30 rounded">
                <option :value="null">-- None --</option>
                <option value="new">New</option>
                <option value="bestseller">Best Seller</option>
                <option value="sale">Sale</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Description</label>
            <textarea v-model="productModal.form.description" rows="3" class="w-full p-2 border border-rose-blush/30 rounded"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Fabric Details</label>
              <input v-model="productModal.form.fabric" type="text" class="w-full p-2 border border-rose-blush/30 rounded" placeholder="85% Cotton, 15% Spandex" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Delivery Days</label>
              <input v-model.number="productModal.form.deliveryDays" type="number" class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Stock Count</label>
              <input v-model.number="productModal.form.stockCount" type="number" class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div class="flex items-center pt-5">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="productModal.form.inStock" class="sr-only peer" />
                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                <span class="ms-3 text-xs font-semibold text-charcoal/85">In Stock</span>
              </label>
            </div>
          </div>

          <!-- Product Variants List -->
          <div class="border-t border-rose-blush/10 pt-3">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-serif text-deep-plum font-semibold">Product Variants (Colors &amp; Sizes)</h4>
              <button type="button" @click="addProductVariant" class="px-2.5 py-1 bg-rose-blush text-deep-plum rounded text-[10px] font-bold">+ Add Color Variant</button>
            </div>

            <div class="space-y-4">
              <div v-for="(v, vIdx) in productModal.form.variants" :key="vIdx" class="bg-warm-ivory/20 p-3 rounded-lg border border-rose-blush/25 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[10px] uppercase text-deep-plum">Color Variant #{{ vIdx + 1 }}</span>
                  <button type="button" @click="productModal.form.variants.splice(vIdx, 1)" class="text-red-500 hover:underline text-[10px]">Remove Color</button>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-semibold mb-1 text-charcoal/50">Color Name (e.g. Ivory White)</label>
                    <input v-model="v.color" required class="w-full p-2 border border-rose-blush/30 rounded" />
                  </div>
                  <div>
                    <label class="block font-semibold mb-1 text-charcoal/50">Color Hex (e.g. #FDF8F5)</label>
                    <input v-model="v.colorHex" required class="w-full p-2 border border-rose-blush/30 rounded" />
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-1 text-charcoal/50">Sizes (Comma separated, e.g. S, M, L or 32B, 34C)</label>
                  <input :value="v.sizes.join(', ')" @input="v.sizes = ($event.target as HTMLInputElement).value.split(',').map(s => s.trim())" class="w-full p-2 border border-rose-blush/30 rounded" />
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block font-semibold text-charcoal/50">Images URLs</label>
                    <button type="button" @click="v.images.push('')" class="text-deep-plum font-bold text-[10px]">+ Add Image URL</button>
                  </div>
                  <div class="space-y-2">
                    <div v-for="(img, imgIdx) in v.images" :key="imgIdx" class="flex gap-2">
                      <input v-model="v.images[imgIdx]" placeholder="https://example.com/image.jpg" class="flex-1 p-2 border border-rose-blush/30 rounded" />
                      <button type="button" @click="v.images.splice(imgIdx, 1)" class="text-red-500 hover:underline font-semibold">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-rose-blush/10">
            <button type="button" @click="productModal.show = false" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save Product</button>
          </div>
        </form>
      </div>
    </div>

    <!-- WIDGET CONFIGURATION MODAL -->
    <div v-if="widgetModal.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4">
        <h3 class="text-lg font-serif text-deep-plum font-bold">Configure {{ widgetModal.form.name || 'Widget' }}</h3>
        <form @submit.prevent="saveWidgetConfig" class="space-y-4 text-xs font-ui">
          <div v-if="widgetModal.isNew">
            <label class="block font-semibold mb-1 text-charcoal/70">Widget Name *</label>
            <input v-model="widgetModal.form.name" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" />
          </div>
          <div v-if="widgetModal.isNew">
            <label class="block font-semibold mb-1 text-charcoal/70">Widget Unique Key *</label>
            <input v-model="widgetModal.form.key" type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="summer-promo" />
          </div>
          <div v-if="widgetModal.isNew">
            <label class="block font-semibold mb-1 text-charcoal/70">Widget Type *</label>
            <select v-model="widgetModal.form.type" required class="w-full p-2 border border-rose-blush/30 rounded" @change="onWidgetTypeChange">
              <option value="banner">Banner (Full screen promotional banner)</option>
              <option value="editorial">Editorial (Side-by-side text and picture)</option>
              <option value="html">Custom HTML (Embed scripts/custom components)</option>
              <option value="promo-grid">Promo Cards Grid (Clickable banners grid)</option>
              <option value="collection-tabs">Curated Collection Tabs (Category switcher)</option>
              <option value="fit-calculator">Fit Sizing Calculator</option>
              <option value="offers-slider">Special Packs & Offers Slider</option>
              <option value="countdown-banner">Countdown Sale Banner (Single full width image with timer)</option>
              <option value="image-only">Image-Only Banner (Single banner image with no text/timer, natural size)</option>
              <option value="vertical-carousel">Vertical Cards Carousel (Sliding horizontal cards with timer)</option>
              <option value="3-set-carousel">3 Set Carousel (Shows 3 horizontal images at a time)</option>
              <option value="heading-banner">Heading Banner (Full-width, image only)</option>
              <option value="flexible-grid">Flexible Image Grid (1, 2, 3, or 4 photos grid)</option>
            </select>
          </div>

          <!-- Position control — always shown for both new & existing widgets -->
          <div class="bg-rose-blush/10 border border-rose-blush/30 rounded-lg p-3 flex items-center gap-4">
            <div class="flex-1">
              <label class="block font-semibold mb-1 text-deep-plum">Homepage Position</label>
              <p class="text-[10px] text-charcoal/50 mb-1.5">Where this widget appears on the page (1 = very top)</p>
              <input
                v-model.number="widgetModal.form.position"
                type="number"
                min="1"
                :max="widgets.length + (widgetModal.isNew ? 1 : 0)"
                class="w-28 p-2 border border-rose-blush/30 rounded font-mono font-bold text-deep-plum text-center"
              />
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-deep-plum/20 font-mono leading-none">{{ widgetModal.form.position }}</div>
              <div class="text-[10px] text-charcoal/40 mt-0.5">of {{ widgets.length + (widgetModal.isNew ? 1 : 0) }}</div>
            </div>
          </div>

          <!-- Margins Toggles -->
          <div class="bg-rose-blush/10 border border-rose-blush/30 rounded-lg p-3">
            <label class="block font-semibold mb-2 text-deep-plum">Widget Margins (Spacing)</label>
            <p class="text-[10px] text-charcoal/50 mb-3">Enable or disable standard spacing around this widget.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label class="flex items-center cursor-pointer gap-2 bg-white/50 p-2 rounded border border-rose-blush/20">
                <input type="checkbox" v-model="widgetModal.form.margins.top" class="accent-deep-plum w-4 h-4" />
                <span class="text-xs font-semibold text-charcoal">Top Margin</span>
              </label>
              <label class="flex items-center cursor-pointer gap-2 bg-white/50 p-2 rounded border border-rose-blush/20">
                <input type="checkbox" v-model="widgetModal.form.margins.bottom" class="accent-deep-plum w-4 h-4" />
                <span class="text-xs font-semibold text-charcoal">Bottom Margin</span>
              </label>
              <label class="flex items-center cursor-pointer gap-2 bg-white/50 p-2 rounded border border-rose-blush/20">
                <input type="checkbox" v-model="widgetModal.form.margins.left" class="accent-deep-plum w-4 h-4" />
                <span class="text-xs font-semibold text-charcoal">Left Margin</span>
              </label>
              <label class="flex items-center cursor-pointer gap-2 bg-white/50 p-2 rounded border border-rose-blush/20">
                <input type="checkbox" v-model="widgetModal.form.margins.right" class="accent-deep-plum w-4 h-4" />
                <span class="text-xs font-semibold text-charcoal">Right Margin</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Section Header (Main Title)</label>
            <input v-model="widgetModal.form.title" type="text" class="w-full p-2 border border-rose-blush/30 rounded" />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Subtitle (Small top badge)</label>
            <input v-model="widgetModal.form.subtitle" type="text" class="w-full p-2 border border-rose-blush/30 rounded" />
          </div>

          <div>
            <label class="block font-semibold mb-1 text-charcoal/70">Description Text (or raw HTML code)</label>
            <textarea v-model="widgetModal.form.description" rows="4" class="w-full p-2 border border-rose-blush/30 rounded"></textarea>
          </div>

          <div v-if="widgetModal.form.type !== 'html'">
            <label class="block font-semibold mb-1 text-charcoal/70">Section Image URL (Banner / Editorial Image)</label>
            <input v-model="widgetModal.form.image" type="text" class="w-full p-2 border border-rose-blush/30 rounded" placeholder="https://example.com/image.jpg" />
          </div>
          <div v-if="widgetModal.form.type !== 'html'">
            <label class="block font-semibold mb-1 text-charcoal/70">Section Mobile Image URL</label>
            <input v-model="widgetModal.form.imageMobile" type="text" class="w-full p-2 border border-rose-blush/30 rounded" placeholder="https://example.com/image-mobile.jpg" />
          </div>

          <!-- Bullet Points details list for Editorial sections -->
          <div v-if="widgetModal.form.key === 'everyday-comfort'">
            <div class="flex items-center justify-between mb-1">
              <label class="block font-semibold text-charcoal/70">Features Checklist Points</label>
              <button type="button" @click="widgetModal.form.items.push('')" class="text-deep-plum font-semibold">+ Add Point</button>
            </div>
            <div class="space-y-2">
              <div v-for="(_, index) in widgetModal.form.items" :key="index" class="flex gap-2 items-center">
                <input v-model="widgetModal.form.items[index]" class="flex-1 p-2 border border-rose-blush/30 rounded" required />
                <button type="button" @click="widgetModal.form.items.splice(index, 1)" class="text-red-500">Remove</button>
              </div>
            </div>
          </div>

          <!-- Promo Cards list for promo-grid sections -->
          <div v-if="widgetModal.form.type === 'promo-grid'">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-semibold text-charcoal/70">Promo Cards (Banners)</label>
              <button type="button" @click="addPromoCardField" class="text-deep-plum font-semibold hover:underline">+ Add Promo Card</button>
            </div>
            <div class="space-y-3">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[10px] uppercase text-deep-plum">Card #{{ idx + 1 }}</span>
                  <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="text-red-500 hover:underline">Remove</button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-rose-blush/30 rounded" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-rose-blush/30 rounded" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.link" placeholder="Destination Link (e.g. /products)" required class="col-span-2 p-2 border border-rose-blush/30 rounded" />
                </div>
                <input v-model="item.title" placeholder="Accessible Title (e.g. Buy 2 Get 1)" class="w-full p-2 border border-rose-blush/30 rounded" />
              </div>
            </div>
          </div>

          <!-- Category Tabs list for collection-tabs sections -->
          <div v-if="widgetModal.form.type === 'collection-tabs'">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-semibold text-charcoal/70">Category Tabs Showcase</label>
              <button type="button" @click="addCategoryTabField" class="text-deep-plum font-semibold hover:underline">+ Add Tab</button>
            </div>
            <div class="space-y-2">
              <div v-for="(_, index) in widgetModal.form.items" :key="index" class="flex gap-2 items-center">
                <input v-model="widgetModal.form.items[index]" placeholder="Category name (e.g. Bras)" class="flex-1 p-2 border border-rose-blush/30 rounded" required />
                <button type="button" @click="widgetModal.form.items.splice(index, 1)" class="text-red-500">Remove</button>
              </div>
            </div>
          </div>

          <!-- Sizing Fit calculator settings -->
          <div v-if="widgetModal.form.type === 'fit-calculator'" class="space-y-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Mobile Image URL</label>
              <input v-model="widgetModal.form.items.imageMobile" placeholder="https://example.com/image-mobile.jpg" class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Sizing Test Button Text</label>
              <input v-model="widgetModal.form.items.btnText" placeholder="Start Sizing Test" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Sizing Test Button Link</label>
              <input v-model="widgetModal.form.items.btnLink" placeholder="#" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
          </div>

          <!-- Countdown sale banner settings -->
          <div v-if="widgetModal.form.type === 'countdown-banner'" class="space-y-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Click Destination Link (e.g. /products) *</label>
              <input v-model="widgetModal.form.items.link" placeholder="/products?category=activewear" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Countdown End Date &amp; Time *</label>
              <input v-model="widgetModal.form.items.endDate" type="datetime-local" required class="w-full p-2 border border-rose-blush/30 rounded" />
              <p class="text-[10px] text-charcoal/40 mt-1">Select the target date and time when the countdown timer will hit 00:00:00.</p>
            </div>
          </div>

          <!-- Image-only sale banner settings -->
          <div v-if="widgetModal.form.type === 'image-only'" class="space-y-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Click Destination Link (e.g. /products) *</label>
              <input v-model="widgetModal.form.items.link" placeholder="/products?category=panties" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
          </div>

          <!-- Heading Banner settings -->
          <div v-if="widgetModal.form.type === 'heading-banner'" class="space-y-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Click Destination Link (e.g. /products) *</label>
              <input v-model="widgetModal.form.items.link" placeholder="/products?category=activewear" required class="w-full p-2 border border-rose-blush/30 rounded" />
            </div>
          </div>

          <!-- Flexible Image Grid settings -->
          <div v-if="widgetModal.form.type === 'flexible-grid'" class="space-y-3">
            <div>
              <label class="block font-semibold mb-1 text-charcoal/70">Grid Layout Type *</label>
              <select v-model="widgetModal.form.items.layout" class="w-full p-2 border border-rose-blush/30 rounded" required>
                <option value="1-col">1 Column (1 Full Width Photo)</option>
                <option value="2-col">2 Columns (2 Photos in 1 Row)</option>
                <option value="3-col">3 Columns (3 Photos in 1 Row)</option>
                <option value="4-grid">4 Grid (4 Photos in 2 Rows & 2 Columns)</option>
              </select>
            </div>

            <!-- Demo Pre-load buttons -->
            <div class="bg-rose-blush/10 p-3 rounded border border-rose-blush/30 space-y-2">
              <span class="block font-semibold text-deep-plum text-[10px] uppercase tracking-wider">Demo Wise Templates</span>
              <div class="flex flex-wrap gap-2">
                <button type="button" @click="loadFlexibleGridDemo(1)" class="px-2 py-1 bg-white hover:bg-rose-blush border border-rose-blush/40 text-deep-plum text-[10px] rounded font-bold transition-all">Load 1 Photo Demo</button>
                <button type="button" @click="loadFlexibleGridDemo(2)" class="px-2 py-1 bg-white hover:bg-rose-blush border border-rose-blush/40 text-deep-plum text-[10px] rounded font-bold transition-all">Load 2 Photos Demo</button>
                <button type="button" @click="loadFlexibleGridDemo(3)" class="px-2 py-1 bg-white hover:bg-rose-blush border border-rose-blush/40 text-deep-plum text-[10px] rounded font-bold transition-all">Load 3 Photos Demo</button>
                <button type="button" @click="loadFlexibleGridDemo(4)" class="px-2 py-1 bg-white hover:bg-rose-blush border border-rose-blush/40 text-deep-plum text-[10px] rounded font-bold transition-all">Load 4 Photos Demo</button>
              </div>
            </div>

            <div class="flex items-center justify-between border-t border-rose-blush/10 pt-2">
              <label class="block font-semibold text-charcoal/70">Grid Photos</label>
              <button type="button" @click="addFlexibleGridPhoto" class="text-deep-plum font-semibold hover:underline">+ Add Photo</button>
            </div>

            <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              <div v-for="(photo, idx) in widgetModal.form.items.photos" :key="idx" class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2 relative">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[10px] uppercase text-deep-plum">Photo #{{ idx + 1 }}</span>
                  <button type="button" @click="widgetModal.form.items.photos.splice(idx, 1)" class="text-red-500 hover:underline">Remove</button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="block text-[10px] text-charcoal/50 mb-0.5">Image URL *</label>
                    <input v-model="photo.image" placeholder="Image URL" required class="w-full p-1.5 border border-rose-blush/30 rounded text-xs" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-charcoal/50 mb-0.5">Mobile Image URL</label>
                    <input v-model="photo.imageMobile" placeholder="Mobile Image URL" class="w-full p-1.5 border border-rose-blush/30 rounded text-xs" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="block text-[10px] text-charcoal/50 mb-0.5">Click Destination Link</label>
                    <input v-model="photo.link" placeholder="/products" required class="w-full p-1.5 border border-rose-blush/30 rounded text-xs" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-charcoal/50 mb-0.5">Overlay Category Title</label>
                    <input v-model="photo.title" placeholder="e.g. Signature Bras" class="w-full p-1.5 border border-rose-blush/30 rounded text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cards Carousel List (Shared by vertical and 3-set) -->
          <div v-if="widgetModal.form.type === 'vertical-carousel' || widgetModal.form.type === '3-set-carousel'" class="space-y-3">
            <div v-if="widgetModal.form.type === 'vertical-carousel'">
              <label class="block font-semibold mb-1 text-charcoal/70">Auto-Play Scroll Speed (seconds) *</label>
              <input v-model.number="widgetModal.form.items.interval" type="number" min="1" max="60" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="3" />
              <p class="text-[10px] text-charcoal/40 mt-1">Number of seconds to wait before auto-scrolling to the next card (e.g. 3 or 5).</p>
            </div>

            <!-- Styling/Dimensions Options -->
            <div class="bg-rose-blush/10 p-3 rounded border border-rose-blush/35 space-y-3 text-xs">
              <h5 class="font-bold text-[10px] text-deep-plum uppercase tracking-wider">Image Sizing & Style Settings</h5>
              <div class="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <label class="block font-semibold mb-1 text-charcoal/50">Width (e.g. 200px or leave blank for auto)</label>
                  <input v-model="widgetModal.form.items.cardWidth" placeholder="e.g. 200px" class="w-full p-2 border border-rose-blush/30 rounded" />
                </div>
                <div>
                  <label class="block font-semibold mb-1 text-charcoal/50">Height (e.g. 250px or leave blank for auto)</label>
                  <input v-model="widgetModal.form.items.cardHeight" placeholder="e.g. 250px" class="w-full p-2 border border-rose-blush/30 rounded" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <label class="block font-semibold mb-1 text-charcoal/50">Border Radius (e.g. 12px or 0px)</label>
                  <input v-model="widgetModal.form.items.borderRadius" placeholder="e.g. 12px" class="w-full p-2 border border-rose-blush/30 rounded" />
                </div>
                <div>
                  <label class="block font-semibold mb-1 text-charcoal/50">Object Fit Size</label>
                  <select v-model="widgetModal.form.items.objectFit" class="w-full p-2 border border-rose-blush/30 rounded">
                    <option value="cover">Cover (Fill & Crop)</option>
                    <option value="contain">Contain (Fit inside)</option>
                    <option value="fill">Fill (Stretch)</option>
                    <option value="none">Original Size</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center gap-6 pt-1">
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="widgetModal.form.items.widthFull" class="sr-only peer" />
                  <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-deep-plum"></div>
                  <span class="ms-2 text-[10px] font-semibold text-charcoal/85">Width Full (w-full)</span>
                </label>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="widgetModal.form.items.showBorders" class="sr-only peer" />
                  <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-deep-plum"></div>
                  <span class="ms-2 text-[10px] font-semibold text-charcoal/85">Show Card Borders</span>
                </label>
              </div>
            </div>
            <div class="flex items-center justify-between mb-2 border-t border-rose-blush/10 pt-3">
              <label class="block font-semibold text-charcoal/70">Card Slides</label>
              <button type="button" @click="addVerticalCarouselCardField" class="text-deep-plum font-semibold hover:underline">+ Add Card Slide</button>
            </div>
            
            <div class="space-y-3">
              <div v-for="(item, idx) in widgetModal.form.items.list" :key="idx" class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[10px] uppercase text-deep-plum">Card Slide #{{ idx + 1 }}</span>
                  <button type="button" @click="widgetModal.form.items.list.splice(idx, 1)" class="text-red-500 hover:underline">Remove</button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-rose-blush/30 rounded" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-rose-blush/30 rounded" />
                </div>
                <input v-model="item.link" placeholder="Destination Click Link (e.g. /products)" required class="w-full p-2 border border-rose-blush/30 rounded" />
              </div>
            </div>
          </div>

          <!-- Offers list for offers-slider sections -->
          <div v-if="widgetModal.form.type === 'offers-slider'">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-semibold text-charcoal/70">Saver Packs & Combos</label>
              <button type="button" @click="addOfferCardField" class="text-deep-plum font-semibold hover:underline">+ Add Combo Card</button>
            </div>
            <div class="space-y-3">
              <div v-for="(item, idx) in widgetModal.form.items" :key="idx" class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[10px] uppercase text-deep-plum">Offer #{{ idx + 1 }}</span>
                  <button type="button" @click="widgetModal.form.items.splice(idx, 1)" class="text-red-500 hover:underline">Remove</button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.image" placeholder="Image URL *" required class="p-2 border border-rose-blush/30 rounded" />
                  <input v-model="item.imageMobile" placeholder="Mobile Image URL" class="p-2 border border-rose-blush/30 rounded" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input v-model="item.link" placeholder="Combo Link (e.g. /products/combo)" required class="col-span-2 p-2 border border-rose-blush/30 rounded" />
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <input v-model="item.title" placeholder="Offer Title *" required class="col-span-2 p-2 border border-rose-blush/30 rounded" />
                  <input v-model="item.price" placeholder="Price (e.g. ₹799) *" required class="p-2 border border-rose-blush/30 rounded" />
                </div>
                <input v-model="item.subtitle" placeholder="Offer Description / Subtitle" class="w-full p-2 border border-rose-blush/30 rounded" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-rose-blush/10">
            <button type="button" @click="widgetModal.show = false" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button>
            <button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save Config</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  layout: 'admin'
})

const adminStore = useAdminStore()
const uiStore = useUIStore()

const activeTab = ref('overview')
const tabs = [
  { id: 'overview', name: 'Overview', icon: '📊' },
  { id: 'banners', name: 'Banners Carousel', icon: '🖼️' },
  { id: 'categories', name: 'Categories', icon: '🗂️' },
  { id: 'products', name: 'Products', icon: '🛍️' },
  { id: 'widgets', name: 'Widgets & Layout', icon: '⚙️' },
]

// Data states
const banners = ref<any[]>([])
const categories = ref<any[]>([])
const products = ref<any[]>([])
const widgets = ref<any[]>([])

// Loading states
const loadingData = ref(false)

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
    items: [] as any[]
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
  // calculate discount percent
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
      itemsVal = w.items ? JSON.parse(JSON.stringify(w.items)) : { btnText: 'Start Sizing Test', btnLink: '#', image: '', imageMobile: '' }
    } else if (w.type === 'countdown-banner' || w.type === 'image-only' || w.type === 'heading-banner') {
      itemsVal = w.items ? JSON.parse(JSON.stringify(w.items)) : { link: '/products', endDate: '' }
    } else if (w.type === 'flexible-grid') {
      itemsVal = w.items ? JSON.parse(JSON.stringify(w.items)) : { layout: '2-col', photos: [] }
    } else if (w.type === 'vertical-carousel' || w.type === '3-set-carousel') {
      itemsVal = w.items ? JSON.parse(JSON.stringify(w.items)) : { list: [] }
      if (!itemsVal.list) {
        itemsVal = { ...itemsVal, list: Array.isArray(itemsVal) ? itemsVal : [] }
      }
    } else {
      itemsVal = w.items ? JSON.parse(JSON.stringify(w.items)) : []
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
  } else if (widgetModal.value.form.type === 'countdown-banner' || widgetModal.value.form.type === 'image-only' || widgetModal.value.form.type === 'heading-banner') {
    widgetModal.value.form.items = { link: '/products', endDate: '' }
  } else if (widgetModal.value.form.type === 'flexible-grid') {
    widgetModal.value.form.items = { layout: '2-col', photos: [] }
  } else if (widgetModal.value.form.type === 'vertical-carousel' || widgetModal.value.form.type === '3-set-carousel') {
    widgetModal.value.form.items = { interval: 3, list: [] }
  } else {
    widgetModal.value.form.items = []
  }
}

const addFlexibleGridPhoto = () => {
  if (!widgetModal.value.form.items.photos) {
    widgetModal.value.form.items.photos = []
  }
  widgetModal.value.form.items.photos.push({ image: '', imageMobile: '', link: '/products', title: '' })
}

const loadFlexibleGridDemo = (count: number) => {
  const demoPhotos = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
      imageMobile: '',
      title: 'Summer Lingerie Collection',
      link: '/products?badge=sale'
    },
    {
      image: 'https://images.unsplash.com/photo-1628413993904-94ecb60f1239?w=600&q=80',
      imageMobile: '',
      title: 'Comfort Everyday Bras',
      link: '/products?category=bras'
    },
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
      imageMobile: '',
      title: 'Seamless Comfort Panties',
      link: '/products?category=panties'
    },
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      imageMobile: '',
      title: 'Elegant Shapewear',
      link: '/products?category=shapewear'
    },
    {
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80',
      imageMobile: '',
      title: 'Sleep & Lounge Wear',
      link: '/products?category=sleepwear'
    }
  ]

  widgetModal.value.form.items.photos = []
  if (count === 1) {
    widgetModal.value.form.items.layout = '1-col'
    widgetModal.value.form.items.photos.push(demoPhotos[0])
  } else if (count === 2) {
    widgetModal.value.form.items.layout = '2-col'
    widgetModal.value.form.items.photos.push(demoPhotos[1], demoPhotos[2])
  } else if (count === 3) {
    widgetModal.value.form.items.layout = '3-col'
    widgetModal.value.form.items.photos.push(demoPhotos[1], demoPhotos[3], demoPhotos[4])
  } else if (count === 4) {
    widgetModal.value.form.items.layout = '4-grid'
    widgetModal.value.form.items.photos.push(
      demoPhotos[1],
      demoPhotos[2],
      demoPhotos[3],
      {
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
        imageMobile: '',
        title: 'Active Bralettes',
        link: '/products?category=activewear'
      }
    )
  }
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
      // Create widget first (appended at end)
      const payload = {
        ...widgetModal.value.form,
        order: widgets.value.length + 1,
        enabled: true
      }
      await adminStore.createWidget(payload)
      uiStore.addToast('success', 'Custom widget created')

      // Re-fetch updated list then reorder if position differs from last
      await loadAllData()
      const newList = [...widgets.value]
      const newWidgetIdx = newList.length - 1
      const targetIdx = Math.max(0, Math.min(desiredPosition - 1, newList.length - 1))
      if (newWidgetIdx !== targetIdx) {
        // Move new widget to desired position by reordering all
        const [moved] = newList.splice(newWidgetIdx, 1)
        newList.splice(targetIdx, 0, moved)
        await Promise.all(
          newList.map((w: any, i: number) => adminStore.updateWidget(w._id, { order: i + 1 }))
        )
      }
    } else {
      await adminStore.updateWidget(widgetModal.value.itemId, widgetModal.value.form)
      uiStore.addToast('success', 'Widget settings saved')

      // Reposition if the position changed
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

  // Swap in local array first for instant UI feedback
  const newList = [...widgets.value]
  const tmp = newList[index]
  newList[index] = newList[targetIndex]
  newList[targetIndex] = tmp
  widgets.value = newList

  // Persist new order for all widgets (reassign sequential order values)
  try {
    await Promise.all(
      newList.map((w: any, i: number) => adminStore.updateWidget(w._id, { order: i + 1 }))
    )
  } catch (error: any) {
    uiStore.addToast('error', 'Failed to save new widget order')
    loadAllData() // revert on error
  }
}

// Image upload handlers are removed as requested, using URL-based images.
</script>
