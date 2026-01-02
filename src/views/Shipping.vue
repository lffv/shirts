<template>
  <div class="page">
    <div class="container">
      <h1>Shipping Information</h1>

      <div class="content">
        <h2>Shipping Methods</h2>
        <table class="shipping-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Delivery Time</th>
              <th>Cost</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard Shipping</td>
              <td>5-7 business days</td>
              <td>$9.99</td>
              <td>Available for all orders</td>
            </tr>
            <tr>
              <td>Express Shipping</td>
              <td>2-3 business days</td>
              <td>$24.99</td>
              <td>Orders placed before 2 PM EST</td>
            </tr>
            <tr>
              <td>Overnight Shipping</td>
              <td>Next business day</td>
              <td>$49.99</td>
              <td>Orders placed before 12 PM EST</td>
            </tr>
            <tr>
              <td>Free Shipping</td>
              <td>5-7 business days</td>
              <td>FREE</td>
              <td>Orders over $100</td>
            </tr>
          </tbody>
        </table>

        <h2>Processing Time</h2>
        <p>
          All orders are processed within 1-2 business days. Processing does not
          include delivery time.
        </p>

        <h2>Shipping Address</h2>
        <p>
          We ship to all addresses within the continental United States,
          including:
        </p>
        <ul>
          <li>Residential addresses</li>
          <li>Business addresses</li>
          <li>PO Boxes (Standard & Express only)</li>
          <li>Military addresses (APO/FPO)</li>
        </ul>

        <h2>International Shipping</h2>
        <p>
          We currently only ship within the United States. International
          shipping coming soon!
        </p>

        <h2>Tracking Your Order</h2>
        <p>
          Once your order ships, you'll receive a tracking number via email. You
          can use this number to track your package on our carrier's website.
        </p>

        <h2>Delivery Confirmation</h2>
        <p>
          All packages require a signature or are left in a safe place. You'll
          receive a notification once your package is delivered.
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

.shipping-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.shipping-table th,
.shipping-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
}

.shipping-table th {
  background: #f9fafb;
  font-weight: 700;
  color: var(--secondary);
}

.shipping-table tr:hover {
  background: #f9fafb;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  .content {
    padding: 1.5rem;
  }

  .shipping-table {
    font-size: 0.875rem;
  }

  .shipping-table th,
  .shipping-table td {
    padding: 0.75rem;
  }
}
</style>
