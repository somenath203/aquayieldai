import { FaServer, FaCogs, FaChartBar, FaLeaf } from 'react-icons/fa';


const Feature = () => {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Precision Irrigation
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance irrigation efficiency with real-time data processing, predictive analytics, and automated decision-making.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaServer className="text-blue-500" />,
              title: 'Real-time Data Processing',
              description:
                'Seamlessly process real-time soil, weather, and crop data for instant irrigation decisions.',
            },
            {
              icon: <FaCogs className="text-green-500" />,
              title: 'AI-Powered Optimization',
              description:
                'Utilize large language models to optimize irrigation schedules and reduce water waste.',
            },
            {
              icon: <FaChartBar className="text-purple-500" />,
              title: 'Predictive Analytics',
              description:
                'Analyze future trends for better water management strategies.',
            },
            {
              icon: <FaLeaf className="text-blue-700" />,
              title: 'Sustainable Agriculture',
              description:
                'Leverage smart irrigation to promote healthier crops while conserving natural resources.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >

              <div className="text-4xl mb-6">{feature.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">{feature.description}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Feature;
