import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export enum TypeUser {
  Local,
  LDAP
}

export interface IMark {
  text: string
}

interface IBaseUser {
  id: number,
  mark: IMark[],
  type: TypeUser,
  login: string,
}

interface ILocalUser extends IBaseUser {
  type: TypeUser.Local,
  password: string,
}

interface ILDAPUser extends IBaseUser {
  type: TypeUser.LDAP,
  password?: null,
}

interface IError {
  field: string,
  message: string,
}

export type IUser = ILocalUser | ILDAPUser;

export const useUsersStore = defineStore('users', () => {
  const users = reactive<IUser[]>([])

  const updateUser = (user: IUser) => {
    const indexUser = users.findIndex(findUser => findUser.id === user.id)
    if (indexUser !== -1) {
      users[indexUser] = user

      return saveUsers()
    }
    users.push(user)
    saveUsers()
  }

  const removeUser = (idUser: number) => {
    const indexUser = users.findIndex(user => user.id === idUser)
    if (indexUser !== -1) {
      users.splice(indexUser, 1)
      return saveUsers()
    }

    return console.warn(`Пользователь с id ${idUser} не найден.`)
  }

  const setUsers = (getUsers: IUser[]) => {
    users.push(...getUsers)
  }

  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users))
  }

  return { users, setUsers, updateUser, removeUser }
})
