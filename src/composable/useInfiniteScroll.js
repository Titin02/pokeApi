import {onMounted, onBeforeUnmount} from "vue"

export function useInfiniteScroll({ fetchMore, loading, endOfList, disabled }) {
    function handleScroll() {
        if(disabled?.value) return

        const scrollTop = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.body.offsetHeight

        if(scrollTop + windowHeight >= documentHeight - 500 && !loading.value && !endOfList.value) {
            loading.value = true
            fetchMore()
        }
    }

    onMounted(() => {
    	window.addEventListener("scroll", handleScroll, {passive: true})
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll)
    })
}