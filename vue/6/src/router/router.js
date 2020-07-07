
import MainNav from '@/pages/main/mainNav'
import Basic from '@/pages/basic/basic'
import Component from '@/pages/basic/component'
import Constructor from '@/pages/basic/constructor'
import Template from '@/pages/basic/template'
import Filter from '@/pages/basic/filter'
import Computed from '@/pages/basic/computed'
import Rendering from '@/pages/basic/rendering'
import ClassAndStyle from '@/pages/basic/classAndStyle'
import BaseDemo from '@/pages/basic/base-demo'
import ComponentLevup from '@/pages/levup/componentLevup'
import RouterLevup from '@/pages/levup/routerLevup'
import VueCli from '@/pages/senior/vue-cli'
import ToButtonTop from '@/components/tobuttontop'

export default  [
    {
        path: '/',
        name: 'MainNav',
        component: MainNav	
    },
    {
        path: '/',
        name: 'ToButtonTop',
        component: ToButtonTop
    },
    {
        path: '/basic',
        name: 'Basic',
        component: Basic
    },
    {
        path: '/component',
        name: 'Component',
        component: Component
    },
    {
        path: '/constructor',
        name: 'Constructor',
        component: Constructor
    },
    {
        path: '/template',
        name: 'Template',
        component: Template
    },
    {
        path: '/filter',
        name: 'Filter',
        component: Filter
    },
    {
        path: '/computed',
        name: 'Computed',
        component: Computed
    },
    {
        path: '/rendering',
        name: 'Rendering',
        component: Rendering
    },
    {
        path: '/classandstyle',
        name: 'ClassAndStyle',
        component: ClassAndStyle
    },
    {
        path: '/base-demo',
        name: 'BaseDemo',
        component: BaseDemo
    },
    {
        path: '/component-levup',
        name: 'ComponentLevup',
        component: ComponentLevup
    },
    {
        path: '/router-levup',
        name: 'RouterLevup',
        component: RouterLevup
    },
    {
        path: '/vuecli-high',
        name: 'VueCli',
        component: VueCli
    }
]