import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import Header from '../../components/Header';

// Browser
function signIn({ providers }) {

  return (
    <>
    <Header/>
    <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
      <p className='text-4xl pt-44 '>M a s t i f y</p>
      <span className='pt-12 lg:pt-12'>Mastifyは次世代のSNSアプリです</span>
      <span className='pt-12'>Next.js / Firebase 9 / Tailwind CSS / Vercel</span>
      <div className='mt-20'>
        { Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/'})}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default signIn;

// Server
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
