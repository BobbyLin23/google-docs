import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSearchParams(key: string) {
  const route = useRoute()
  const router = useRouter()
  // const value = ref(route.query[key] as string || '')
  const value = useState(key, () => route.query[key] as string || '')

  watch(value, (newValue) => {
    const query = { ...route.query }
    if (newValue) {
      query[key] = newValue
    }
    else {
      delete query[key]
    }
    router.replace({ query })
  })

  const setValue = (newVal: string) => {
    value.value = newVal
  }

  return {
    value,
    setValue,
  }
}
