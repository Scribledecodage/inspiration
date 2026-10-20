import { auth } from '@lib/firebase/app';
import { useAuth } from '@lib/context/auth-context';
import { useTheme } from '@lib/context/theme-context';
import { useModal } from '@lib/hooks/useModal';
import cn from 'clsx';
import { getAvatarSrc } from '@lib/media';
import { getAvatarShapeClass } from '@lib/avatar-shape';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { AvatarDecoration } from '@components/user/avatar-frame';
import { MaterialIcon } from '@components/ui/material-icon';
import { SettingsRow, SettingsSection, SettingsShell } from './settings-shell';

export function SettingsAccount(): JSX.Element {
  const { user, signOut } = useAuth();
  const { avatarShape: localShape, avatarFrame: localFrame } = useTheme();
  const {
    open: logOutOpen,
    openModal: logOutOpenModal,
    closeModal: logOutCloseModal
  } = useModal();

  if (!user) return <></>;

  const email = auth.currentUser?.email ?? 'Non renseignée';

  /* Forme et cadre personnels : on utilise d'abord ce que contient le
     profil, puis la personnalisation locale (Apparence) pour que l'avatar et
     son cadre s'affichent même si le profil n'a pas encore enregistré le
     choix. */
  const shape = user.avatarShape ?? localShape;
  const frame = user.avatarFrame ?? localFrame;

  return (
    <>
      <SettingsShell
        description='Voir et gérer les informations liées à votre compte Inspiration.'
        seoTitle='Réglages / Inspiration'
        title='Votre compte'
      >
        <section className='flex items-center gap-4 rounded-xl border border-light-border bg-main-background p-4 dark:border-dark-border xs:p-5'>
          {/* La forme est portée par le conteneur (le masque y découpe la
              photo). Le cadre, lui, est posé autour et par-dessus : il ne
              doit pas être rogné par la forme, sinon il resterait caché
              derrière l'avatar. */}
          <span className='relative shrink-0'>
            <span
              className={cn(
                'block overflow-hidden bg-main-search-background',
                getAvatarShapeClass(shape)
              )}
              style={{
                width: 64,
                height: 64,
                backgroundImage: `url("${getAvatarSrc(null, user.gender)}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <img
                alt={user.name}
                className='block h-full w-full object-cover'
                src={getAvatarSrc(user.photoURL, user.gender)}
              />
            </span>
            <AvatarDecoration frame={frame} />
          </span>
          <div className='flex min-w-0 flex-1 flex-col'>
            <div className='flex items-center gap-1.5'>
              <p className='truncate text-lg font-bold text-light-primary dark:text-dark-primary'>
                {user.name}
              </p>
              {user.verified && (
                <MaterialIcon
                  className='h-5 w-5 shrink-0 text-main-accent'
                  iconName='verified'
                  solid
                />
              )}
            </div>
            <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
              @{user.username}
            </p>
            <p className='mt-1 truncate text-xs text-light-secondary dark:text-dark-secondary'>
              {email}
            </p>
          </div>
        </section>

        <SettingsSection
          description='Les informations qui apparaissent sur votre profil public.'
          title='Informations sur le compte'
        >
          <SettingsRow
            description='Nom affiché, photo, bannière et biographie'
            href='/settings/personalization'
            iconName='person'
            label='Profil'
          />
          <SettingsRow
            description='Le nom unique qui sert à vous mentionner'
            href='/settings/username'
            iconName='alternate_email'
            label='Nom d’utilisateur'
            value={`@${user.username}`}
          />
          <SettingsRow
            description='Utilisée pour vous connecter et récupérer votre compte'
            iconName='mail'
            label='Adresse e-mail'
            value={email}
          />
          <SettingsRow
            description='Numéro associé à votre profil'
            iconName='call'
            label='Téléphone'
            value={user.phoneNumber ?? 'Non renseigné'}
          />
        </SettingsSection>

        <SettingsSection
          description='Protégez votre compte et choisissez ce que vous partagez.'
          title='Sécurité et confidentialité'
        >
          <SettingsRow
            description='Mot de passe, code de l’appareil et suppression du compte'
            href='/settings/security'
            iconName='key'
            label='Mot de passe et sécurité'
          />
          <SettingsRow
            description='Audience, publications, messages et données partagées'
            href='/settings/privacy'
            iconName='lock'
            label='Confidentialité et sécurité'
          />
          <SettingsRow
            description='Alertes et préférences de notification'
            href='/settings/notifications'
            iconName='notifications'
            label='Notifications'
          />
        </SettingsSection>

        <SettingsSection
          description='Quittez votre compte sur cet appareil.'
          title='Session'
        >
          <SettingsRow
            danger
            description='Fermer la session et revenir à l’écran de connexion'
            iconName='logout'
            label='Se déconnecter'
            onClick={logOutOpenModal}
          />
        </SettingsSection>
      </SettingsShell>

      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-lg'
        open={logOutOpen}
        closeModal={logOutCloseModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Se déconnecter de Inspiration ?'
          description='Vous pourrez toujours vous reconnecter à tout moment. Si vous souhaitez simplement changer de compte, vous pouvez ajouter un compte existant.'
          mainBtnLabel='Se déconnecter'
          action={signOut}
          closeModal={logOutCloseModal}
        />
      </Modal>
    </>
  );
}
