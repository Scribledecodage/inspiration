/* Les champs « Lieu de résidence » et « Site web » acceptent plusieurs
   entrées : elles sont enregistrées dans le même champ (une seule valeur en
   base), séparées par un retour à la ligne. Les profils enregistrés avant, qui
   ne contiennent qu'une seule valeur, restent donc lisibles tels quels. */

export const MAX_PROFILE_ENTRIES = 6;

/* Découpe la valeur enregistrée en une liste de valeurs propres. */
export function splitProfileEntries(
  value: string | null | undefined
): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/* Rassemble la liste en une seule valeur ; `null` quand tout est vide. */
export function joinProfileEntries(
  entries: readonly string[]
): string | null {
  const cleaned = entries.map((entry) => entry.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned.join('\n') : null;
}
