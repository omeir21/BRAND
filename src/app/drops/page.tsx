// ============================================
// LIMITED DROPS PAGE
// ============================================

"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { calculateTimeRemaining } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export default function DropsPage() {
  const drops = [
    {
      id: "drop-1",
      name: "SPRING COLLECTION 2024",
      slug: "spring-collection-2024",
      description: "An exclusive collection celebrating the essence of spring",
      image: "/images/drop-1.svg",
      launch_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      product_count: 45,
    },
    {
      id: "drop-2",
      name: "SUMMER EXCLUSIVE",
      slug: "summer-exclusive",
      description: "Limited edition summer pieces",
      image: "/images/drop-2.svg",
      launch_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      product_count: 32,
    },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">LIMITED DROPS</h1>
          <p className="text-lg text-white/80">
            Exclusive collections available for a limited time only
          </p>
        </div>
      </div>

      {/* Drops Grid */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {drops.map((drop) => {
              const timeRemaining = calculateTimeRemaining(drop.end_date);

              return (
                <div key={drop.id} className="group overflow-hidden">
                  {/* Drop Image */}
                  <div className="mb-6 overflow-hidden bg-gray-100">
                    <Image
                      src={drop.image}
                      alt={drop.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Drop Info */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold tracking-luxury uppercase">
                      {drop.name}
                    </h3>
                    <p className="text-gray-600">{drop.description}</p>

                    {/* Countdown */}
                    {!timeRemaining.isExpired ? (
                      <div className="rounded-lg bg-navy-primary p-4 text-white">
                        <p className="mb-3 text-sm font-semibold uppercase">Available in:</p>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <p className="text-2xl font-bold">{timeRemaining.days}</p>
                            <p className="text-xs">DAYS</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{timeRemaining.hours}</p>
                            <p className="text-xs">HOURS</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{timeRemaining.minutes}</p>
                            <p className="text-xs">MINS</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{timeRemaining.seconds}</p>
                            <p className="text-xs">SECS</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-gray-100 p-4 text-center">
                        <p className="font-semibold text-gray-700">This drop has ended</p>
                      </div>
                    )}

                    {/* Info */}
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{drop.product_count}</span> exclusive items
                    </p>

                    {/* CTA */}
                    <Button variant="gold" className="w-full">
                      <Link href={ROUTES.DROP_DETAIL(drop.slug)}>
                        VIEW COLLECTION
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-gray-50">
        <div className="section-inner max-w-2xl text-center">
          <h2 className="text-luxury mb-4">GET NOTIFIED</h2>
          <p className="mb-8 text-gray-700">
            Subscribe to receive notifications about upcoming exclusive drops and limited releases.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md border border-gray-300 px-4 py-3 focus:border-navy-primary focus:outline-none focus:ring-1 focus:ring-navy-primary"
              required
            />
            <Button variant="gold">NOTIFY ME</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
