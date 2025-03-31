import { apiSlice } from "../api/apiSlice";
import { getCsrfTokenFromCookie } from "@/utils/csrf"
import { Bond, RawBond} from "../../types";

export const bondApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBonds: builder.query<Bond[], void>({
      query: () => "bonds/",
      transformResponse: (response: RawBond[]): Bond[] =>
        response.map((bond) => ({
          ...bond,
          yield_rate: parseFloat(bond.yield_rate),
          price_change_day: parseFloat(bond.price_change_day),
          percentage_week: parseFloat(bond.percentage_week || "0"),
          percentage_month: parseFloat(bond.percentage_month || "0"),
          percentage_year: parseFloat(bond.percentage_year || "0"),
        })),
    }),
    refreshBondData: builder.mutation<void, void>({
      query: () => {
        const csrfToken = getCsrfTokenFromCookie();
        return {
          url: "refresh-bonds/",
          method: "POST",
          headers: {
           "X-CSRFToken": csrfToken ?? "",
          },
        };
      },
    }),
  }),
});

export const { useGetBondsQuery, useRefreshBondDataMutation } = bondApi;
