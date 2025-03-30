import React from "react";
import BondTable from "../components/BondTable";
import { Bond } from "../types";
import { useRefreshBondDataMutation } from "../features/bonds/BondApi";

const sampleBonds: Bond[] = [
  {
    region: "europe",
    country: "germany",
    maturity: "10Y",
    yield_rate: 2.5,
    price_change_day: 0.08,
    percentage_week: 0.0012,
    percentage_month: 0.0025,
    percentage_year: 0.0233,
    date: "2025-03-28",
    last_updated: "2025-03-28T09:00:00Z",
  },
];

const Home: React.FC = () => {
  const [refreshBondData, { isLoading, isSuccess, isError }] = useRefreshBondDataMutation();

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Market Dashboard</h1>
        <p className="text-sm text-gray-600">Live insights across asset classes</p>
      </header>

      <section className="flex justify-center">
        <button
          onClick={() => refreshBondData()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing Bond Data..." : "Refresh Bond Data"}
        </button>
      </section>

      {isSuccess && (
        <p className="text-center text-green-600 font-medium">
          ✅ Bond data refreshed successfully!
        </p>
      )}
      {isError && (
        <p className="text-center text-red-600 font-medium">
          ⚠️ Error refreshing bond data.
        </p>
      )}

      {/* ✅ Bonds */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Bonds</h2>
        <BondTable title="Euro Bonds" bonds={sampleBonds} />
      </section>

      {/* ⏳ Placeholder Sections for future asset classes */}

      {/* Commodities */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Commodities</h2>
        <div className="text-gray-400 italic">Coming soon...</div>
      </section>

      {/* Stocks */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Stocks</h2>
        <div className="text-gray-400 italic">Coming soon...</div>
      </section>

      {/* Crypto */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Cryptocurrencies</h2>
        <div className="text-gray-400 italic">Coming soon...</div>
      </section>
    </div>
  );
};

export default Home;
