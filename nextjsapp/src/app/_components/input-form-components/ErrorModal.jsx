const ErrorModal = ({ modalRef }) => {
  return (
    <dialog className="modal" data-theme="valentine" ref={modalRef}>
      
      <div className="modal-box">

        <h3 className="font-bold text-lg">
          ❌ Report Generation Failed
        </h3>

        <p className="py-4">
          Oops! Something went wrong while generating the report. 🚨  
        </p>

        <h4 className="text-lg font-semibold mb-3">
          🔍 Possible reasons:
        </h4>

        <ul className="space-y-2 text-sm">
          <li className="flex gap-1">
            ✅ The Gemini API or the OpenWeather API has reached its daily usage limit. ⏳
          </li>
          <li className="flex gap-1">
            ✅ The OpenAI API key doesn't have enough credits to generate a response. 💳
          </li>
          <li className="flex gap-1">
            ✅ The provided API keys are incorrect. 🔑
          </li>
          <li className="flex gap-1">
            ✅ The web app failed to establish a connection with the backend server. 🌐
          </li>
          <li className="flex gap-1">
            ✅ An unexpected error occurred while generating the report. ⚠️
          </li>
          <li className="flex gap-1">
            ✅ Invalid or incorrect inputs were provided. ✏️
          </li>
          <li className="flex gap-1">
            ✅ The server took too long to respond. 🕰️
          </li>
        </ul>

        <p className="mt-4 font-bold">
          Please refresh the page, verify your inputs carefully, and try again later. 🔄✅ 
        </p>

      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>

    </dialog>
  );
};


export default ErrorModal;
