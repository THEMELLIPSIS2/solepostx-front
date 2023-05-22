import parse from 'html-react-parser';
import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
const Policy = ({ policy }) => {
  return (
    <Layout>
      <div style={{textAlign:'center'}}>
        <h1>Privacy Policy</h1>
        <div style={{margin:'10%'}}>
          {parse(policy.attributes.Policy)}
          {console.log(policy)}
        </div>
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
