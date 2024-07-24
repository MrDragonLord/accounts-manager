<script setup lang="ts">
import type { IUser } from '@/stores/users'
import {UserField} from '@/components/userfield'

defineProps<{
  users?: IUser[]
}>()
</script>

<template>
  <div class="row gx-2 mt-3">
    <div class="col-lg-3">Метки</div>
    <div class="col-lg-3">Тип записи</div>
    <div class="col-lg-3">Логин</div>
    <div class="col-lg-3">Пароль</div>
  </div>
  <UserField
      :user="user"
      @update-user=""
      v-for="user in users"
      :key="user.id" />
</template>

<style scoped>

</style>