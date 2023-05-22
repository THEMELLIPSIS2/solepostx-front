import parse from 'html-react-parser';
import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
import Paper  from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
const Policy = ({ policy }) => {
  return (
    <Layout>
      
      <div style={{textAlign:'center'}} >
        <Typography variant='h3' color='secondary'>Privacy Policy</Typography>
        <Paper style={{textAlign:'center',margin:'5%'}}>
        <div style={{marginTop:'50px'}}>
          {parse(policy.attributes.Policy)}
        </div>
        </Paper>
      </div>
      
    </Layout>
  );
};
export async function getServerSideProps() {
  const policyRes = await fetchAPI('/p-policy');

  return {
    props: { policy: policyRes.data },
  };
}

export default Policy;
