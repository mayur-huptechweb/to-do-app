import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-7xl font-extrabold text-gray-900 mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Go Back Button */}
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 transition-transform"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>

        {/* Go Home Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 transition-transform"
        >
          <Home size={18} />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
