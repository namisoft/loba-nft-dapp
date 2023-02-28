
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

import { computed, reactive, ref } from 'vue';
import { connectWallet, getConnectedWallet, disconnectWallet } from "@/services/massa-client"
import router from "./router";

const activeIndex = ref('1');

const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}


const connectWalletDialogVisible = ref(false);
const walletConnected = ref(false);

const formConnectWallet = reactive({
  privateKey: ""
})

const onConnectWallet = async () => {
  connectWalletDialogVisible.value = true
}

const onDisconnectWallet = () => {
  disconnectWallet();
  walletConnected.value = false;
  // redirect to 'Home' page
  router.replace({ path: '/' });
  activeIndex.value = '1';
}

const onConnectWalletConfirm = async () => {
  const rConnect = await connectWallet(formConnectWallet.privateKey);
  if (rConnect) {
    walletConnected.value = true;
    connectWalletDialogVisible.value = false
  }
}

</script>
<template>
  <el-container class="main-container">
    <el-header>
      <el-menu :default-active="activeIndex"   class="header-menu" mode="horizontal" :router=true @select="handleSelect">
        <el-menu-item index="1" route="/">Home</el-menu-item>
        <el-menu-item index="2" route="/create-nft" v-show="walletConnected" >Create</el-menu-item>
        <el-menu-item index="3" route="/about">About</el-menu-item>
      </el-menu>
      <div>
        <el-button v-if="!walletConnected" type="danger" @click="onConnectWallet" size="large" round
          style="margin-left: 50px;">Connect Wallet</el-button>
        <el-button v-else type="info" @click="onDisconnectWallet" size="large" round
          style="margin-left: 50px;">Disconnect Wallet</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" :isWalletConneted="walletConnected" />
        </router-view>

      <el-dialog v-model="connectWalletDialogVisible" title="[Demo] Connect Your Wallet">
        <el-form :model="formConnectWallet">
          <el-form-item label="Private Key" label-width="140px">
            <el-input v-model="formConnectWallet.privateKey" autocomplete="off" />
          </el-form-item>
          <div><span style="color: orange;">Your private key will never left the browser, worry no!</span></div>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="connectWalletDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onConnectWalletConfirm">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>

    </el-main>
    <el-footer>
      <div style="text-align: center;">Copyright 2022</div>
    </el-footer>
  </el-container>
</template>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.main-container {
  height: 90vh;
  width: 90vw;
  background-color: white;
}

.main-container .el-header {
  position: relative;
  width: 100%;
}


.main-container .el-main {
  padding: 30px;
  width: 100%;
  height: 100%;
}

.main-container .el-footer {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 50px;
  background-color: whitesmoke;
  color: var(--el-text-color-primary-dark);
}

.main-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.header-menu {
  width: 100%;
}
</style>
