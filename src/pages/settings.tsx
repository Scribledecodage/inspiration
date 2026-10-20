import { SettingsAccount } from '@components/settings/settings-account';
import { settingsPageLayout } from '@components/settings/settings-shell';

export default function SettingsPage(): JSX.Element {
  return <SettingsAccount />;
}

SettingsPage.getLayout = settingsPageLayout;
