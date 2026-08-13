import Image from 'next/image';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-red-900 mb-4">Gallery</h1>
          <p className="text-gray-600 text-lg">
            Moments from meetings, programs, and union activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="overflow-hidden">
              <Image
                src="/gallery/meeting-indoor.jpg"
                alt="Executive Committee Meeting"
                width={800}
                height={500}
                priority
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Executive Committee Meeting
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Discussion and planning session with union members and executive
                committee representatives.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="overflow-hidden">
              <Image
                src="/gallery/meeting-indoor.jpg"
                alt="Union Coordination Program"
                width={800}
                height={500}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Union Coordination Program
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Coordination and collaboration activities organized for union
                members and stakeholders.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="overflow-hidden">
              <Image
                src="/gallery/meeting-indoor.jpg"
                alt="Member Welfare Session"
                width={800}
                height={500}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Member Welfare Session
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Welfare and support session conducted for members and their
                families.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}