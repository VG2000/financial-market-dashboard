import { apiSlice } from "../api/apiSlice";
import { getCsrfTokenFromCookie } from "@/utils/csrf"

export const bondApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshBondData: builder.mutation<void, void>({
      query: () => {
        const csrfToken = getCsrfTokenFromCookie();

        return {
          url: "refresh-bonds/",
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        };
      },
    }),
  }),
});

export const { useRefreshBondDataMutation } = bondApi;
