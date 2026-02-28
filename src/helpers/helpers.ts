export const formatSalary = (min: string, max: string) => {
  const fmt = (v: string) =>
    Number(v).toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    });
  return `${fmt(min)} – ${fmt(max)}`;
};

export const formatToPesos = (value: number) => {
  return Number(value).toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  });
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
