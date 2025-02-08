import Hero from './_components/landing-page-components/Hero';
import Feature from './_components/landing-page-components/Feature';
import About from './_components/landing-page-components/About';


const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">

      <main className="flex-grow">

        <Hero />

        <Feature />

        <About />

      </main>

    </div>
  );
}

export default Page;