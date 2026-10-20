import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { DeviceCodeModal } from './device-code-modal';
import { hasDeviceCode } from '@lib/security/device-code';

type DeviceCodeGuard = {
  hasCode: boolean;
  unlocked: boolean;
  requestUnlock: (onUnlocked?: () => void) => void;
  modal: JSX.Element;
};

/**
 * Gère le verrouillage par code de l'appareil : les actions sensibles
 * demandent d'abord le code, puis restent déverrouillées une minute.
 */
export function useDeviceCode(userId: string): DeviceCodeGuard {
  const [hasCode, setHasCode] = useState(() => hasDeviceCode(userId));
  const [unlocked, setUnlocked] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'verify' | null>(null);
  const pendingAction = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!unlocked) return;

    const timer = setTimeout(() => setUnlocked(false), 60_000);

    return () => clearTimeout(timer);
  }, [unlocked]);

  const requestUnlock = (onUnlocked?: () => void): void => {
    if (unlocked) {
      onUnlocked?.();
      return;
    }

    pendingAction.current = onUnlocked ?? null;
    setModalMode(hasCode ? 'verify' : 'create');
  };

  const handleClose = (): void => {
    pendingAction.current = null;
    setModalMode(null);
  };

  const handleSuccess = (): void => {
    const wasCreation = modalMode === 'create';
    const action = pendingAction.current;

    pendingAction.current = null;
    setHasCode(true);
    setUnlocked(true);
    setModalMode(null);
    toast.success(
      wasCreation ? 'Code de l’appareil enregistré' : 'Code vérifié'
    );
    action?.();
  };

  return {
    hasCode,
    unlocked,
    requestUnlock,
    modal: (
      <DeviceCodeModal
        open={modalMode !== null}
        mode={modalMode ?? 'verify'}
        userId={userId}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    )
  };
}
