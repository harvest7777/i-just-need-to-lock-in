export default function PrivacyPage() {
  return (
    <div className="bg-app-bg p-5 absolute top-0 left-0 h-screen w-full z-50">
      <div className="bg-app-fg rounded-xl text-lg p-5 flex flex-col items-center align-middle justify-center gap-y-5">
        <h1 className="font-bold text-3xl text-center">Privacy Policy</h1>
        <div className="w-full">
          <h1 className="font-bold">1. Introduction</h1>
          <span>Welcome to imalockin! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our app and related services.</span>
        </div>
        <div className="w-full">
          <h1 className="font-bold">2. Information We Collect</h1>
          <span>Information You Provide</span>
          <ul className="list-disc list-inside ml-5">
            <li>Name, email address, or username (used for account creation or login).</li>
            <li>Task details or focus sessions you log.</li>
            <li>Feedback or support requests.</li>
          </ul>
          <span >Automatically Collected Data</span>
          <ul className="list-disc list-inside ml-5">
            <li>Device and usage data (browser type, IP address, device info).</li>
            <li>Analytics data (e.g. session duration, features used).</li>
          </ul>
        </div>
        <div className="w-full">
          <h1 className="font-bold">3. How We Use Your Information</h1>
          <span>We use the information we collect to:</span>
          <ul className="list-disc list-inside ml-5">
            <li>Provide core functionality (task management, focus sessions).</li>
            <li>Improve app performance and user experience.</li>
            <li>Respond to user feedback or support requests.</li>
            <li>Send optional updates or announcements (you can opt out anytime).</li>
          </ul>
          <span className="font-bold">We will NOT sell your personal data.</span>
        </div>
        <div className="w-full">
          <h1 className="font-bold">4. Sharing Your Information</h1>
          <span>We may share your data only with trusted third-party services that help run imalockin (e.g., authentication, database hosting, analytics). These services are contractually obligated to keep your data secure. We may also disclose your data if required by law or to protect our rights.</span>
        </div>
        <div className="w-full">
          <h1 className="font-bold">5. Cookies and Tracking</h1>
          <span>We may use cookies or similar technologies to remember your session, keep you logged in, or collect anonymous usage statistics. You can disable cookies in your browser settings, but some app features may not work properly.</span>
        </div>
      </div>
    </div>
  )
}
