// ============================================
// 404 NOT FOUND PAGE
// ============================================

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-6xl font-bold text-navy-primary">404</h1>
        <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary">
          <Link href={ROUTES.HOME}>BACK HOME</Link>
        </Button>
      </div>
    </div>
  );
}
