
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

interface _GlobalComponents {
  AppBadge: typeof import("../../components/atoms/AppBadge.vue")['default']
  AppButton: typeof import("../../components/atoms/AppButton.vue")['default']
  AppInput: typeof import("../../components/atoms/AppInput.vue")['default']
  AppRating: typeof import("../../components/atoms/AppRating.vue")['default']
  AppSpinner: typeof import("../../components/atoms/AppSpinner.vue")['default']
  SkeletonBox: typeof import("../../components/atoms/SkeletonBox.vue")['default']
  CategoryTile: typeof import("../../components/molecules/CategoryTile.vue")['default']
  ProductCard: typeof import("../../components/molecules/ProductCard.vue")['default']
  ProductCardSkeleton: typeof import("../../components/molecules/ProductCardSkeleton.vue")['default']
  ReviewCard: typeof import("../../components/molecules/ReviewCard.vue")['default']
  HeroBanner: typeof import("../../components/organisms/HeroBanner.vue")['default']
  MobileMenu: typeof import("../../components/organisms/MobileMenu.vue")['default']
  QuickViewModal: typeof import("../../components/organisms/QuickViewModal.vue")['default']
  SearchOverlay: typeof import("../../components/organisms/SearchOverlay.vue")['default']
  SizeGuideModal: typeof import("../../components/organisms/SizeGuideModal.vue")['default']
  TheFooter: typeof import("../../components/organisms/TheFooter.vue")['default']
  TheNavbar: typeof import("../../components/organisms/TheNavbar.vue")['default']
  ToastNotifications: typeof import("../../components/organisms/ToastNotifications.vue")['default']
  SectionBestSellers: typeof import("../../components/sections/SectionBestSellers.vue")['default']
  SectionBrandUSP: typeof import("../../components/sections/SectionBrandUSP.vue")['default']
  SectionCustomerReviews: typeof import("../../components/sections/SectionCustomerReviews.vue")['default']
  SectionEverydayComfort: typeof import("../../components/sections/SectionEverydayComfort.vue")['default']
  SectionFeaturedProducts: typeof import("../../components/sections/SectionFeaturedProducts.vue")['default']
  SectionNewArrivals: typeof import("../../components/sections/SectionNewArrivals.vue")['default']
  SectionShopByCategory: typeof import("../../components/sections/SectionShopByCategory.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  VitePwaManifest: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
  NuxtPwaManifest: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
  NuxtPwaAssets: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
  PwaAppleImage: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
  PwaAppleSplashScreenImage: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
  PwaFaviconImage: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
  PwaMaskableImage: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
  PwaTransparentImage: typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAppBadge: LazyComponent<typeof import("../../components/atoms/AppBadge.vue")['default']>
  LazyAppButton: LazyComponent<typeof import("../../components/atoms/AppButton.vue")['default']>
  LazyAppInput: LazyComponent<typeof import("../../components/atoms/AppInput.vue")['default']>
  LazyAppRating: LazyComponent<typeof import("../../components/atoms/AppRating.vue")['default']>
  LazyAppSpinner: LazyComponent<typeof import("../../components/atoms/AppSpinner.vue")['default']>
  LazySkeletonBox: LazyComponent<typeof import("../../components/atoms/SkeletonBox.vue")['default']>
  LazyCategoryTile: LazyComponent<typeof import("../../components/molecules/CategoryTile.vue")['default']>
  LazyProductCard: LazyComponent<typeof import("../../components/molecules/ProductCard.vue")['default']>
  LazyProductCardSkeleton: LazyComponent<typeof import("../../components/molecules/ProductCardSkeleton.vue")['default']>
  LazyReviewCard: LazyComponent<typeof import("../../components/molecules/ReviewCard.vue")['default']>
  LazyHeroBanner: LazyComponent<typeof import("../../components/organisms/HeroBanner.vue")['default']>
  LazyMobileMenu: LazyComponent<typeof import("../../components/organisms/MobileMenu.vue")['default']>
  LazyQuickViewModal: LazyComponent<typeof import("../../components/organisms/QuickViewModal.vue")['default']>
  LazySearchOverlay: LazyComponent<typeof import("../../components/organisms/SearchOverlay.vue")['default']>
  LazySizeGuideModal: LazyComponent<typeof import("../../components/organisms/SizeGuideModal.vue")['default']>
  LazyTheFooter: LazyComponent<typeof import("../../components/organisms/TheFooter.vue")['default']>
  LazyTheNavbar: LazyComponent<typeof import("../../components/organisms/TheNavbar.vue")['default']>
  LazyToastNotifications: LazyComponent<typeof import("../../components/organisms/ToastNotifications.vue")['default']>
  LazySectionBestSellers: LazyComponent<typeof import("../../components/sections/SectionBestSellers.vue")['default']>
  LazySectionBrandUSP: LazyComponent<typeof import("../../components/sections/SectionBrandUSP.vue")['default']>
  LazySectionCustomerReviews: LazyComponent<typeof import("../../components/sections/SectionCustomerReviews.vue")['default']>
  LazySectionEverydayComfort: LazyComponent<typeof import("../../components/sections/SectionEverydayComfort.vue")['default']>
  LazySectionFeaturedProducts: LazyComponent<typeof import("../../components/sections/SectionFeaturedProducts.vue")['default']>
  LazySectionNewArrivals: LazyComponent<typeof import("../../components/sections/SectionNewArrivals.vue")['default']>
  LazySectionShopByCategory: LazyComponent<typeof import("../../components/sections/SectionShopByCategory.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyVitePwaManifest: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
  LazyNuxtPwaManifest: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
  LazyNuxtPwaAssets: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
  LazyPwaAppleImage: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
  LazyPwaAppleSplashScreenImage: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
  LazyPwaFaviconImage: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
  LazyPwaMaskableImage: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
  LazyPwaTransparentImage: LazyComponent<typeof import("../../node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
