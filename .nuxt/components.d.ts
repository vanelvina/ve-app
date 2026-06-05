
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AppBadge: typeof import("../components/atoms/AppBadge.vue")['default']
export const AppButton: typeof import("../components/atoms/AppButton.vue")['default']
export const AppInput: typeof import("../components/atoms/AppInput.vue")['default']
export const AppRating: typeof import("../components/atoms/AppRating.vue")['default']
export const AppSpinner: typeof import("../components/atoms/AppSpinner.vue")['default']
export const SkeletonBox: typeof import("../components/atoms/SkeletonBox.vue")['default']
export const CategoryTile: typeof import("../components/molecules/CategoryTile.vue")['default']
export const ProductCard: typeof import("../components/molecules/ProductCard.vue")['default']
export const ProductCardSkeleton: typeof import("../components/molecules/ProductCardSkeleton.vue")['default']
export const ReviewCard: typeof import("../components/molecules/ReviewCard.vue")['default']
export const HeroBanner: typeof import("../components/organisms/HeroBanner.vue")['default']
export const MobileMenu: typeof import("../components/organisms/MobileMenu.vue")['default']
export const QuickViewModal: typeof import("../components/organisms/QuickViewModal.vue")['default']
export const SearchOverlay: typeof import("../components/organisms/SearchOverlay.vue")['default']
export const SizeGuideModal: typeof import("../components/organisms/SizeGuideModal.vue")['default']
export const TheFooter: typeof import("../components/organisms/TheFooter.vue")['default']
export const TheNavbar: typeof import("../components/organisms/TheNavbar.vue")['default']
export const ToastNotifications: typeof import("../components/organisms/ToastNotifications.vue")['default']
export const SectionBestSellers: typeof import("../components/sections/SectionBestSellers.vue")['default']
export const SectionBrandUSP: typeof import("../components/sections/SectionBrandUSP.vue")['default']
export const SectionCustomerReviews: typeof import("../components/sections/SectionCustomerReviews.vue")['default']
export const SectionEverydayComfort: typeof import("../components/sections/SectionEverydayComfort.vue")['default']
export const SectionFeaturedProducts: typeof import("../components/sections/SectionFeaturedProducts.vue")['default']
export const SectionNewArrivals: typeof import("../components/sections/SectionNewArrivals.vue")['default']
export const SectionShopByCategory: typeof import("../components/sections/SectionShopByCategory.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const VitePwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaManifest: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaAssets: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
export const PwaAppleImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
export const PwaAppleSplashScreenImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
export const PwaFaviconImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
export const PwaMaskableImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
export const PwaTransparentImage: typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAppBadge: LazyComponent<typeof import("../components/atoms/AppBadge.vue")['default']>
export const LazyAppButton: LazyComponent<typeof import("../components/atoms/AppButton.vue")['default']>
export const LazyAppInput: LazyComponent<typeof import("../components/atoms/AppInput.vue")['default']>
export const LazyAppRating: LazyComponent<typeof import("../components/atoms/AppRating.vue")['default']>
export const LazyAppSpinner: LazyComponent<typeof import("../components/atoms/AppSpinner.vue")['default']>
export const LazySkeletonBox: LazyComponent<typeof import("../components/atoms/SkeletonBox.vue")['default']>
export const LazyCategoryTile: LazyComponent<typeof import("../components/molecules/CategoryTile.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../components/molecules/ProductCard.vue")['default']>
export const LazyProductCardSkeleton: LazyComponent<typeof import("../components/molecules/ProductCardSkeleton.vue")['default']>
export const LazyReviewCard: LazyComponent<typeof import("../components/molecules/ReviewCard.vue")['default']>
export const LazyHeroBanner: LazyComponent<typeof import("../components/organisms/HeroBanner.vue")['default']>
export const LazyMobileMenu: LazyComponent<typeof import("../components/organisms/MobileMenu.vue")['default']>
export const LazyQuickViewModal: LazyComponent<typeof import("../components/organisms/QuickViewModal.vue")['default']>
export const LazySearchOverlay: LazyComponent<typeof import("../components/organisms/SearchOverlay.vue")['default']>
export const LazySizeGuideModal: LazyComponent<typeof import("../components/organisms/SizeGuideModal.vue")['default']>
export const LazyTheFooter: LazyComponent<typeof import("../components/organisms/TheFooter.vue")['default']>
export const LazyTheNavbar: LazyComponent<typeof import("../components/organisms/TheNavbar.vue")['default']>
export const LazyToastNotifications: LazyComponent<typeof import("../components/organisms/ToastNotifications.vue")['default']>
export const LazySectionBestSellers: LazyComponent<typeof import("../components/sections/SectionBestSellers.vue")['default']>
export const LazySectionBrandUSP: LazyComponent<typeof import("../components/sections/SectionBrandUSP.vue")['default']>
export const LazySectionCustomerReviews: LazyComponent<typeof import("../components/sections/SectionCustomerReviews.vue")['default']>
export const LazySectionEverydayComfort: LazyComponent<typeof import("../components/sections/SectionEverydayComfort.vue")['default']>
export const LazySectionFeaturedProducts: LazyComponent<typeof import("../components/sections/SectionFeaturedProducts.vue")['default']>
export const LazySectionNewArrivals: LazyComponent<typeof import("../components/sections/SectionNewArrivals.vue")['default']>
export const LazySectionShopByCategory: LazyComponent<typeof import("../components/sections/SectionShopByCategory.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyVitePwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaManifest: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaAssets: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
export const LazyPwaAppleImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
export const LazyPwaAppleSplashScreenImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
export const LazyPwaFaviconImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
export const LazyPwaMaskableImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
export const LazyPwaTransparentImage: LazyComponent<typeof import("../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
