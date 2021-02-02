const Home = () => import('@/pages/home')
const Test = () => import('@/pages/test')
const Page2 = () => import('@/pages/page2')

const router = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/page2',
        name: 'Page2',
        component: Page2
    }
]
export default router
