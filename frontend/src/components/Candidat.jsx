import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 flex justify-center">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Section Candidat */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-lg">Candidat :</span>
          <Link
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            to="/Signup"
          >
            Déposez votre CV
          </Link>
        </div>

        {/* Section Recruteur */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-lg">Recruteur :</span>
          <Link
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            to="/PostJob"
          >
            Publiez une annonce
          </Link>
        </div>
      </div>
    </div>
  );
}
