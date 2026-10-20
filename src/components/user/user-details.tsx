import { formatPhoneNumberIntl } from 'react-phone-number-input/max';
import { formatDate } from '@lib/date';
import { splitProfileEntries } from '@lib/profile-fields';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { UserName } from './user-name';
import { UserFollowing } from './user-following';
import { UserFollowStats } from './user-follow-stats';
import { WebsiteFavicon } from './website-favicon';
import type { IconName } from '@components/ui/material-icon';
import type { User } from '@lib/types/user';

type UserDetailsProps = Pick<
  User,
  | 'id'
  | 'bio'
  | 'name'
  | 'website'
  | 'phoneNumber'
  | 'username'
  | 'location'
  | 'birthDate'
  | 'verified'
  | 'createdAt'
  | 'following'
  | 'followers'
> & {
  customBadge?: string | null;
};

type ProfileDetail = {
  key: string;
  label: string | null;
  icon: IconName;
  href?: string;
  favicon?: string;
  tooltip?: string;
};

function formatBirthday(birthDate?: string | null): string | null {
  if (!birthDate) return null;

  const [year, month, day] = birthDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  )
    return null;

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function UserDetails({
  id,
  bio,
  name,
  website,
  phoneNumber,
  username,
  location,
  birthDate,
  verified,
  createdAt,
  following,
  followers,
  customBadge
}: UserDetailsProps): JSX.Element {
  const birthdayLabel = formatBirthday(birthDate);

  /* Plusieurs lieux de résidence et plusieurs sites web sont possibles : ils
     sont enregistrés dans le même champ, séparés par un retour à la ligne. */
  const locationEntries = splitProfileEntries(location);
  const websiteEntries = splitProfileEntries(website);

  const getWebsiteDetail = (
    rawWebsite: string,
    index: number
  ): ProfileDetail => {
    const href = /^https?:\/\//i.test(rawWebsite)
      ? rawWebsite
      : `https://${rawWebsite}`;

    return {
      key: `website-${index}`,
      label: rawWebsite.replace(/^https?:\/\//i, '').replace(/\/$/, ''),
      icon: 'link',
      href,
      favicon: href
    };
  };

  const profileDetails: Readonly<ProfileDetail[]> = [
    ...locationEntries.map((entry, index) => ({
      key: `location-${index}`,
      label: entry,
      icon: 'location_on' as const
    })),
    ...websiteEntries.map(getWebsiteDetail),
    {
      key: 'phone',
      label: phoneNumber ? formatPhoneNumberIntl(phoneNumber) : null,
      icon: 'call',
      href: phoneNumber ? `tel:${phoneNumber}` : undefined
    },
    {
      key: 'birthday',
      label: birthdayLabel ? `Né le ${birthdayLabel}` : null,
      icon: 'redeem'
    },
    {
      key: 'joined',
      label: `Inscrit le ${formatDate(createdAt, 'joined')}`,
      icon: 'calendar_month',
      tooltip: formatDate(createdAt, 'full')
    }
  ];

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <div className='flex flex-wrap items-center gap-2'>
          <UserName
            className='-mb-1 text-xl font-bold'
            name={name}
            iconClassName='w-6 h-6'
            verified={verified}
          />
          {customBadge && (
            <span className='bg-main-accent/15 rounded-full px-2.5 py-0.5 text-xs font-semibold text-main-accent'>
              {customBadge}
            </span>
          )}
        </div>
        <div className='flex items-center gap-1.5 text-sm text-light-secondary dark:text-dark-secondary'>
          <p>@{username}</p>
          <UserFollowing userTargetId={id} />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {bio && (
          <p className='whitespace-pre-line break-words text-[15px] leading-relaxed'>
            {bio}
          </p>
        )}
        <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm text-light-secondary dark:text-dark-secondary'>
          {profileDetails.map(
            ({ key, label, icon, href, favicon, tooltip }) =>
              label && (
                <div className='flex min-w-0 items-center gap-1.5' key={key}>
                  {favicon ? (
                    <WebsiteFavicon href={favicon} />
                  ) : (
                    <MaterialIcon
                      className='h-4 w-4 shrink-0'
                      iconName={icon}
                    />
                  )}
                  {href ? (
                    <a
                      className='custom-underline truncate text-main-accent'
                      href={href}
                      rel='noreferrer'
                      target={href.startsWith('http') ? '_blank' : undefined}
                    >
                      {label}
                    </a>
                  ) : tooltip ? (
                    <button
                      className='custom-underline group relative truncate'
                      type='button'
                    >
                      {label}
                      <ToolTip className='translate-y-1' tip={tooltip} />
                    </button>
                  ) : (
                    <p className='break-words'>{label}</p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <UserFollowStats following={following} followers={followers} />
    </div>
  );
}
