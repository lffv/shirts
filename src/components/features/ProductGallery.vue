<template>
  <div class="product-gallery">
    <!-- Main Image -->
    <div class="gallery-main">
      <img
        :src="images[currentIndex]"
        :alt="`Product image ${currentIndex + 1}`"
        class="gallery-main-img"
      />

      <!-- Navigation Buttons -->
      <button
        v-if="images.length > 1"
        class="gallery-nav gallery-nav-prev"
        @click="previousImage"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        v-if="images.length > 1"
        class="gallery-nav gallery-nav-next"
        @click="nextImage"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- Image Counter -->
      <div v-if="images.length > 1" class="gallery-counter">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="gallery-thumbnails">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['gallery-thumbnail', { active: index === currentIndex }]"
        @click="currentIndex = index"
        :aria-label="`View image ${index + 1}`"
      >
        <img :src="image" :alt="`Thumbnail ${index + 1}`" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  images: string[];
}

const props = defineProps<Props>();

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const previousImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
};
</script>

<style scoped>
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-main {
  position: relative;
  background: #f3f4f6;
  border-radius: 0.75rem;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--secondary);
  transition: all 0.2s ease;
  z-index: 10;
}

.gallery-nav:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-nav-prev {
  left: 1rem;
}

.gallery-nav-next {
  right: 1rem;
}

.gallery-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.gallery-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.75rem;
}

.gallery-thumbnail {
  aspect-ratio: 1;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  background: #f3f4f6;
  transition: all 0.2s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumbnail:hover {
  border-color: #d1d5db;
}

.gallery-thumbnail.active {
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .gallery-thumbnails {
    grid-template-columns: repeat(5, 1fr);
  }

  .gallery-nav {
    width: 36px;
    height: 36px;
  }
}
</style>
