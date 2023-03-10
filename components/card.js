import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from './Homepage.module.css'
import Link from 'next/link';
import { getStrapiMedia } from '../lib/media';


export const Card = ({article, age}) => {
    let capitalized = article.attributes.title.split(' ').map(word => {
      return word[0].toUpperCase() + word.substring(1); 
    }).join(' ')
    return (
        <div key={article.id} className={styles.card}>
        <Paper className={styles.article}style={{margin:'10px'}}>
        <Link href={`/article/${article.attributes.slug}`}> 
        <Typography className={styles.header} variant='h6'>{capitalized}</Typography>
         <img className={styles.image} src={getStrapiMedia(article.attributes.image)} />
         </Link>
          <Typography variant='small' component='small'>{age} ago</Typography>
        </Paper>
      </div>
    )
}