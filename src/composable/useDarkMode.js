import { ref, onMounted } from "vue"

export function useDarkMode() {
	const darkMode = ref(false)

	const toggleDarkMode = () => {
		darkMode.value = !darkMode.value
		document.documentElement.classList.toggle("dark", darkMode.value)
		localStorage.setItem("darkMode", darkMode.value ? "true" : "false")
	}

	onMounted(() => {
		const saved = localStorage.getItem("darkMode")
		const prefers = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches
		darkMode.value = saved === "true" || (!saved && prefers)
		document.documentElement.classList.toggle("dark", darkMode.value)
	})

	return {
		darkMode,
		toggleDarkMode,
	}
}
