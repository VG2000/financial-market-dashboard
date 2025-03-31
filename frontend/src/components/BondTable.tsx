import React from "react";
import { Bond } from "../types";

interface BondTableProps {
  title: string;
  bonds: Bond[];
}

const BondTable: React.FC<BondTableProps> = ({ title, bonds }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-3">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left p-2 font-medium">Bond</th>
              <th className="text-right p-2 font-medium">Yield (%)</th>
              <th className="text-right p-2 font-medium">Δ Day (bp)</th>
              <th className="text-right p-2 font-medium">1W</th>
              <th className="text-right p-2 font-medium">1M</th>
              <th className="text-right p-2 font-medium">1Y</th>
            </tr>
          </thead>
          <tbody>
            {bonds.map((bond, index) => (
              <tr
                key={`${bond.country}-${bond.maturity}`}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="p-2">
                  {bond.country.toUpperCase()} {bond.maturity}
                </td>
                <td className="p-2 text-right">
                  {bond.yield_rate.toFixed(2)}
                </td>
                <td
                  className={`p-2 text-right font-medium ${
                    bond.price_change_day > 0
                      ? "text-green-600"
                      : bond.price_change_day < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {bond.price_change_day > 0
                    ? `+${bond.price_change_day.toFixed(2)}`
                    : bond.price_change_day.toFixed(2)}
                </td>
                <td className="p-2 text-right">
                  {(bond.percentage_week * 100).toFixed(2)}%
                </td>
                <td className="p-2 text-right">
                  {(bond.percentage_month * 100).toFixed(2)}%
                </td>
                <td className="p-2 text-right">
                  {(bond.percentage_year * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BondTable;
