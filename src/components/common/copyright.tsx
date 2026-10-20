/* Année de création du site : la fourchette se met à jour toute seule à chaque
   nouvelle année, plus besoin de la modifier à la main. */
const START_YEAR = 2024;

type CopyrightProps = {
  className?: string;
};

export function Copyright({ className }: CopyrightProps): JSX.Element {
  const currentYear = new Date().getFullYear();

  const years =
    currentYear > START_YEAR ? `${START_YEAR} - ${currentYear}` : `${currentYear}`;

  return (
    <span className={className}>
      © {years} Inspiration. Tous droits réservés.
    </span>
  );
}
