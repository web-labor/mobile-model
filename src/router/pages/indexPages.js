const Home = () => import('@/pages/home')
const Test = () => import('@/pages/test')

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
    }
]
export default router
