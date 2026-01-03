<template>
  <div class="page">
    <div class="container">
      <h1>Returns & Refunds</h1>

      <div class="content">
        <h2>Return Policy</h2>
        <p>
          At TeeShop, customer satisfaction is our top priority. If you're not
          completely satisfied with your purchase, we make returning items easy
          and hassle-free.
        </p>

        <div class="policy-box">
          <h3>Return Period</h3>
          <p><strong>30 days</strong> from the date of delivery</p>
        </div>

        <h2>Eligibility Requirements</h2>
        <p>
          To be eligible for a return, your item must meet the following
          conditions:
        </p>
        <ul>
          <li>Unworn and unwashed (no signs of wear)</li>
          <li>In original condition with no damage</li>
          <li>All original tags attached</li>
          <li>Accompanied by the original receipt or proof of purchase</li>
          <li>In original packaging when possible</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <p>The following items cannot be returned:</p>
        <ul>
          <li>Items with signs of wear, washing, or alteration</li>
          <li>Items without original tags</li>
          <li>Clearance or final sale items</li>
          <li>Items purchased more than 30 days ago</li>
          <li>Damaged items due to customer mishandling</li>
        </ul>

        <h2>How to Return an Item</h2>
        <ol class="steps">
          <li>
            <strong>Contact Us:</strong> Reach out to our customer service team
            at returns@teeshop.com with your order number and reason for return.
          </li>
          <li>
            <strong>Receive Return Authorization:</strong> We'll provide you
            with a return authorization number and prepaid return shipping label
            (for defective items).
          </li>
          <li>
            <strong>Ship Your Item:</strong> Pack the item securely and ship it
            to the address provided. Use the return authorization number as
            reference.
          </li>
          <li>
            <strong>Inspection & Refund:</strong> Once we receive and inspect
            your item, we'll process your refund within 5-7 business days.
          </li>
        </ol>

        <h2>Return Shipping</h2>
        <div class="shipping-info">
          <div class="info-card">
            <h4>Defective Items</h4>
            <p>We provide a prepaid return shipping label at no cost to you.</p>
          </div>
          <div class="info-card">
            <h4>Customer Returns</h4>
            <p>
              Customers are responsible for return shipping costs unless the
              item is defective or incorrect.
            </p>
          </div>
          <div class="info-card">
            <h4>International Returns</h4>
            <p>
              Please contact customer service for return instructions. You may
              be responsible for return shipping costs.
            </p>
          </div>
        </div>

        <h2>Refund Process</h2>
        <p>
          Once we inspect your returned item and confirm it meets our return
          criteria, we'll process your refund. Refunds are issued to the
          original payment method and typically appear within 5-7 business days.
          Please note that it may take an additional 1-2 billing cycles for the
          refund to show on your statement.
        </p>

        <h2>Exchanges</h2>
        <p>
          If you'd like to exchange an item for a different size or color, we
          can arrange this for you. Simply initiate a return and place a new
          order for the desired item, or contact us at exchanges@teeshop.com for
          assistance with direct exchanges (available for select items).
        </p>

        <h2>Damaged or Defective Items</h2>
        <p>
          If you receive a damaged or defective item, please report it within 48
          hours of delivery. Include photos of the damage or defect, and we'll
          immediately send a replacement at no cost, including a prepaid return
          label for the damaged item.
        </p>

        <h2>Contact Information</h2>
        <p>Have questions about returns? We're here to help!</p>
        <ul>
          <li>Email: <strong>returns@teeshop.com</strong></li>
          <li>Phone: <strong>1-800-TEESHOP (1-800-833-7467)</strong></li>
          <li>Hours: Monday - Friday, 9 AM - 6 PM EST</li>
        </ul>

        <h2>Exceptions</h2>
        <p>
          While we stand behind all our products, there may be rare
          circumstances where exceptions to this policy apply. These will be
          handled on a case-by-case basis by our customer service team.
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
  max-width: 4xl;
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

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary);
  margin: 1rem 0 0.5rem;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

p {
  color: #6b7280;
  margin-bottom: 1rem;
}

ul {
  list-style: disc;
  padding-left: 1.5rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.75rem;
}

.policy-box {
  background: linear-gradient(135deg, var(--primary), #60a5fa);
  color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.policy-box h3 {
  color: white;
  margin-top: 0;
}

.policy-box p {
  color: white;
  font-size: 1.1rem;
  margin: 0;
}

.steps {
  list-style: decimal;
  padding-left: 1.5rem;
  color: #6b7280;
}

.steps li {
  margin-bottom: 1rem;
}

.shipping-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.info-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--primary);
}

.info-card h4 {
  margin-top: 0;
}

.info-card p {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  .content {
    padding: 1.5rem;
  }

  .shipping-info {
    grid-template-columns: 1fr;
  }
}
</style>
