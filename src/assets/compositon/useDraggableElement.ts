import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export default function useDraggable(element: Ref<HTMLElement|null>, initialMargin: number = 0, target?: string) {
  const positions = ref({
    left: 0,
    top: 0
  })

  // Wire up draggable surface
  let draggable: HTMLElement
  let isDragging = false

  // Variables for the starting positions of the mouse and panel
  let initMouseX: number, initMouseY: number, initPanelLeft: number, initPanelTop: number

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    // Start dragging, and record initial mouse and panel
    // positions
    isDragging = true

    initMouseX = e.pageX
    initMouseY = e.pageY

    initPanelLeft = positions.value.left
    initPanelTop = positions.value.top
  } 
  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    isDragging = false
  } 
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return
    }
    e.preventDefault()

    const deltaX = e.pageX - initMouseX
    const deltaY = e.pageY - initMouseY

    positions.value.left = initPanelLeft + deltaX
    positions.value.top = initPanelTop + deltaY
  } 

  onMounted(() => {
    draggable = (target ? element.value?.querySelector(target) : element.value) as HTMLElement

    positions.value.left = window.innerWidth - (element.value?.offsetWidth ?? 0) - initialMargin, // INITIAL_PANEL_MARGIN_PX,
    positions.value.top = window.innerHeight - (element.value?.offsetHeight ?? 0) - initialMargin // INITIAL_PANEL_MARGIN_PX,
    
    draggable?.addEventListener("mousedown", onMouseDown)

    draggable?.addEventListener("mouseup", onMouseUp)

    window.addEventListener("mousemove", onMouseMove);
  })

  onUnmounted(() => {
    draggable?.removeEventListener("mousedown", onMouseDown)

    draggable?.removeEventListener("mouseup", onMouseUp)

    window.removeEventListener("mousemove", onMouseMove);
  })

  return {
    positions,
  }
}