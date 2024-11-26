export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] text-[#A9A9A9] py-6">
      <div className="container mx-auto px-6 text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:text-white">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:text-white">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:text-white">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#8A2BE2] hover:text-white">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>

        {/* Footer Content */}
        <div className="mb-4">
          <p className="text-sm">© 2024 Moodify. All rights reserved.</p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center space-x-8">
          <a href="/about" className="hover:text-[#8A2BE2]">About</a>
          <a href="/privacy-policy" className="hover:text-[#8A2BE2]">Privacy Policy</a>
          <a href="/terms" className="hover:text-[#8A2BE2]">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
