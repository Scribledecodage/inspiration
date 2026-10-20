import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type BottomNavIconProps = {
  /** L'onglet correspond-il à la page affichée ? */
  active: boolean;
  children: ReactNode;
};

/**
 * Animation d'icône de barre du bas.
 *
 * Volontairement discrète : l'icône s'agrandit à peine quand l'onglet devient
 * actif, puis revient doucement. Le ressort est amorti (pas de rebond), donc
 * aucun dépassement ni mouvement parasite. À l'appui, elle s'enfonce
 * légèrement. La couleur est gérée par le style de l'onglet.
 */
export function BottomNavIcon({
  active,
  children
}: BottomNavIconProps): JSX.Element {
  return (
    <motion.span
      animate={{ scale: active ? 1.07 : 1 }}
      className='relative inline-flex'
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      whileTap={{ scale: 0.93 }}
    >
      {children}
    </motion.span>
  );
}
