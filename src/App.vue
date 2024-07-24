<script setup lang="ts">
import {onMounted, reactive, watch} from 'vue'
import {type IUser, TypeUser, useUsersStore} from '@/stores/users'
import UsersList from '@/components/UsersList.vue'

const {setUsers, users} = useUsersStore()

const usersList = reactive<IUser[]>([])

onMounted(() => {
  const localUsers = localStorage.getItem('users')
  if(localUsers)
  {
    const users = JSON.parse(localUsers)
    setUsers(users)
    usersList.push(...users)
  }
})

const addUser = () => {
  usersList.push({
    id: new Date().getUTCMilliseconds(),
    type: TypeUser.Local,
    mark: [],
    login: '',
    password: '',
  })
}

watch(users, (newUsers) => {
  usersList.length = 0
  Object.assign(usersList, newUsers)
})
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex flex-row align-items-center">
      <h1>Учетные записи</h1>
      <button
          type="button"
          @click="addUser"
         class="btn btn-primary ms-2 btn-lg"
      >
        +
      </button>
    </div>
    <div class="guide">
      <font-awesome-icon :icon="['fas', 'circle-question']" />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>
    <UsersList
      :users="usersList"
    />
  </div>
</template>

<style scoped lang="scss">
  .guide {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 5px;
    background-color: #eef4fa;
    margin-top: 5px;

    svg {
      width: 35px;
      height: 35px;
    }
  }
</style>
