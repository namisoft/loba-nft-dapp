<script setup lang="ts">
import { getConnectedWallet } from '@/services/massa-client';
import { computed } from '@vue/reactivity';


const props = defineProps({
  isWalletConneted: Boolean
});

const connectedWallet = computed(() => {
  return props.isWalletConneted ? getConnectedWallet()?.address : ""
})


</script>

<template>

  <main>
    <div v-if="props.isWalletConneted">
      <span>Connected Wallet: {{ connectedWallet }}</span>
    </div>
    <div v-else>
      <span>Please connect your wallet</span>
    </div>
  </main>
</template>
