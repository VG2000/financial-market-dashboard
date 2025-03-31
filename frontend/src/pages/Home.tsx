import React from "react";
import BondTable from "../components/BondTable";
import {
  useGetBondsQuery,
  useRefreshBondDataMutation,
} from "../features/bonds/BondApi";
import { Bond } from "../types";

const MATURITY_ORDER = ["2y", "5y", "10y"];

const groupBondsByCountry = (bonds: Bond[]): Record<string, Bond[]> => {
  const grouped = bonds.reduce((acc, bond) => {
    const country = bond.country.toUpperCase();
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(bond);
    return acc;
  }, {} as Record<string, Bond[]>);

  Object.keys(grouped).forEach((country) => {
    grouped[country].sort((a, b) => {
      const indexA = MATURITY_ORDER.indexOf(a.maturity.toLowerCase());
      const indexB = MATURITY_ORDER.indexOf(b.maturity.toLowerCase());
      return indexA - indexB;
    });
  });

  return grouped;
};

const Home: React.FC = () => {
  const {
    data: bonds = [],
    isLoading: isBondsLoading,
    isError: isBondsError,
  } = useGetBondsQuery();
  const [refreshBondData, { isLoading, isSuccess, isError }] =
    useRefreshBondDataMutation();

  const groupedBonds = groupBondsByCountry(bonds);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Financial Markets Dashboard
      </h1>

      {/* Refresh Button & Status */}
      <div className="mt-2 flex flex-col items-center gap-2">
        <button
          onClick={() => refreshBondData()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing Bond Data..." : "Refresh Bond Data"}
        </button>
        {isSuccess && (
          <p className="text-green-600 text-sm font-medium">
            ✅ Bond data refreshed successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm font-medium">
            ⚠️ Error refreshing bond data.
          </p>
        )}
      </div>

      {/* Dashboard Cards Container */}
      <div className="w-full max-w-screen-2xl flex flex-col lg:flex-row gap-6 mt-6">
        {/* ✅ Bond Markets Card */}
        <div className="flex-1 min-w-[300px] space-y-4">
          {isBondsLoading && (
            <p className="text-gray-500 italic">Loading bond data...</p>
          )}
          {isBondsError && (
            <p className="text-red-600">Error loading bond data.</p>
          )}
          {!isBondsLoading &&
            !isBondsError &&
            Object.entries(groupedBonds).map(([country, bonds]) => (
              <BondTable key={country} title={`${country} Bonds`} bonds={bonds} />
            ))}
        </div>

        {/* ⏳ Future Market Cards */}
        <div className="flex-1 min-w-[300px] space-y-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Commodities
            </h2>
            <div className="text-gray-400 italic">Coming soon...</div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Stocks</h2>
            <div className="text-gray-400 italic">Coming soon...</div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Cryptocurrencies
            </h2>
            <div className="text-gray-400 italic">Coming soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
