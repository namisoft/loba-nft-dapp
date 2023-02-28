<script lang="ts" setup>

import { createErc71Contract } from '@/services/erc721-factory';
import { reactive, ref } from 'vue'

const formCreatorDetails = reactive({
  name: 'Tuan Vu',
  email: 'tuanvd@gmail.com',
  website: 'nft.xyz',
});

const formLocationDetails = reactive({
  lat: 19.12,
  long: 31.7,
  zoneRadius: 20.0
});

const formNftDetails = reactive({
  name: "My NFT",
  symbol: "NCOOL",
  baseURI: "/my/nft",
  maxSupply: 668,
  mintPrice: 2
});

const onSubmitData = async () => {
  alert(JSON.stringify(formCreatorDetails));

  await createErc71Contract({
    nftName: formNftDetails.name,
    nftSymbol: formNftDetails.symbol,
    tokenMaxSupply: formNftDetails.maxSupply,
    baseURI: formNftDetails.baseURI,
    dropLat: formLocationDetails.lat,
    dropLong: formLocationDetails.long,
    dropZoneRadius: formLocationDetails.zoneRadius,
    mintPrice: formNftDetails.mintPrice
  }).catch(err => alert(err))
}

</script>

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs tab-position="left" class="tab-create-nft-steps">
        <el-tab-pane label="1. Creator Details">
          <el-form label-position="left" label-width="150px" style="max-width: 400px">
            <el-form-item label="Creator Name">
              <el-input v-model="formCreatorDetails.name" />
            </el-form-item>
            <el-form-item label="Creator Email">
              <el-input v-model="formCreatorDetails.email" />
            </el-form-item>
            <el-form-item label="Creator Website">
              <el-input v-model="formCreatorDetails.website" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="2. Location Details">
          <el-form label-position="left" label-width="150px" style="max-width: 400px">
            <el-form-item label="Drop Lat">
              <el-input v-model="formLocationDetails.lat" type="number" />
            </el-form-item>
            <el-form-item label="Drop Long">
              <el-input v-model="formLocationDetails.long" type="number" />
            </el-form-item>
            <el-form-item label="Zone Radius">
              <el-input v-model="formLocationDetails.zoneRadius" type="number" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="3. NFT Details">
          <el-form label-position="left" label-width="150px" style="max-width: 400px">
            <el-form-item label="NFT Name">
              <el-input v-model="formNftDetails.name" />
            </el-form-item>
            <el-form-item label="NFT Symbol">
              <el-input v-model="formNftDetails.symbol" />
            </el-form-item>
            <el-form-item label="Base URI">
              <el-input v-model="formNftDetails.baseURI" />
            </el-form-item>
            <el-form-item label="Max Supply">
              <el-input v-model="formNftDetails.maxSupply" type="number" />
            </el-form-item>
            <el-form-item label="Mint Price">
              <el-input v-model="formNftDetails.mintPrice" type="number" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="4. Submit !!!">
          <div>Click the below button to launch your NFT</div>
          <div style="margin-top: 20px;">
            <el-button type="primary" @click="onSubmitData" size="large" style="margin-left: 50px;">Submit</el-button>
          </div>

        </el-tab-pane>

      </el-tabs>
    </el-col>

  </el-row>

  <el-row :gutter="20">
    <el-col :span="24">

    </el-col>
  </el-row>

</template>


<style scoped>
.tab-create-nft-steps {
  height: 100%;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>