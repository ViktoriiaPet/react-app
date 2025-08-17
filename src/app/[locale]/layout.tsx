import LocaleLayout from "./LocaleLayout";

export default function Layout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const localeNew = params.locale ?? "en";
  return <LocaleLayout locale={localeNew}>{children}</LocaleLayout>;
}
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}