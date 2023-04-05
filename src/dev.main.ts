import Toolbar from '@/assets/core/Toolbar'
import TestPlugin from '@/assets/shared/Plugin/testPlugin'
import HeadingPlugin from '@/assets/shared/Plugin/Heading'
import Renderer from '@/assets/core/Renderer'

const toolbar = new Toolbar(new Renderer())
toolbar.registerPlugin(new TestPlugin()).registerPlugin(new HeadingPlugin())
toolbar.launch()

