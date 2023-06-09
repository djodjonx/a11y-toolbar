import Toolbar from '@/assets/core/Toolbar'
import Plugin from '@/assets/shared/Plugin'
import HeadingPlugin from '@/assets/shared/Plugin/Heading'
import Renderer from '@/assets/core/Renderer'

const toolbar = new Toolbar(new Renderer())
export default toolbar

export { 
  Plugin,
  HeadingPlugin,
}

