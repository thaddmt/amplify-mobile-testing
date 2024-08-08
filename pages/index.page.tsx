import dynamic from 'next/dynamic';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../src/aws-exports';
import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';

const configuration = {
  ...awsExports,
  // API: {
  //   REST: {
  //     SampleBackend: {
  //       endpoint: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  //       region: process.env.NEXT_PUBLIC_BACKEND_API_REGION,
  //     }
  //   }
  // },
  // aws_cloud_logic_custom: [
  //   {
  //       name: "BYOB",
  //       endpoint: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  //       region: process.env.NEXT_PUBLIC_BACKEND_API_REGION,
  //   }
  // ]
}
Amplify.configure(configuration);

const App = () => {
  return (
    <Layout>
      <LivenessDefault />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
