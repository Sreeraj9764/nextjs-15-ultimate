import qs from "query-string";

export const formUrlQuery = ({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}): string => {
  const queryString = qs.parse(params);
  queryString[key] = value;
  return qs.stringifyUrl({ url: window.location.pathname, query: queryString });
};

export const removeUrlQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}): string => {
  const queryString = qs.parse(params);
  keysToRemove.forEach((e) => {
    delete queryString[e];
  });
  return qs.stringifyUrl(
    { url: window.location.pathname, query: queryString },
    { skipNull: true }
  );
};
