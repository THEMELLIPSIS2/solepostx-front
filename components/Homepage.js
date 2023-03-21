import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import styles from './Homepage.module.css'
import { Card } from './card';

export const HomePage = ({ recents = [],features=[] }) => {

let [today,setToday] = useState(null)

useEffect(()=>{
setToday(new Date())
},[])

  function howLongAgo(date){
    let rightDate = new Date(date)
    let seconds = Math.floor((today - rightDate) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
  }

  return (
   
    <div className={styles.homepage} style={{width:'100%'}}> {console.log(recents)}
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>

            {
            recents.map((article) => {
              let date = article.attributes.createdAt
              let age = howLongAgo(date)
              return( 
             <Card article={article} age={age} key={article.title} className={styles.card}/>
              )
            })
            }

        </Grid>
        <Grid item xs={6}>

        {
            features.map((article) => {
              let date = article.attributes.createdAt
              let age = howLongAgo(date)
              return( 
             <Card article={article} age={age} className={styles.card} key={article.title}/>
              )
            })
            }

        </Grid>
        <Grid item xs={2}>
          <Paper>
            Socials
            </Paper>
        </Grid>

      </Grid>
    </div>
  );
};
