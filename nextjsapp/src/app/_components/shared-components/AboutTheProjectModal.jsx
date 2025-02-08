const AboutTheProjectModal = ({ modalRef }) => {
  return (
    <dialog className="modal" data-theme="aqua" ref={modalRef}>
      
      <div className="modal-box">

        <h3 className="font-bold text-lg text-center text-white">
          🌱 Welcome to AquaYield AI!
        </h3>

        <p className="py-4 text-center text-white">
          AquaYield AI is a precision irrigation platform that leverages AI and
          real-time data to optimize water usage for sustainable, high-yield
          farming.💧

          <br />

          <br />

          Our solution provides farmers with smart irrigation schedules,
          real-time water usage analytics, and actionable insights to
          efficiently manage their water resources. 🌾📈

        </p>

      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>

    </dialog>
  );
};


export default AboutTheProjectModal;
