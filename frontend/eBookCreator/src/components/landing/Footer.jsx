import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="">
        {/* Subtle background Pattern */}
        <div className="">
            <div className=""></div>
        </div>

        <div className="">
            <div className="">
                {/* Brand Section */}
                <div className="">
                    <a
                        href="/"
                        className=""
                    >
                        <div className="">
                            <BookOpen className="" />
                        </div>
                        <span className="">eBook Creator</span>
                    </a>
                    <p className="">
                        Create, Design and publish stunning ebook with the power of AI.
                    </p>

                    {/* Social Links */}
                    <div className="">
                        <a
                            href="http://twitter.com"
                            className=""
                            aria-label="Twitter"
                        >
                            <Twitter className="" />
                        </a>
                        <a
                            href="http://linkedin.com"
                            className=""
                            aria-label="LinkedIN"
                        >
                            <Linkedin className="" />
                        </a>
                        <a
                            href="http://github.com"
                            className=""
                            aria-label="GitHub"
                        >
                            <Github className="" />
                        </a>
                    </div>
                </div>

                {/* Quich Links */}
                <div className="">
                    <div>
                        <h3 className="">Product</h3>
                        <ul className="">
                            <li>
                                <a href="#features" className="">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#templates" className="">
                                    Templates
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="">Company</h3>
                        <ul className="">
                            <li>
                                <a href="#about" className="">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#blog" className="">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="Legal"></h3>
                        <ul className="">
                            <li>
                                <a href="#privacy" className="">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="">
                <div className="">
                    <p className="">
                        © {new Date().getFullYear()} eBook Creator. All right reserved.
                    </p>
                    <p className="">
                        Made with <span className="">♡</span> for creators
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer