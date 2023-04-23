import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Shoe from '../public/shoe.svg'
import styles from '../styles/Home.module.css'
const NotFoundPage = () => {
    const router= useRouter()
    return (
    <div className={styles.four}>
        <div>
    Nothing here
    </div>

 <Shoe className={styles.shoe} />

    <Button onClick={()=>router.back()}>Go back</Button>
    </div> )
}

export default NotFoundPage