import { reactive, ref } from 'vue'
import { type IUser, TypeUser, useUsersStore } from '@/stores/users'

export const userFieldLogic = (props: {user: IUser}) => {
	const { updateUser, removeUser } = useUsersStore()

	const user = reactive<IUser>({...props.user})

	const errors = reactive({
		login: false,
		password: false,
		mark: false
	})

	const markText = ref<string>()

	const markInput = () => {
		if(markText.value !== undefined && markText.value?.length > 0) {
			const mark = markText.value.split(';').map((mark) => ({text: mark}))
			errors.mark = markText.value.length > 50
			user.mark = mark

			validateForm()
		}
	}

	const validateForm = () => {
		errors.login = user.login.length === 0 || user.login.length > 100
		if (user.type === TypeUser.Local) {
			errors.password = user.password?.length === 0 || user.password?.length > 100
		} else {
			errors.password = false
		}
		if(!errors.login && !errors.password && !errors.mark)
		{
			updateUser(user)
		}
	}

	return {
		user,
		errors,
		markText,
		markInput,
		validateForm,
		removeUser
	}
}
