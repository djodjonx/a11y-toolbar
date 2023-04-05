import { onMounted, onBeforeUnmount } from "vue"
import type { Ref } from "vue"

export default function useHoverElement(
    componentRef: Ref<HTMLElement|null>,
    onMouseOver: () => void,
    onMouseLeave: () => void,
  ): void {
  onMounted(() => {
    (componentRef.value as HTMLElement).addEventListener('mouseover', onMouseOver);
    (componentRef.value as HTMLElement).addEventListener('mouseleave', onMouseLeave)
  })

  onBeforeUnmount(() => {
    (componentRef.value as HTMLElement).removeEventListener('mouseover', onMouseOver);
    (componentRef.value as HTMLElement).removeEventListener('mouseleave', onMouseLeave)
  })
}