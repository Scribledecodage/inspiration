import { useState } from 'react';
import { SettingsRow, SettingsSection } from './settings-shell';
import { DeleteAccountModal } from './delete-account-modal';
import type { User } from '@lib/types/user';

type DangerZoneProps = {
  user: User;
};

export function DangerZone({ user }: DangerZoneProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='hidden xs:block'>
        <SettingsSection
          description='Effacer définitivement votre compte et son contenu.'
          title='Supprimer votre compte'
        >
          <SettingsRow
            description='Profil, publications, messages et accès au compte'
            iconName='delete'
            label='Supprimer mon compte'
            onClick={() => setOpen(true)}
          />
        </SettingsSection>
      </div>

      <DeleteAccountModal
        open={open}
        user={user}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
