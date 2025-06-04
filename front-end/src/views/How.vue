<template>
  <div class="how-page">
    <div class="how-content">
      <h1 class="text-4xl font-bold mb-8">How It Works</h1>
      
      <div class="steps-container">
        <div class="step-card" v-for="(step, index) in steps" :key="index">
          <div class="step-number bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
            {{ index + 1 }}
          </div>
          <div class="step-content">
            <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    title: 'Find Your Property',
    description: 'Browse through our extensive list of verified rental properties using our advanced search filters.'
  },
  {
    title: 'Contact the Owner',
    description: 'Connect directly with property owners through our secure messaging system.'
  },
  {
    title: 'Schedule a Visit',
    description: 'Coordinate a viewing time that works for both you and the property owner.'
  },
  {
    title: 'Sign the Agreement',
    description: 'Complete the rental agreement process with our secure digital signing system.'
  },
  {
    title: 'Move In',
    description: 'Receive all necessary keys and documents to start your tenancy.'
  }
]
</script>

<style scoped>
.how-page {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.how-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.step-number {
  font-weight: bold;
}

.step-content {
  flex: 1;
}
</style>