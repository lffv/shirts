<template>
  <div class="page">
    <div class="container">
      <h1>About Us</h1>
      <div class="content">
        <h2>Our Story</h2>
        <p>
          TeeShop was founded in 2020 with a simple mission: to provide
          high-quality, stylish t-shirts that everyone can enjoy. We believe
          that great apparel should be accessible, comfortable, and fashionable.
        </p>

        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Quality:</strong> We only use premium materials and
            sustainable manufacturing practices
          </li>
          <li>
            <strong>Style:</strong> Our designs are curated to appeal to modern
            fashion preferences
          </li>
          <li>
            <strong>Sustainability:</strong> We're committed to reducing our
            environmental impact
          </li>
          <li>
            <strong>Community:</strong> We support local artists and designers
            through our platform
          </li>
        </ul>

        <h2>Our Team</h2>
        <p>
          Founded by fashion enthusiasts and entrepreneurs, TeeShop brings
          together expertise in design, manufacturing, and e-commerce to create
          an exceptional shopping experience.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page {
  padding: 3rem 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  line-height: 1.8;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary);
  margin: 2rem 0 1rem;
}

p {
  color: #6b7280;
  margin-bottom: 1rem;
}

ul {
  list-style: disc;
  padding-left: 1.5rem;
  color: #6b7280;
}

li {
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  .content {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>
