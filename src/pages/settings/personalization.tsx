import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { UserContextProvider } from '@lib/context/user-context';
import { UserEditProfile } from '@components/user/user-edit-profile';
import { SEO } from '@components/common/seo';
import { settingsPageLayout } from '@components/settings/settings-shell';

export default function SettingsPersonalizationPage(): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <></>;

  return (
    <>
      <SEO title='Personnalisation / Réglages / Inspiration' />
      <UserContextProvider value={{ user, loading: false }}>
        <UserEditProfile pageMode />
      </UserContextProvider>
    </>
  );
}

SettingsPersonalizationPage.getLayout = settingsPageLayout;
