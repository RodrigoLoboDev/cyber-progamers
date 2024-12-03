import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SCaruselNoticias = () => {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <Skeleton className='bg-gray-200 h-40 w-full' />
            <Skeleton className='bg-gray-200 h-40 w-full' />
        </div>
    )
}

export default SCaruselNoticias