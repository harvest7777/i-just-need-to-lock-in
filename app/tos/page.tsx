export default function TOSPage() {
  return (
    <div className="bg-app-bg p-5 absolute top-0 left-0 h-screen w-full z-50 overflow-y-auto">
      <div className="bg-app-fg rounded-xl text-lg p-5 flex flex-col items-center align-middle justify-center gap-y-5">
        <h1 className="font-bold text-3xl text-center">Terms of Service</h1>

        <div className="w-full">
          <h1 className="font-bold">1. Acceptance of Terms</h1>
          <span>
            By using imalockin, you agree to follow these Terms of Service. If you do not agree, please do not use the app.
          </span>
        </div>

        <div className="w-full">
          <h1 className="font-bold">2. Usage Guidelines</h1>
          <ul className="list-disc list-inside ml-5">
            <li>You may use the app to manage tasks and track friend activity.</li>
            <li>Do not use the app to harm others, exploit the service, or interfere with its operation.</li>
          </ul>
        </div>

        <div className="w-full">
          <h1 className="font-bold">3. Account Termination</h1>
          <span>
            We reserve the right to suspend or terminate your account if you use the app unlawfully or attempt to cause harm to the service or other users.
          </span>
        </div>

        <div className="w-full">
          <h1 className="font-bold">4. Limitation of Liability</h1>
          <span>
            imalockin is provided "as is" without guarantees. We are not liable for any damages resulting from use of the app.
          </span>
        </div>

        <div className="w-full">
          <h1 className="font-bold">5. Changes to These Terms</h1>
          <span>
            We may update these Terms from time to time. Continued use of the app means you accept the changes.
          </span>
        </div>

        <div className="w-full">
          <h1 className="font-bold">6. Contact</h1>
          <span>
            If you have any questions, contact us through discord @bagillionaire.
          </span>
        </div>
      </div>
    </div>
  );
}

