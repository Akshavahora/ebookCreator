import React from "react";
import {
  Sparkles,
  BookOpen,
  BrainCircuit,
  FileText,
  Download,
  Target,
  ShieldCheck,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-medium">
              <Sparkles size={18} />
              AI Powered E-Book Creation
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight">
              About AI E-Book Generator
            </h1>

            <p className="mt-6 text-lg text-indigo-100 leading-8">
              AI E-Book Generator is an intelligent platform that transforms
              your ideas into professionally structured e-books using the power
              of Generative AI. Our goal is to simplify content creation and
              help users generate high-quality books in minutes instead of
              spending weeks writing them manually.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              We built AI E-Book Generator to make professional e-book creation
              simple, fast, and accessible for everyone. Whether you're a
              student, educator, writer, entrepreneur, or content creator, our
              platform helps you convert your ideas into complete digital books
              with the assistance of advanced Generative AI.
            </p>

            <p className="text-gray-600 leading-8">
              Built using the MERN Stack and modern AI technology, our platform
              provides an intuitive experience that allows users to generate,
              edit, manage, and export e-books effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-2xl shadow">
              <BrainCircuit className="text-indigo-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg mb-2">Generative AI</h3>
              <p className="text-gray-600 text-sm">
                Generate intelligent, structured, and engaging content with AI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <BookOpen className="text-indigo-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg mb-2">Smart Chapters</h3>
              <p className="text-gray-600 text-sm">
                Automatically create organized chapters for every topic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <FileText className="text-indigo-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg mb-2">Rich Editor</h3>
              <p className="text-gray-600 text-sm">
                Modify, update, and personalize your generated content.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <Download className="text-indigo-600 mb-4" size={40} />
              <h3 className="font-semibold text-lg mb-2">Export</h3>
              <p className="text-gray-600 text-sm">
                Download your e-books as PDF or DOCX with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="border rounded-2xl p-8 shadow-sm">
              <Target className="text-indigo-600 mb-5" size={42} />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-8">
                Our mission is to empower individuals and businesses by making
                e-book creation faster, smarter, and more accessible through
                Generative AI. We help users transform simple ideas into
                professional publications with minimal effort.
              </p>
            </div>

            <div className="border rounded-2xl p-8 shadow-sm">
              <ShieldCheck className="text-indigo-600 mb-5" size={42} />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-8">
                We believe every great idea deserves to become a book. By
                combining artificial intelligence with modern web technologies,
                we aim to make digital publishing easier, faster, and available
                to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose Our Platform?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "AI-powered content generation",
              "Professional chapter organization",
              "Easy editing and customization",
              "Modern and responsive interface",
              "PDF & DOCX export support",
              "Fast, secure, and user-friendly experience",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Sparkles className="text-indigo-600" size={22} />
                </div>

                <h3 className="font-semibold text-lg">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-5">
            Turn Your Ideas Into Books with AI
          </h2>

          <p className="text-indigo-100 text-lg leading-8 mb-8">
            Start creating professional-quality e-books in minutes using
            Generative AI. Write less, create more, and bring your ideas to
            life.
          </p>

          <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
            Start Creating
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;