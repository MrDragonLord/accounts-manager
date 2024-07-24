<script setup lang="ts">
import { InputText } from '@/components/inputtext'
import { Select } from '@/components/select'
import { InputPassword } from '@/components/inputpassword'
import { userFieldLogic } from './userFieldLogic'
import {type IUser, TypeUser} from '@/stores/users'
import {onMounted, watch} from 'vue';

const props = defineProps<{
  user: IUser
}>()

const {
  user,
  errors,
  markText,
  markInput,
  validateForm,
  removeUser
} = userFieldLogic(props)

onMounted(() => {
  markText.value = user.mark.map(({text}) => (text)).join(';')
})

watch(() => user.type, (newType) => {
  if(newType === TypeUser.LDAP) {
    user.password = null
  }
})
</script>

<template>
  <div class="row gx-2 mt-2 user-field">
    <div class="col-lg-3">
      <InputText
          v-model="markText"
          @blur="markInput"
          placeholder="Значение"
          :class="errors.mark && 'is-invalid'"
      />
    </div>
    <div class="col-lg-3">
      <Select
          v-model="user.type"
          @change="validateForm"
          :options="[
              {label: 'LDAP', value: TypeUser.LDAP},
              {label: 'Локальная', value: TypeUser.Local}
          ]"
      />
    </div>
    <div
        :class="user.type === TypeUser.LDAP ? 'col-lg-6' : 'col-lg-3'">
      <InputText
          v-model="user.login"
          @blur="validateForm"
          placeholder="Значение"
          :class="errors.login && 'is-invalid'"
      />
    </div>
    <div
        class="col-lg-3"
        v-if="user.type === TypeUser.Local">
      <InputPassword
          v-model="user.password"
          @blur="validateForm"
          placeholder="Значение"
          :class="errors.password && 'is-invalid'"
      />
    </div>
    <button type="button" class="btn btn-remove" @click.prevent="removeUser(user.id)">
      <font-awesome-icon :icon="['fas', 'trash-can']" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.user-field {
  position: relative;

  .btn-remove {
    position: absolute;
    right: -31px;
    top: 4%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
