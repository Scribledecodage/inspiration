import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/max';
import phoneLabels from 'react-phone-number-input/locale/fr.json';
import { toast } from 'react-hot-toast';
import { useDragControls } from 'framer-motion';
import cn from 'clsx';
import { useUser } from '@lib/context/user-context';
import { useModal } from '@lib/hooks/useModal';
import { updateUserData } from '@lib/firebase/utils';
import {
  getStorageErrorMessage,
  uploadImages
} from '@lib/supabase/storage';
import { sleep } from '@lib/utils';
import { getAvatarSrc, getBannerSrc, avatarImageOptions } from '@lib/media';
import { getImagesData } from '@lib/validation';
import { splitProfileEntries, joinProfileEntries } from '@lib/profile-fields';
import { Modal } from '@components/modal/modal';
import { EditProfileModal } from '@components/modal/edit-profile-modal';
import { CameraModal } from '@components/modal/camera-modal';
import { Button } from '@components/ui/button';
import { InputField } from '@components/input/input-field';
import { UserEditBirthday } from './user-edit-birthday';
import { UserEditLocation } from './user-edit-location';
import { UserEditWebsites } from './user-edit-websites';
import type { BirthdayParts } from './user-edit-birthday';
import type { AvatarPickerAction } from './avatar-picker-modal';
import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import type { Country } from 'react-phone-number-input/max';
import type { PanInfo, Variants } from 'framer-motion';
import type { FilesWithId } from '@lib/types/file';
import type { User, EditableData, EditableUserData } from '@lib/types/user';
import type { InputFieldProps } from '@components/input/input-field';

type RequiredInputFieldProps = Omit<InputFieldProps, 'handleChange'> & {
  inputId: EditableData;
};

type UserImages = Record<
  Extract<EditableData, 'photoURL' | 'coverPhotoURL'>,
  FilesWithId
>;

type TrimmedTexts = Pick<
  EditableUserData,
  Exclude<EditableData, 'photoURL' | 'coverPhotoURL' | 'birthDate'>
>;

/* La photo prise avec l'appareil photo arrive en fichier seul : on la présente
   comme la liste de fichiers qu'attend le reste du formulaire. */
function fileListFromFile(file: File): FileList {
  if (typeof DataTransfer === 'undefined')
    return {
      0: file,
      length: 1,
      item: (index: number): File | null => (index === 0 ? file : null)
    } as unknown as FileList;

  const transfer = new DataTransfer();
  transfer.items.add(file);
  return transfer.files;
}

function normalizeYear(yearStr: string): string {
  const trimmed = yearStr.trim();
  if (!trimmed) return '';
  if (trimmed.length === 2) {
    const yNum = Number(trimmed);
    const curr2Digits = new Date().getFullYear() % 100;
    return String(yNum <= curr2Digits ? 2000 + yNum : 1900 + yNum);
  }
  return trimmed;
}

function getBirthdayParts(birthDate?: string | null): BirthdayParts {
  const [year = '', month = '', day = ''] = birthDate?.split('-') ?? [];
  return { day, month, year };
}

type UserEditProfileProps = {
  hide?: boolean;
  pageMode?: boolean;
};

function normalizeWebsite(value: string | null): string | null {
  const trimmedValue = value?.trim();
  if (!trimmedValue) return null;

  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmedValue)
        ? trimmedValue
        : `https://${trimmedValue}`
    );
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (!url.hostname.includes('.') && url.hostname !== 'localhost') return null;
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

import { useTheme } from '@lib/context/theme-context';
import {
  avatarShapeOptions,
  avatarShapeLabels,
  avatarFrameOptions,
  getAvatarFrameLabel,
  getAvatarShapeClass
} from '@lib/avatar-shape';
import { AvatarDecoration } from '@components/user/avatar-frame';
import { AvatarPickerModal } from '@components/user/avatar-picker-modal';
import type { AvatarShape, AvatarFrame } from '@lib/types/theme';

/* Exemples de numéros : le format affiché dans la case change selon le pays
   choisi, comme le font les applications de messagerie. */
const PHONE_PLACEHOLDERS: Partial<Record<Country, string>> = {
  FR: '06 12 34 56 78',
  BE: '0470 12 34 56',
  CH: '078 123 45 67',
  LU: '621 123 456',
  CA: '514 555 0123',
  US: '201 555 0123',
  GB: '07400 123456',
  DE: '0151 23456789',
  ES: '612 34 56 78',
  IT: '312 345 6789',
  PT: '912 345 678',
  NL: '06 12345678',
  MA: '0612 345678',
  DZ: '0551 23 45 67',
  TN: '20 123 456',
  SN: '77 123 45 67',
  CI: '01 23 45 67 89',
  CM: '6 71 23 45 67'
};

export function UserEditProfile({
  hide,
  pageMode
}: UserEditProfileProps): JSX.Element {
  const { user } = useUser();
  const { push } = useRouter();
  const { avatarShape: globalShape, avatarFrame: globalFrame, setAvatarShape, setAvatarFrame } = useTheme();
  const { open, openModal, closeModal } = useModal();
  const dragControls = useDragControls();
  const [expanded, setExpanded] = useState(false);
  /* Listes complètes des formes, des cadres et des photos : fenêtre sur
     ordinateur, menu qui remonte du bas sur téléphone. */
  const [shapesOpen, setShapesOpen] = useState(false);
  const [framesOpen, setFramesOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  /* Fenêtre de prise de photo : elle utilise la vraie caméra de l'appareil. */
  const [cameraOpen, setCameraOpen] = useState(false);
  /* Entrée de fichier cachée, pour « Télécharger votre photo de profil ». */
  const uploadPhotoRef = useRef<HTMLInputElement>(null);
  /* Pays du numéro de téléphone : sert uniquement à proposer le bon exemple
     de numéro, la saisie s'adapte toute seule au pays choisi. */
  const [phoneCountry, setPhoneCountry] = useState<Country>('FR');

  const [loading, setLoading] = useState(false);

  const {
    bio,
    name,
    website,
    phoneNumber,
    location,
    birthDate,
    photoURL,
    coverPhotoURL,
    gender,
    avatarShape,
    avatarFrame,
    userStatus,
    statusEmoji,
    pronouns,
    customBadge
  } = user as User;

  const [editUserData, setEditUserData] = useState<EditableUserData>({
    bio,
    name,
    website,
    phoneNumber: phoneNumber ?? null,
    birthDate: birthDate ?? null,
    photoURL: getAvatarSrc(photoURL, gender),
    location,
    coverPhotoURL: getBannerSrc(coverPhotoURL),
    avatarShape: avatarShape ?? globalShape ?? 'circle',
    avatarFrame: avatarFrame ?? globalFrame ?? 'none',
    userStatus: userStatus ?? null,
    statusEmoji: statusEmoji ?? null,
    pronouns: pronouns ?? null,
    customBadge: customBadge ?? null
  });

  const [userImages, setUserImages] = useState<UserImages>({        photoURL: [],
        coverPhotoURL: []
  });
  const [birthdayParts, setBirthdayParts] = useState<BirthdayParts>(
    getBirthdayParts(birthDate)
  );
  /* Lieux de résidence et sites web : une ou plusieurs entrées chacun, avec
     leurs cases d'ajout. On garde les cases vides pendant la saisie, elles
     sont simplement ignorées à l'enregistrement. */
  const [locationEntries, setLocationEntries] = useState<string[]>(() =>
    splitProfileEntries(location)
  );
  const [websiteEntries, setWebsiteEntries] = useState<string[]>(() =>
    splitProfileEntries(website)
  );

  const handleCloseModal = (): void => {
    [editUserData.photoURL, editUserData.coverPhotoURL].forEach((image) =>
      URL.revokeObjectURL(image ?? '')
    );
    setEditUserData({
      bio,
      name,
      website,
      phoneNumber: phoneNumber ?? null,
      birthDate: birthDate ?? null,
      photoURL: getAvatarSrc(photoURL, gender),
      location,
      coverPhotoURL: getBannerSrc(coverPhotoURL),
      avatarShape: avatarShape ?? globalShape ?? 'circle',
      avatarFrame: avatarFrame ?? globalFrame ?? 'none',
      userStatus: userStatus ?? null,
      statusEmoji: statusEmoji ?? null,
      pronouns: pronouns ?? null,
      customBadge: customBadge ?? null
    });
    setUserImages({ photoURL: [], coverPhotoURL: [] });
    setBirthdayParts(getBirthdayParts(birthDate));
    setLocationEntries(splitProfileEntries(location));
    setWebsiteEntries(splitProfileEntries(website));
    setShapesOpen(false);
    setFramesOpen(false);
    setPhotosOpen(false);
    setCameraOpen(false);
    setExpanded(false);
    closeModal();
  };

  const handlePageClose = (): void => {
    handleCloseModal();
    void push('/settings');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cleanImage, []);

  const inputNameError = !editUserData.name?.trim()
    ? 'Saisissez un nom pour votre profil.'
    : '';
  const websiteError = websiteEntries
    .map((entry) => entry.trim())
    .filter(Boolean)
    .some((entry) => !normalizeWebsite(entry))
    ? 'Saisissez une URL valide, par exemple exemple.com.'
    : '';
  const phoneNumberError =
    editUserData.phoneNumber && !isValidPhoneNumber(editUserData.phoneNumber)
      ? 'Saisissez un numéro valide pour le pays choisi.'
      : '';
  const normalizedYear = normalizeYear(birthdayParts.year);
  const hasBirthdayPart = Boolean(
    birthdayParts.day || birthdayParts.month || birthdayParts.year
  );
  const hasCompleteBirthday = Boolean(
    birthdayParts.day &&
      birthdayParts.month &&
      normalizedYear &&
      normalizedYear.length === 4
  );
  const birthdayDate = hasCompleteBirthday
    ? new Date(
        Number(normalizedYear),
        Number(birthdayParts.month) - 1,
        Number(birthdayParts.day)
      )
    : null;
  const isValidBirthday =
    birthdayDate !== null &&
    birthdayDate.getFullYear() === Number(normalizedYear) &&
    birthdayDate.getMonth() === Number(birthdayParts.month) - 1 &&
    birthdayDate.getDate() === Number(birthdayParts.day) &&
    birthdayDate <= new Date() &&
    birthdayDate.getFullYear() >= 1900;
  const birthdayError =
    hasBirthdayPart && !isValidBirthday
      ? 'Saisissez une date d’anniversaire valide (JJ / MM / AA ou AAAA).'
      : '';

  const removeProfileImage = (): void => {
    setEditUserData({
      ...editUserData,
      photoURL: getAvatarSrc(null, gender)
    });

    setUserImages({
      ...userImages,
      photoURL: []
    });

    URL.revokeObjectURL(editUserData.photoURL ?? '');
  };

  /* Choix d'une photo de profil toute prête (avatars par défaut du site ou
     portraits proposés) : elle remplace la photo actuelle, sans envoi de
     fichier à l'enregistrement. */
  const chooseAvatarImage = (src: string): void => {
    URL.revokeObjectURL(editUserData.photoURL ?? '');

    setEditUserData({
      ...editUserData,
      photoURL: src
    });

    setUserImages({
      ...userImages,
      photoURL: []
    });
  };

  const updateData = async (): Promise<void> => {
    if (inputNameError || websiteError || phoneNumberError || birthdayError)
      return;
    setLoading(true);
    const userId = user?.id as string;
    const { photoURL, coverPhotoURL: coverURL } = userImages;

    try {
      const [newPhotoURL, newCoverPhotoURL] = await Promise.all(
        [photoURL, coverURL].map((image) =>
          uploadImages(userId, image, 'Infini')
        )
      );

      const newImages: Partial<Pick<User, 'photoURL' | 'coverPhotoURL'>> = {};

      // Only overwrite the stored images when a new file was actually
      // uploaded, otherwise saving the profile would erase the current
      // picture and banner.
      if (newPhotoURL?.[0]?.src) newImages.photoURL = newPhotoURL[0].src;
      if (newCoverPhotoURL?.[0]?.src)
        newImages.coverPhotoURL = newCoverPhotoURL[0].src;

      const trimmedKeys: Readonly<EditableData[]> = [
        'name',
        'bio',
        'location',
        'website',
        'phoneNumber',
        'userStatus',
        'statusEmoji',
        'pronouns',
        'customBadge'
      ];

      const trimmedTexts: TrimmedTexts = {
        ...trimmedKeys.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: editUserData[curr]?.trim() ?? null
          }),
          {} as TrimmedTexts
        ),
        website: joinProfileEntries(
          websiteEntries.map((entry) => normalizeWebsite(entry.trim()) ?? '')
        ),
        location: joinProfileEntries(locationEntries)
      };

      const newUserData: Readonly<EditableUserData> = {
        ...editUserData,
        photoURL: getAvatarSrc(editUserData.photoURL, gender),
        coverPhotoURL: getBannerSrc(editUserData.coverPhotoURL),
        avatarShape: editUserData.avatarShape,
        avatarFrame: editUserData.avatarFrame,
        ...trimmedTexts,
        birthDate: isValidBirthday
          ? `${normalizedYear}-${birthdayParts.month.padStart(2, '0')}-${birthdayParts.day.padStart(2, '0')}`
          : null,
        ...newImages
      };

      if (editUserData.avatarShape) setAvatarShape(editUserData.avatarShape);
      if (editUserData.avatarFrame) setAvatarFrame(editUserData.avatarFrame);

      await sleep(500);
      await updateUserData(userId, newUserData);

      setEditUserData(newUserData);
      setLocationEntries(splitProfileEntries(newUserData.location));
      setWebsiteEntries(splitProfileEntries(newUserData.website));
      cleanImage();
      if (!pageMode) closeModal();
      toast.success('Photo et profil mis à jour');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : getStorageErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  /* Photo de profil choisie depuis l'appareil, ou prise avec l'appareil
     photo : l'aperçu s'affiche tout de suite, l'envoi du fichier se fait à
     l'enregistrement du profil. */
  const applyProfilePhoto = (files: FileList | null): void => {
    const imagesData = getImagesData(files);

    if (!imagesData) {
      toast.error('Choisissez une image ou un GIF valide (20 Mo maximum).');
      return;
    }

    setEditUserData({
      ...editUserData,
      photoURL: imagesData.imagesPreviewData[0].src
    });

    setUserImages({
      ...userImages,
      photoURL: imagesData.selectedImagesData
    });
  };

  const editImage =
    (type: 'cover' | 'profile') =>
    ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
      if (type === 'profile') {
        applyProfilePhoto(files);
        return;
      }

      const imagesData = getImagesData(files);

      if (!imagesData) {
        toast.error('Choisissez une image ou un GIF valide (20 Mo maximum).');
        return;
      }

      const { imagesPreviewData, selectedImagesData } = imagesData;
      const newImage = imagesPreviewData[0].src;

      setEditUserData({
        ...editUserData,
        coverPhotoURL: newImage
      });

      setUserImages({
        ...userImages,
        coverPhotoURL: selectedImagesData
      });
    };

  /* Choix d'une photo déjà présente sur l'appareil : la photo est mise en
     aperçu, puis la fenêtre se referme pour laisser voir le grand aperçu. La
     case est vidée, pour pouvoir choisir deux fois la même photo. */
  const pickPhotoFromDevice = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { files } = event.target;

    if (!files?.length) return;

    applyProfilePhoto(files);
    setPhotosOpen(false);
    event.target.value = '';
  };

  /* Photo prise à l'instant avec l'appareil photo. */
  const captureCameraPhoto = (file: File): void => {
    setCameraOpen(false);
    applyProfilePhoto(fileListFromFile(file));
  };

  const removeCoverImage = (): void => {
    setEditUserData({
      ...editUserData,
      coverPhotoURL: null
    });

    setUserImages({
      ...userImages,
      coverPhotoURL: []
    });

    URL.revokeObjectURL(editUserData.coverPhotoURL ?? '');
  };

  const cleanImage = (): void => {
    const imagesKey: Readonly<Partial<EditableData>[]> = [
      'photoURL',
      'coverPhotoURL'
    ];

    imagesKey.forEach((image) =>
      URL.revokeObjectURL(editUserData[image] ?? '')
    );

    setUserImages({
      photoURL: [],
      coverPhotoURL: []
    });
  };


  const handleChange =
    (key: EditableData) =>
    ({
      target: { value }
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditUserData({ ...editUserData, [key]: value });

  const handleKeyboardShortcut = ({
    key,
    target,
    ctrlKey
  }: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (
      ctrlKey &&
      key === 'Enter' &&
      !inputNameError &&
      !websiteError &&
      !phoneNumberError &&
      !birthdayError
    ) {
      target.blur();
      void updateData();
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (info.offset.y < -60) {
      setExpanded(true);
      return;
    }

    if (expanded && info.offset.y > 70) {
      setExpanded(false);
      return;
    }

    if (info.offset.y > 120 || info.velocity.y > 550) handleCloseModal();
  };

  const handleOpenModal = (): void => {
    setExpanded(false);
    openModal();
  };

  const sheetAnimation: Variants = {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 30, stiffness: 300 }
    },
    exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
  };

  const inputFields: Readonly<RequiredInputFieldProps[]> = [
    {
      label: 'Nom',
      inputId: 'name',
      inputValue: editUserData.name,
      inputLimit: 50,
      errorMessage: inputNameError
    },
    {
      label: 'Biographie',
      inputId: 'bio',
      inputValue: editUserData.bio,
      inputLimit: 160,
      useTextArea: true
    }
  ];

  /* Toutes les anciennes formes (fleur, nuage, étoile, pentagone, carré…)
     s'affichent encore avec leur nom, même si elles ne sont plus proposées. */
  const currentShape: AvatarShape = editUserData.avatarShape ?? 'circle';

  const currentShapeLabel = avatarShapeLabels[currentShape] ?? 'Rond';

  const currentFrame: AvatarFrame = editUserData.avatarFrame ?? 'none';
  const currentFrameLabel = getAvatarFrameLabel(currentFrame);

  /* Photo utilisée par les aperçus (forme, cadre, choix de la photo). */
  const avatarPreviewSrc = getAvatarSrc(editUserData.photoURL, gender);
  /* Photo réellement enregistrée sur le profil : elle sert à la case « Votre
     photo de profil actuelle », qui permet d'y revenir pendant la
     modification. */
  const savedAvatarSrc = getAvatarSrc(photoURL, gender);
  const avatarFallbackSrc = getAvatarSrc(null, gender);

  /* Aperçu d'une photo dans une forme donnée : la photo découpée, avec
     l'avatar par défaut derrière au cas où la photo ne se charge pas. */
  const renderAvatarPreview = (
    src: string,
    sizeClass: string,
    shape: AvatarShape
  ): JSX.Element => (
    <span
      className={cn(
        'block overflow-hidden bg-main-search-background',
        sizeClass,
        getAvatarShapeClass(shape)
      )}
      style={{
        backgroundImage: `url("${avatarFallbackSrc}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <img
        alt=''
        className='h-full w-full object-cover'
        src={src}
        onError={(event): void => {
          const image = event.currentTarget;
          if (image.dataset.fallback) return;
          image.dataset.fallback = 'true';
          image.src = avatarFallbackSrc;
        }}
      />
    </span>
  );

  /* Aperçu de la photo actuelle dans une forme (les formes proposées). */
  const renderShapePreview = (
    shapeKey: AvatarShape,
    sizeClass: string
  ): JSX.Element => renderAvatarPreview(avatarPreviewSrc, sizeClass, shapeKey);

  /* Aperçu d'une photo proposée, dans la forme choisie. */
  const renderPhotoPreview = (src: string): JSX.Element =>
    renderAvatarPreview(src, 'h-10 w-10', currentShape);

  /* Aperçu d'un cadre : la décoration posée autour de la photo. */
  const renderFramePreview = (frameKey: string): JSX.Element => (
    <span className='relative block h-10 w-10'>
      <AvatarDecoration frame={frameKey as AvatarFrame} />
      {renderShapePreview(currentShape, 'h-10 w-10')}
    </span>
  );

  /* Nom de la photo affichée aujourd'hui (celui d'une photo proposée, sinon
     « Photo actuelle »). */
  const currentPhotoLabel =
    avatarImageOptions.find(({ src }) => src === avatarPreviewSrc)?.name ??
    'Photo actuelle';

  /* Photos proposées : les deux avatars par défaut du site et trois
     portraits. Choisir une photo remplace celle du profil, sans envoi de
     fichier à l'enregistrement. */
  const photoOptions: ReadonlyArray<[string, string]> = avatarImageOptions.map(
    ({ name: photoName, src: photoSrc }) => [photoSrc, photoName]
  );

  /* Actions de la fenêtre des photos : revenir à la photo enregistrée (case
     mise en couleur), choisir une image de l'appareil, ou se prendre en photo
     avec l'appareil photo. */
  const photoActions: ReadonlyArray<AvatarPickerAction> = [
    {
      key: 'current',
      label: 'Votre photo de profil actuelle',
      description: 'Revenir à la photo enregistrée',
      preview: renderPhotoPreview(savedAvatarSrc),
      accent: true,
      selected: avatarPreviewSrc === savedAvatarSrc,
      onSelect: (): void => chooseAvatarImage(savedAvatarSrc)
    },
    {
      key: 'upload',
      label: 'Télécharger votre photo de profil',
      description: 'Choisir une image dans votre appareil',
      iconName: 'upload',
      onSelect: (): void => uploadPhotoRef.current?.click()
    },
    {
      key: 'camera',
      label: 'Se prendre en photo',
      description: 'Utiliser l’appareil photo',
      iconName: 'photo_camera',
      onSelect: (): void => {
        setPhotosOpen(false);
        setCameraOpen(true);
      }
    }
  ];

  /* Case d'une section (forme, cadre, photo) : une case rectangle avec
     l'aperçu et le nom du choix actuel, et le bouton qui ouvre la liste
     complète dans une fenêtre (menu qui remonte du bas sur téléphone). */
  const choiceCard = ({
    label,
    description,
    preview,
    buttonLabel,
    onOpen
  }: {
    label: string;
    description: string;
    preview: ReactNode;
    buttonLabel: string;
    onOpen: () => void;
  }): JSX.Element => (
    <div className='flex items-center gap-3 rounded-md border border-light-border p-3 dark:border-dark-border'>
      <span className='relative block h-10 w-10 shrink-0'>{preview}</span>

      <div className='flex min-w-0 flex-1 flex-col'>
        <span className='truncate text-sm font-semibold text-light-primary dark:text-dark-primary'>
          {label}
        </span>
        <span className='truncate text-[11px] text-light-secondary dark:text-dark-secondary'>
          {description}
        </span>
      </div>

      <button
        type='button'
        onClick={onOpen}
        className='shrink-0 rounded-full border border-light-line-reply px-3 py-1.5 text-xs font-bold
                   text-light-primary transition hover:bg-light-primary/10
                   dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/10'
      >
        {buttonLabel}
      </button>
    </div>
  );

  const editProfileContent = (
    <EditProfileModal
      pageMode={pageMode}
      name={name}
      loading={loading}
      photoURL={editUserData.photoURL}
      gender={gender}
      avatarShape={editUserData.avatarShape}
      avatarFrame={editUserData.avatarFrame}
      coverPhotoURL={editUserData.coverPhotoURL}
      inputNameError={inputNameError || websiteError || phoneNumberError || birthdayError}
      editImage={editImage}
      closeModal={pageMode ? handlePageClose : handleCloseModal}
      updateData={updateData}
      removeCoverImage={removeCoverImage}
      removeProfileImage={removeProfileImage}
      dragControls={dragControls}
    >
          {/* Forme de l'image de profil : la case du choix actuel, et la liste
              complète dans une fenêtre (menu sur téléphone). */}
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
              Forme de l’image de profil
            </span>

            {choiceCard({
              label: currentShapeLabel,
              description: 'Forme donnée à votre photo',
              preview: renderShapePreview(currentShape, 'h-10 w-10'),
              buttonLabel: 'Voir toutes les formes',
              onOpen: (): void => setShapesOpen(true)
            })}
          </div>

          {/* Cadre de l'avatar : la décoration actuelle, et la liste complète
              dans une fenêtre (menu sur téléphone). */}
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
              Cadre de l’avatar
            </span>

            {choiceCard({
              label: currentFrameLabel,
              description: 'Décoration posée autour de la photo',
              preview: (
                <span className='relative block h-10 w-10'>
                  <AvatarDecoration frame={currentFrame} />
                  {renderShapePreview(currentShape, 'h-10 w-10')}
                </span>
              ),
              buttonLabel: 'Voir tous les cadres',
              onOpen: (): void => setFramesOpen(true)
            })}
          </div>

          {/* Photo de profil : la photo actuelle, et les photos proposées dans
              une fenêtre (menu sur téléphone). */}
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-semibold text-light-secondary dark:text-dark-secondary'>
              Photo de profil
            </span>

            {choiceCard({
              label: currentPhotoLabel,
              description: 'Photo affichée sur votre profil',
              preview: renderShapePreview(currentShape, 'h-10 w-10'),
              buttonLabel: 'Choisir une photo',
              onOpen: (): void => setPhotosOpen(true)
            })}
          </div>

          {/* Listes complètes : fenêtre sur ordinateur, menu sur téléphone. */}
          <AvatarPickerModal
            open={shapesOpen}
            title='Forme de l’image de profil'
            subtitle='Choisissez la forme donnée à votre photo.'
            options={avatarShapeOptions}
            value={currentShape}
            gridClass='grid-cols-2 xs:grid-cols-3'
            onClose={(): void => setShapesOpen(false)}
            onSelect={(shapeKey): void =>
              setEditUserData({
                ...editUserData,
                avatarShape: shapeKey as AvatarShape
              })
            }
            renderPreview={(shapeKey): JSX.Element =>
              renderShapePreview(shapeKey as AvatarShape, 'h-10 w-10')
            }
          />

          <AvatarPickerModal
            open={framesOpen}
            title='Cadre de l’avatar'
            subtitle='Choisissez la décoration posée autour de votre photo.'
            options={avatarFrameOptions}
            value={currentFrame}
            gridClass='grid-cols-2 xs:grid-cols-3'
            onClose={(): void => setFramesOpen(false)}
            onSelect={(frameKey): void =>
              setEditUserData({
                ...editUserData,
                avatarFrame: frameKey as AvatarFrame
              })
            }
            renderPreview={renderFramePreview}
          />

          {/* Entrée de fichier cachée : elle sert à « Télécharger votre photo
              de profil » (choisir une image déjà sur l'appareil). */}
          <input
            className='hidden'
            type='file'
            accept='image/*'
            ref={uploadPhotoRef}
            onChange={pickPhotoFromDevice}
          />

          {/* Prise de photo : la vraie caméra de l'appareil. */}
          <CameraModal
            open={cameraOpen}
            onClose={(): void => setCameraOpen(false)}
            onCapture={captureCameraPhoto}
            onPickFile={(): void => {
              setCameraOpen(false);
              uploadPhotoRef.current?.click();
            }}
          />

          <AvatarPickerModal
            open={photosOpen}
            title='Photo de profil'
            subtitle='Choisissez la photo affichée sur votre profil.'
            options={photoOptions}
            value={avatarPreviewSrc}
            gridClass='grid-cols-2 xs:grid-cols-3'
            actions={photoActions}
            optionsTitle='Photos proposées'
            onClose={(): void => setPhotosOpen(false)}
            onSelect={chooseAvatarImage}
            renderPreview={renderPhotoPreview}
          />

          {/* Nom & Biographie */}
          {inputFields.map((inputData) => (
            <InputField
              {...inputData}
              handleChange={handleChange(inputData.inputId)}
              handleKeyboardShortcut={handleKeyboardShortcut}
              key={inputData.inputId}
            />
          ))}

          {/* Lieu de résidence : plusieurs cases possibles, avec la recherche
              de vraies villes. */}
          <UserEditLocation
            locations={locationEntries}
            onChange={setLocationEntries}
          />

          {/* Site web : plusieurs cases possibles, affichées sur le profil. */}
          <UserEditWebsites
            websites={websiteEntries}
            errorMessage={websiteError}
            onChange={setWebsiteEntries}
          />

          {/* Date de naissance avec cases jour / mois / année */}
          <UserEditBirthday
            birthdayParts={birthdayParts}
            setBirthdayParts={setBirthdayParts}
            birthdayError={birthdayError}
          />
          <div className='flex flex-col gap-1.5'>
            <label
              className='text-sm font-semibold text-light-secondary dark:text-dark-secondary'
              htmlFor='phoneNumber'
            >
              Numéro de téléphone
            </label>
            <PhoneInput
              id='phoneNumber'
              className='profile-phone-input'
              defaultCountry='FR'
              labels={phoneLabels}
              international={false}
              value={editUserData.phoneNumber ?? undefined}
              onChange={(value) =>
                setEditUserData({ ...editUserData, phoneNumber: value ?? null })
              }
              onCountryChange={(value): void => {
                if (value) setPhoneCountry(value);
              }}
              countrySelectProps={{ 'aria-label': 'Pays du numéro de téléphone' }}
              placeholder={PHONE_PLACEHOLDERS[phoneCountry] ?? ''}
              autoComplete='off'
            />
            {phoneNumberError && (
              <p className='text-sm text-accent-red'>{phoneNumberError}</p>
            )}
          </div>
    </EditProfileModal>
  );

  if (pageMode)
    return (
      <div className='flex flex-1 flex-col'>{editProfileContent}</div>
    );

  return (
    <form className={cn(hide && 'hidden md:block')}>
      <Modal
        className='flex items-end justify-center p-0 xs:items-center xs:p-4'
        modalAnimation={sheetAnimation}
        modalClassName={`fixed inset-x-0 bottom-0 flex w-full max-w-xl flex-col overflow-hidden border-t border-light-border bg-main-background shadow-2xl dark:border-dark-border xs:relative xs:my-auto xs:max-h-[85vh] xs:rounded-md xs:border xs:shadow-2xl ${
          expanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))] xs:h-auto'
            : 'h-[88dvh] max-h-[88dvh] rounded-t-md xs:h-auto'
        }`}
        drag={false}
        open={open}
        closeModal={handleCloseModal}
      >
        {editProfileContent}
      </Modal>
      <Button
        className='dark-bg-tab self-start border border-light-line-reply px-4 py-1.5 font-bold
                   hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary 
                   dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
        onClick={handleOpenModal}
      >
        Modifier
      </Button>
    </form>
  );
}
