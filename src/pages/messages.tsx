import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { motion, useDragControls } from 'framer-motion';
import cn from 'clsx';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import {
  userContactsCollection,
  userConversationsCollection,
  usersCollection
} from '@lib/firebase/collections';
import {
  createGroupConversation,
  getChatId,
  isConversationUnread,
  markConversationAsRead
} from '@lib/firebase/chat';
import { formatChatTime } from '@lib/date';
import { withAiDefaults } from '@lib/ai';
import {
  AI_BOT_DESCRIPTION,
  AI_BOT_NAME,
  AI_CONVERSATION_ID,
  ensureAiConversation
} from '@lib/ai-bot';
import { MainLayout } from '@components/layout/main-layout';
import { ProtectedLayout } from '@components/layout/common-layout';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { SEO } from '@components/common/seo';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from '@components/modal/modal';
import { Loading } from '@components/ui/loading';
import { Conversation } from '@components/messages/conversation';
import { GroupAvatar } from '@components/messages/group-avatar';
import { AiAvatar } from '@components/messages/ai-avatar';
import { getAvatarShapeClass } from '@lib/avatar-shape';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { UserFollowing } from '@components/user/user-following';
import { FollowButton } from '@components/ui/follow-button';
import type { ChangeEvent, ReactElement, ReactNode } from 'react';
import type { PanInfo, Variants } from 'framer-motion';
import type { User } from '@lib/types/user';
import type { Conversation as ConversationData } from '@lib/types/message';
import type { InboxContact } from '@lib/types/contact';

const composeSheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

const filterAndSortUsers = (
  users: User[],
  term: string,
  following: string[],
  currentUserId?: string
): User[] => {
  const normalized = term.trim().toLowerCase();

  return users
    .filter((item) => item.id !== currentUserId)
    .filter((item) =>
      normalized
        ? item.name.toLowerCase().includes(normalized) ||
          item.username.toLowerCase().includes(normalized)
        : true
    )
    .sort((left, right) => {
      const leftFollowed = following.includes(left.id) ? 0 : 1;
      const rightFollowed = following.includes(right.id) ? 0 : 1;
      if (leftFollowed !== rightFollowed) return leftFollowed - rightFollowed;
      return left.name.localeCompare(right.name, 'fr');
    });
};

/** Convertit un fichier (photo de groupe) en base64 pour l'API d'upload. */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      resolve(result.replace(/^data:[^;]+;base64,/, ''));
    };
    reader.onerror = () => reject(new Error('read-error'));
    reader.readAsDataURL(file);
  });
}

/**
 * Icône « groupe » : trois avatars qui se chevauchent, comme l'avatar des
 * groupes de la messagerie (deux en haut, un en bas au milieu).
 */
function GroupIcon(): JSX.Element {
  return (
    <span aria-hidden='true' className='relative block h-11 w-11 shrink-0'>
      <span
        className='absolute left-0 top-0 block h-6 w-6 rounded-full bg-cover bg-center ring-2 ring-main-background'
        style={{ backgroundImage: 'url("/Avatar homme.png")' }}
      />
      <span
        className='absolute right-0 top-0 block h-6 w-6 rounded-full bg-cover bg-center ring-2 ring-main-background'
        style={{ backgroundImage: 'url("/Avatar femme.png")' }}
      />
      <span className='absolute bottom-0 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-light-secondary/40 text-sm font-bold leading-none text-light-primary ring-2 ring-main-background dark:bg-dark-secondary/50 dark:text-dark-primary'>
        +
      </span>
    </span>
  );
}

export default function MessagesPage(): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();
  const { isMobile, isTwoPane, width } = useWindow();

  /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */
  const isSheet = width < 1024;
  const [createOpen, setCreateOpen] = useState(false);
  const [createExpanded, setCreateExpanded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerExpanded, setPickerExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [inboxWidth, setInboxWidth] = useState(320);
  const resizingRef = useRef(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [groupExpanded, setGroupExpanded] = useState(false);
  const [groupSearch, setGroupSearch] = useState('');
  const [groupSelection, setGroupSelection] = useState<string[]>([]);
  const [groupStep, setGroupStep] = useState<1 | 2 | 3>(1);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupPhoto, setGroupPhoto] = useState<string | null>(null);
  const [groupPhotoBusy, setGroupPhotoBusy] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ConversationData | null>(
    null
  );
  /* Conversation avec l'assistant d'intelligence artificielle. */
  const [selectedAi, setSelectedAi] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<User | null>(null);
  const [multiDeleteOpen, setMultiDeleteOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState(false);
  const [swipeOpenId, setSwipeOpenId] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>(
    'left'
  );
  const swipeGestureRef = useRef<{
    startX: number;
    startY: number;
    direction: 'h' | 'v' | null;
  }>({
    startX: 0,
    startY: 0,
    direction: null
  });

  /* Sélection multiple par appui long (remplace le swipe de suppression). */
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dragControls = useDragControls();
  const createDragControls = useDragControls();
  const groupDragControls = useDragControls();
  const groupPhotoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedIds.size === 0) return;
    const handleOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-contact-row]')) return;
      setSelectedIds(new Set());
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [selectedIds.size]);

  const { data: allUsers, loading: usersLoading } = useCollection(
    query(usersCollection),
    { allowNull: true }
  );

  const { data: contacts, loading: contactsLoading } =
    useCollection<InboxContact>(
      query(
        userContactsCollection(user?.id ?? 'pending'),
        orderBy('addedAt', 'desc')
      ),
      { allowNull: true, disabled: !user?.id }
    );

  const contactIds = useMemo(
    () => contacts?.map((contact) => contact.id) ?? [],
    [contacts]
  );

  const { data: contactUsers, loading: contactUsersLoading } = useArrayDocument(
    contactIds,
    usersCollection,
    { includeUser: false, disabled: !contactIds.length }
  );

  const inboxUsers = useMemo(() => {
    if (!contactIds.length) return [];

    const usersById = new Map(
      (contactUsers ?? []).map((item) => [item.id, item])
    );

    return contactIds
      .map((id) => usersById.get(id))
      .filter((item): item is User => Boolean(item));
  }, [contactIds, contactUsers]);

  /* Groupes : conversations de type « groupe » de votre boîte de réception. */
  const { data: conversations } = useCollection<ConversationData>(
    query(
      userConversationsCollection(user?.id ?? 'pending'),
      orderBy('updatedAt', 'desc')
    ),
    { allowNull: true, disabled: !user?.id }
  );

  const groupConversations = useMemo(
    () => (conversations ?? []).filter((item) => item.type === 'group'),
    [conversations]
  );

  /* Conversations privées de votre boîte de réception : elles contiennent le
     dernier message, mis à jour en temps réel par l'écoute ci-dessus. */
  const directConversations = useMemo(() => {
    const map = new Map<string, ConversationData>();

    (conversations ?? []).forEach((item) => {
      if (item.type !== 'group') map.set(item.id, item);
    });

    return map;
  }, [conversations]);

  /* Conversation avec l'assistant : elle est rangée dans votre boîte, comme
     les autres. Tant qu'elle n'a pas été ouverte, on en fabrique une
     provisoire pour que la ligne soit toujours présente. */
  const aiConversation = useMemo<ConversationData>(() => {
    const existing = (conversations ?? []).find((item) => item.type === 'ai');

    if (existing) return existing;

    return {
      id: AI_CONVERSATION_ID,
      participants: user?.id ? [user.id] : [],
      updatedAt: 0,
      lastMessage: null,
      type: 'ai',
      name: AI_BOT_NAME,
      photoURL: null,
      description: AI_BOT_DESCRIPTION,
      createdBy: user?.id ?? ''
    };
  }, [conversations, user?.id]);

  /* L'assistant n'est proposé que si la personne l'a laissé actif. */
  const aiSettings = withAiDefaults(user?.aiSettings);
  const aiAvailable = aiSettings.enabled && aiSettings.assistantEnabled;

  const groupMemberIds = useMemo(
    () =>
      Array.from(
        new Set(
          groupConversations
            .flatMap((item) => item.participants)
            .filter((id) => id !== user?.id)
        )
      ),
    [groupConversations, user?.id]
  );

  const { data: groupMemberUsers } = useArrayDocument(
    groupMemberIds,
    usersCollection,
    { includeUser: false, disabled: !groupMemberIds.length }
  );

  const groupUsersById = useMemo(
    () => new Map((groupMemberUsers ?? []).map((item) => [item.id, item])),
    [groupMemberUsers]
  );

  /** Membres d'un groupe (hors vous-même), pour l'avatar et les noms. */
  const getGroupMembers = (group: ConversationData): User[] =>
    group.participants
      .filter((id) => id !== user?.id)
      .map((id) => groupUsersById.get(id))
      .filter((item): item is User => Boolean(item));

  /** Personnes cochées dans l'assistant, pour l'aperçu avant création. */
  const selectedMembers = useMemo(
    () => (allUsers ?? []).filter((item) => groupSelection.includes(item.id)),
    [allUsers, groupSelection]
  );

  const pickerUsers = useMemo(
    () =>
      filterAndSortUsers(
        allUsers ?? [],
        search,
        user?.following ?? [],
        user?.id
      ),
    [allUsers, search, user?.following, user?.id]
  );

  const groupUsers = useMemo(
    () =>
      filterAndSortUsers(
        allUsers ?? [],
        groupSearch,
        user?.following ?? [],
        user?.id
      ),
    [allUsers, groupSearch, user?.following, user?.id]
  );

  const closePicker = (): void => {
    setPickerExpanded(false);
    setPickerOpen(false);
    setSearch('');
  };

  /* La fenêtre « Créer » : sur téléphone, la barre du haut permet de la
     faire glisser vers le bas pour la refermer, vers le haut pour l'étirer. */
  const closeCreate = (): void => {
    setCreateExpanded(false);
    setCreateOpen(false);
  };

  const openCreate = (): void => {
    setCreateExpanded(false);
    setCreateOpen(true);
  };

  const handleCreateDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (!isMobile) return;

    if (info.offset.y < -60) {
      setCreateExpanded(true);
      return;
    }

    if (createExpanded && info.offset.y > 60) {
      setCreateExpanded(false);
      return;
    }

    if (info.offset.y > 100 || info.velocity.y > 700) closeCreate();
  };

  const openPicker = (): void => {
    closeCreate();
    setPickerExpanded(false);
    setPickerOpen(true);
  };

  const resetGroupForm = (): void => {
    setGroupStep(1);
    setGroupSearch('');
    setGroupSelection([]);
    setGroupName('');
    setGroupDescription('');
    setGroupPhoto(null);
    setGroupPhotoBusy(false);
  };

  const openGroup = (): void => {
    closeCreate();
    resetGroupForm();
    setGroupOpen(true);
  };

  const closeGroup = (): void => {
    setGroupExpanded(false);
    setGroupOpen(false);
    resetGroupForm();
  };

  /* La fenêtre de création de groupe se glisse elle aussi : vers le bas pour
     la refermer, vers le haut pour l'étirer. */
  const handleGroupDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (!isMobile) return;

    if (info.offset.y < -60) {
      setGroupExpanded(true);
      return;
    }

    if (groupExpanded && info.offset.y > 60) {
      setGroupExpanded(false);
      return;
    }

    if (info.offset.y > 100 || info.velocity.y > 700) closeGroup();
  };

  const toggleGroupMember = (id: string): void => {
    setGroupSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  /* Photo du groupe : envoyée via l'API d'upload, et retirable à tout moment. */
  const handleGroupPhotoChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file || !user?.id) return;

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image trop lourde : 8 Mo maximum.');
      return;
    }

    setGroupPhotoBusy(true);

    try {
      const base64Data = await fileToBase64(file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name || `group-${Date.now()}.jpg`,
          contentType: file.type || 'image/jpeg',
          base64Data,
          userId: user.id
        })
      });

      if (!response.ok) throw new Error('upload-failed');

      const { url } = (await response.json()) as { url?: string };
      if (!url) throw new Error('upload-failed');

      setGroupPhoto(url);
    } catch {
      toast.error("Impossible d'ajouter cette photo.");
    } finally {
      setGroupPhotoBusy(false);
    }
  };

  const handleCreateGroup = async (): Promise<void> => {
    const name = groupName.trim();

    if (!user?.id || creatingGroup || !name || groupSelection.length === 0)
      return;

    setCreatingGroup(true);

    try {
      const conversation = await createGroupConversation({
        creatorId: user.id,
        memberIds: groupSelection,
        name,
        photoURL: groupPhoto,
        description: groupDescription
      });

      setGroupOpen(false);
      resetGroupForm();
      setSelectedUser(null);
      setSwipeOpenId(null);
      setSelectedGroup(conversation);
      toast.success('Groupe créé.');
    } catch {
      toast.error('Impossible de créer le groupe.');
    } finally {
      setCreatingGroup(false);
    }
  };

  const handlePickerDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    if (!isMobile) return;

    if (info.offset.y < -60) {
      setPickerExpanded(true);
      return;
    }

    if (pickerExpanded && info.offset.y > 70) {
      setPickerExpanded(false);
      return;
    }

    if (info.offset.y > 120 || info.velocity.y > 550) closePicker();
  };

  const addContact = async (target: User): Promise<void> => {
    if (!user?.id) return;

    if (!contactIds.includes(target.id))
      await setDoc(doc(userContactsCollection(user.id), target.id), {
        id: target.id,
        addedAt: Date.now()
      });

    setSelectedGroup(null);
    setSelectedUser(target);
    closePicker();
  };

  /* Conversation demandée depuis un profil (/messages?user=<pseudo ou id>) : on
     retrouve la personne, on l'ajoute aux contacts si besoin, on ouvre la
     discussion, puis on efface le paramètre pour ne pas la réouvrir. */
  const requestedUser =
    typeof router.query.user === 'string' ? router.query.user : undefined;
  const requestedUserHandled = useRef(false);

  useEffect(() => {
    if (!requestedUser || requestedUserHandled.current) return;
    if (!user?.id || !allUsers) return;

    requestedUserHandled.current = true;

    const openRequestedUser = async (): Promise<void> => {
      const value = requestedUser.trim();
      const normalized = value.toLowerCase();

      const known = allUsers.find(
        (item) =>
          item.id === value || item.username?.toLowerCase() === normalized
      );

      /* Cas courant : la fiche est déjà chargée et complète. */
      if (known?.id) {
        void addContact(known);
        return;
      }

      /* Sinon on récupère la fiche par son pseudo : certaines fiches n'ont pas
         de champ « id ». L'identifiant du document est alors la référence à
         utiliser partout (contacts, conversations). */
      const snapshot = await getDocs(
        query(
          usersCollection,
          where('username', '==', known?.username ?? value),
          limit(1)
        )
      );

      if (snapshot.empty) {
        toast.error('Impossible de trouver cette personne.');
        return;
      }

      const [targetDocument] = snapshot.docs;
      const targetData = targetDocument.data();

      /* On répare la fiche au passage, pour que tout le reste de
         l'application retrouve la bonne référence. */
      if (targetData.id !== targetDocument.id)
        await setDoc(
          doc(usersCollection, targetDocument.id),
          { id: targetDocument.id },
          { merge: true }
        );

      await addContact({ ...targetData, id: targetDocument.id });
    };

    void openRequestedUser().catch(() =>
      toast.error("Impossible d'ouvrir cette conversation.")
    );

    void router.replace('/messages', undefined, { shallow: true });
  }, [requestedUser, user?.id, allUsers, router, addContact]);

  const confirmDeleteContact = async (): Promise<void> => {
    if (!user?.id || !contactToDelete || deletingContact) return;

    setDeletingContact(true);

    try {
      await deleteDoc(doc(userContactsCollection(user.id), contactToDelete.id));
      if (selectedUser?.id === contactToDelete.id) setSelectedUser(null);
      setSwipeOpenId(null);
      setContactToDelete(null);
    } finally {
      setDeletingContact(false);
    }
  };

  const inboxEmpty =
    !contactsLoading &&
    (contactIds.length === 0 || !contactUsersLoading) &&
    inboxUsers.length === 0 &&
    groupConversations.length === 0 &&
    !aiAvailable;

  /* Ouvre la conversation avec l'assistant : la ligne existe déjà dans la
     boîte, mais le document de conversation doit être créé au premier
     message. */
  const openAiConversation = async (): Promise<void> => {
    if (!user) return;

    setSelectedUser(null);
    setSelectedGroup(null);
    setSelectedAi(true);

    try {
      await ensureAiConversation(user.id);
    } catch {
      /* La conversation sera de toute façon créée à l'envoi du message. */
    }
  };

  const inboxList = (
    <div
      className='flex flex-1 flex-col md:min-h-0 md:overflow-y-auto md:overscroll-contain'
      onClick={(event) => {
        if (!isMobile || !swipeOpenId) return;
        const target = event.target as HTMLElement;
        const row = target.closest('[data-contact-row]');
        if (row?.getAttribute('data-contact-row') !== swipeOpenId)
          setSwipeOpenId(null);
      }}
    >
      {contactsLoading || (contactIds.length > 0 && contactUsersLoading) ? (
        <Loading className='mt-8' />
      ) : inboxEmpty ? (
        <div className='flex flex-1 flex-col items-center justify-center px-5 text-center'>
          <Image
            alt='Illustration d’une boîte de réception vide'
            className='mb-4 h-auto w-40 object-contain'
            height={597}
            src='/Contact.webp'
            width={800}
          />
          <p className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
            Aucun contact
          </p>
          <p className='mt-1 max-w-[16rem] text-sm leading-5 text-light-secondary dark:text-dark-secondary'>
            Ajoutez des personnes depuis l’icône en haut à droite pour échanger
            en privé. Vos contacts apparaîtront ensuite ici.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-1 px-2 pb-2 pt-2'>
          {aiAvailable && (
            <button
              className={cn(
                'min-h-16 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                selectedAi
                  ? 'bg-main-search-background'
                  : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
              )}
              onClick={() => void openAiConversation()}
              type='button'
            >
              <AiAvatar className='!self-center' size={44} />
              <span className='min-w-0 flex-1'>
                <span className='flex items-baseline justify-between gap-2'>
                  <span className='truncate font-bold text-light-primary dark:text-dark-primary'>
                    {AI_BOT_NAME}
                  </span>
                  {aiConversation.lastMessage && (
                    <span className='shrink-0 text-[11px] text-light-secondary dark:text-dark-secondary'>
                      {formatChatTime(aiConversation.lastMessage.createdAt)}
                    </span>
                  )}
                </span>
                <span className='block truncate text-sm text-light-secondary dark:text-dark-secondary'>
                  {aiConversation.lastMessage?.text ?? AI_BOT_DESCRIPTION}
                </span>
              </span>
            </button>
          )}
          {groupConversations.map((group) => {
            const members = getGroupMembers(group);
            const lastMessage = group.lastMessage;
            const outgoing = lastMessage?.createdBy === user?.id;
            const unread =
              isConversationUnread(group, user?.id ?? '') &&
              selectedGroup?.id !== group.id;
            const preview = lastMessage
              ? lastMessage.hasAudio
                ? 'Message vocal'
                : lastMessage.text ?? 'Pièce jointe'
              : `${group.participants.length} membres`;

            return (
              <button
                className={cn(
                  'min-h-16 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                  selectedGroup?.id === group.id
                    ? 'bg-main-search-background'
                    : 'hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                )}
                key={group.id}
                onClick={() => {
                  setSwipeOpenId(null);
                  /* Re-cliquer sur le groupe déjà ouvert le referme. */
                  if (selectedGroup?.id === group.id) {
                    setSelectedGroup(null);
                    return;
                  }
                  setSelectedUser(null);
                  setSelectedGroup(group);
                  if (user?.id) void markConversationAsRead(user.id, group.id);
                }}
                type='button'
              >
                <GroupAvatar
                  className='!self-center'
                  members={members}
                  photoURL={group.photoURL}
                  size={44}
                />
                <span className='min-w-0 flex-1'>
                  <span className='flex items-baseline justify-between gap-2'>
                    <span className='truncate font-bold text-light-primary dark:text-dark-primary'>
                      {group.name || 'Groupe'}
                    </span>
                    {lastMessage && (
                      <span className='shrink-0 text-[11px] text-light-secondary dark:text-dark-secondary'>
                        {formatChatTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </span>
                  <span className='block truncate text-sm text-light-secondary dark:text-dark-secondary'>
                    {lastMessage && outgoing ? 'Vous : ' : ''}
                    {preview}
                  </span>
                </span>
                {unread && (
                  <span className='flex h-4 min-w-[16px] shrink-0 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white'>
                    1
                  </span>
                )}
              </button>
            );
          })}
          {inboxUsers.map((contact) => {
            /* Dernier message de la conversation privée : il arrive ici en
               temps réel, sans actualiser la page. */
            const conversation = directConversations.get(
              getChatId(user?.id ?? '', contact.id)
            );
            const lastMessage = conversation?.lastMessage ?? null;

            const outgoing = lastMessage?.createdBy === user?.id;

            const unread =
              Boolean(conversation) &&
              isConversationUnread(conversation!, user?.id ?? '') &&
              selectedUser?.id !== contact.id;

            const preview = lastMessage
              ? lastMessage.hasAudio
                ? 'Message vocal'
                : lastMessage.text ?? 'Pièce jointe'
              : null;

            return (
              <div
                className='group relative overflow-hidden rounded-xl'
                data-contact-row={contact.id}
                data-no-section-swipe
                key={contact.id}
                onPointerCancel={() => {
                  if (longPressTimerRef.current) {
                    clearTimeout(longPressTimerRef.current);
                    longPressTimerRef.current = null;
                  }
                }}
                onPointerDown={() => {
                  if (longPressTimerRef.current)
                    clearTimeout(longPressTimerRef.current);
                  longPressTimerRef.current = setTimeout(() => {
                    setSelectedIds((current) => {
                      const next = new Set(current);
                      next.add(contact.id);
                      return next;
                    });
                    longPressTimerRef.current = null;
                  }, 500);
                }}
                onPointerUp={() => {
                  if (longPressTimerRef.current) {
                    clearTimeout(longPressTimerRef.current);
                    longPressTimerRef.current = null;
                  }
                }}
              >
                <div
                  className={cn(
                    'relative flex items-center rounded-xl transition-colors',
                    selectedIds.has(contact.id)
                      ? 'bg-main-accent/10'
                      : selectedUser?.id === contact.id
                      ? 'bg-main-search-background'
                      : 'bg-main-background hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                  )}
                >
                  <div
                    className='min-h-16 flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-3 py-3'
                    onClick={() => {
                      if (selectedIds.size > 0) {
                        setSelectedIds((current) => {
                          const next = new Set(current);
                          if (next.has(contact.id)) next.delete(contact.id);
                          else next.add(contact.id);
                          return next;
                        });
                        return;
                      }
                      setSelectedGroup(null);
                      setSelectedUser(contact);

                      // Marque la conversation comme lue (dès l'ouverture).
                      const chatId = getChatId(user?.id ?? '', contact.id);
                      if (user?.id)
                        void markConversationAsRead(user.id, chatId);
                    }}
                  >
                    <span className='relative shrink-0'>
                      <UserAvatar
                        alt={contact.name}
                        className='!self-center'
                        frame={contact.avatarFrame}
                        gender={contact.gender}
                        shape={contact.avatarShape}
                        src={contact.photoURL}
                      />
                      {selectedIds.has(contact.id) ? (
                        <motion.span
                          animate={{ scale: 1, opacity: 1 }}
                          className={cn(
                            'absolute inset-0 flex items-center justify-center bg-main-accent/90',
                            getAvatarShapeClass(contact.avatarShape)
                          )}
                          initial={{ scale: 0.5, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20
                          }}
                        >
                          <MaterialIcon
                            className='h-5 w-5 text-white'
                            iconName='check'
                            solid
                          />
                        </motion.span>
                      ) : (
                        unread && (
                          <span className='absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white'>
                            1
                          </span>
                        )
                      )}
                    </span>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-baseline justify-between gap-2'>
                        <UserName
                          name={contact.name}
                          verified={contact.verified}
                        />
                        {lastMessage && (
                          <span className='shrink-0 text-[11px] text-light-secondary dark:text-dark-secondary'>
                            {formatChatTime(lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      {preview ? (
                        <span className='block truncate text-sm text-light-secondary dark:text-dark-secondary'>
                          {outgoing ? 'Vous : ' : ''}
                          {preview}
                        </span>
                      ) : (
                        <UserUsername disableLink username={contact.username} />
                      )}
                    </div>
                  </div>
                  {!isMobile && (
                    <button
                      aria-label={`Supprimer la conversation avec ${contact.name}`}
                      className='mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-transparent text-[#e5484d] opacity-0 transition hover:bg-[#e5484d]/10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] active:scale-95 group-focus-within:opacity-100 group-hover:opacity-100'
                      onClick={() => setContactToDelete(contact)}
                      title='Supprimer la conversation'
                      type='button'
                    >
                      <MaterialIcon className='h-4 w-4' iconName='delete' />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <MainContainer className='!max-w-6xl !pb-20 xs:!pb-0'>
      <SEO
        title='Messagerie / Inspiration'
        description='Votre espace de messagerie privée sur Inspiration.'
      />
      <MainHeader
        title='Messagerie'
        useMobileSidebar
        className='min-h-14 flex items-center justify-between'
        beforeTitle={
          isMobile && (selectedUser !== null || selectedIds.size > 0) ? (
            <button
              aria-label='Supprimer la conversation'
              className='mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#e5484d] text-white shadow-sm transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]/60 active:scale-95'
              onClick={() => {
                if (selectedIds.size > 0) {
                  const ids = [...selectedIds];
                  if (!ids.length || !user?.id) return;
                  if (ids.length === 1) {
                    const contact = inboxUsers.find((u) => u.id === ids[0]);
                    if (contact) setContactToDelete(contact);
                    return;
                  }
                  setMultiDeleteOpen(true);
                  return;
                }
                if (selectedUser) setContactToDelete(selectedUser);
              }}
              onMouseDown={(event) => event.stopPropagation()}
              title='Supprimer'
              type='button'
            >
              <MaterialIcon className='h-5 w-5' iconName='delete' />
            </button>
          ) : undefined
        }
      >
        <div className='flex items-center gap-2'>
          <button
            aria-expanded={createOpen}
            aria-haspopup='dialog'
            aria-label='Créer un message ou un groupe'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-main-accent text-white shadow-sm transition hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-accent/60 active:scale-95'
            onClick={openCreate}
            title='Nouveau message'
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='edit_square' />
          </button>
        </div>
      </MainHeader>

      <section className='flex min-h-[min(760px,calc(100dvh-5rem))] flex-1'>
        <aside
          className={cn(
            'flex w-full max-w-none shrink-0 flex-col md:sticky md:top-[57px] md:h-[calc(100dvh-57px)] md:min-h-0 md:self-start md:overflow-hidden',
            (selectedUser || selectedGroup) && 'hidden md:flex'
          )}
          style={{
            /* Tant que le volet de conversation est masqué (écran étroit),
               la liste occupe toute la largeur : une colonne étroite avec un
               grand vide à côté n'est pas lisible. */
            width: isTwoPane ? inboxWidth : undefined
          }}
        >
          <div className='hidden items-center justify-between px-5 py-5 md:flex'>
            <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
              Boîte de réception
            </h2>
            <button
              aria-label='Réinitialiser la largeur'
              className='flex h-7 w-7 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 hover:text-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary'
              onClick={() => setInboxWidth(320)}
              title='Largeur par défaut'
              type='button'
            >
              <MaterialIcon className='h-4 w-4' iconName='close_fullscreen' />
            </button>
          </div>
          {inboxList}
        </aside>

        {/* Poignée de redimensionnement (bureau uniquement). */}
        <div
          className='hidden w-2 cursor-col-resize bg-light-border/40 transition-colors hover:bg-main-accent/60 dark:bg-dark-border/40 md:block'
          onMouseDown={(event) => {
            event.preventDefault();
            resizingRef.current = true;
            const startX = event.clientX;
            const startWidth = inboxWidth;

            const handleMove = (moveEvent: MouseEvent): void => {
              if (!resizingRef.current) return;
              const next = Math.min(
                480,
                Math.max(240, startWidth + moveEvent.clientX - startX)
              );
              setInboxWidth(next);
            };

            const handleUp = (): void => {
              resizingRef.current = false;
              document.removeEventListener('mousemove', handleMove);
              document.removeEventListener('mouseup', handleUp);
              document.body.style.cursor = '';
              document.body.style.userSelect = '';
            };

            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
          }}
          title='Glisser pour redimensionner'
        />

        {(selectedUser || selectedGroup || selectedAi) && user ? (
          <Conversation
            contact={selectedUser ?? undefined}
            group={
              selectedUser
                ? undefined
                : selectedAi
                ? aiConversation
                : selectedGroup ?? undefined
            }
            members={
              !selectedUser && selectedGroup && !selectedAi
                ? getGroupMembers(selectedGroup)
                : undefined
            }
            onBack={() => {
              setSelectedUser(null);
              setSelectedGroup(null);
              setSelectedAi(false);
            }}
            user={user}
          />
        ) : (
          <div className='hidden flex-1 flex-col items-center justify-center border-light-border px-7 py-12 text-center dark:border-dark-border md:flex md:border-l md:px-12'>
            <Image
              alt='Illustration d’une messagerie sans conversation en cours'
              className='mb-7 h-auto w-96 max-w-full object-contain'
              height={400}
              src='/Conversation.jpg'
              width={600}
            />
            <h1 className='max-w-lg text-2xl font-bold tracking-tight text-light-primary dark:text-dark-primary'>
              Aucune discussion en cours pour le moment
            </h1>
            <p className='mt-2 max-w-md text-sm leading-6 text-light-secondary dark:text-dark-secondary'>
              C’est ici que vos conversations privées apparaîtront. Ajoutez des
              personnes depuis l’icône en haut à droite, puis lancez la
              discussion quand vous le souhaitez.
            </p>
          </div>
        )}
      </section>

      <Modal
        className='flex items-end justify-center p-0 lg:items-center lg:p-4'
        modalAnimation={isSheet ? composeSheetAnimation : undefined}
        modalClassName={`fixed inset-x-0 bottom-0 w-full max-w-sm overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border lg:static lg:rounded-lg lg:border ${
          createExpanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : ''
        }`}
        drag={isSheet ? 'y' : false}
        dragControls={createDragControls}
        dragListener={false}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={handleCreateDragEnd}
        open={createOpen}
        closeModal={closeCreate}
        closeOnBackdropClick
      >
        {isSheet && (
          <button
            aria-label='Faire glisser la fenêtre vers le bas ou vers le haut'
            className='flex w-full touch-none justify-center py-3 lg:hidden'
            onPointerDown={(event) =>
              createDragControls.start(event.nativeEvent)
            }
            type='button'
          >
            <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
        )}

        <div className='flex items-center justify-between gap-3 px-4 pt-4'>
          <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
            Créer
          </h2>
          <button
            aria-label='Fermer'
            className='-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
            onClick={closeCreate}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </button>
        </div>

        <div className='flex flex-col gap-2 p-4'>
          <button
            className='flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            onClick={openPicker}
            type='button'
          >
            <span className='bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent'>
              <MaterialIcon className='h-6 w-6' iconName='edit_square' />
            </span>
            <span className='min-w-0'>
              <span className='block font-bold text-light-primary dark:text-dark-primary'>
                Nouveau message
              </span>
              <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                Ajoutez une personne à votre boîte de réception
              </span>
            </span>
          </button>

          <button
            className='flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            onClick={openGroup}
            type='button'
          >
            <GroupIcon />
            <span className='min-w-0'>
              <span className='block font-bold text-light-primary dark:text-dark-primary'>
                Nouveau groupe
              </span>
              <span className='block text-sm text-light-secondary dark:text-dark-secondary'>
                Rassemblez plusieurs personnes dans une discussion
              </span>
            </span>
          </button>
        </div>
      </Modal>

      <Modal
        className='flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4'
        modalAnimation={isMobile ? composeSheetAnimation : undefined}
        modalClassName={`fixed inset-x-0 bottom-0 flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden overscroll-contain rounded-t-xl border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-lg xs:border ${
          pickerExpanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : ''
        }`}
        drag={isMobile ? 'y' : false}
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.25}
        dragMomentum={false}
        dragSnapToOrigin
        dragUp={160}
        onDrag={(_, info) => {
          if (info.offset.y < -32) setPickerExpanded(true);
        }}
        onDragEnd={handlePickerDragEnd}
        open={pickerOpen}
        closeModal={closePicker}
      >
        {isMobile && (
          <button
            aria-label='Faire glisser pour agrandir ou fermer le nouveau message'
            className='flex w-full touch-none justify-center py-3'
            onPointerDown={(event) => dragControls.start(event.nativeEvent)}
            type='button'
          >
            <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
        )}
        <div className='flex items-center justify-between gap-3 px-4 pb-3 pt-2 xs:pt-4'>
          <div>
            <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
              Nouveau message
            </h2>
            <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
              Choisissez une personne à ajouter à votre boîte de réception.
            </p>
          </div>
          <button
            aria-label='Fermer le nouveau message'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:hover:bg-white/5'
            onClick={closePicker}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </button>
        </div>
        <label className='mx-4 mb-3 flex items-center gap-3 rounded-full bg-main-search-background px-4 py-2 focus-within:ring-2 focus-within:ring-main-accent'>
          <MaterialIcon
            className='h-5 w-5 text-light-secondary dark:text-dark-secondary'
            iconName='search'
          />
          <input
            aria-label='Rechercher des personnes'
            className='w-full bg-transparent text-sm text-light-primary outline-none placeholder:text-light-secondary dark:text-dark-primary dark:placeholder:text-dark-secondary'
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Rechercher des personnes'
            type='search'
            value={search}
          />
        </label>
        <div className='min-h-0 flex-1 overflow-y-auto px-2 pb-4'>
          {usersLoading ? (
            <Loading className='mt-8' />
          ) : pickerUsers.length === 0 ? (
            <p className='px-6 py-8 text-center text-sm text-light-secondary dark:text-dark-secondary'>
              Aucune personne ne correspond à votre recherche.
            </p>
          ) : (
            pickerUsers.map((item) => (
              <div
                className='active:bg-light-primary/15 dark:active:bg-dark-primary/15 my-0.5 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                key={item.id}
                onClick={() => void addContact(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    void addContact(item);
                  }
                }}
                role='button'
                tabIndex={0}
              >
                <UserAvatar
                  alt={item.name}
                  className='!self-center'
                  frame={item.avatarFrame}
                  gender={item.gender}
                  shape={item.avatarShape}
                  src={item.photoURL}
                />
                <div className='min-w-0 flex-1'>
                  <UserName name={item.name} verified={item.verified} />
                  <div className='flex items-center gap-1'>
                    <UserUsername disableLink username={item.username} />
                    <UserFollowing userTargetId={item.id} />
                  </div>
                </div>
                <FollowButton
                  userTargetId={item.id}
                  userTargetUsername={item.username}
                />
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal
        className='flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4'
        modalAnimation={isMobile ? composeSheetAnimation : undefined}
        modalClassName={`fixed inset-x-0 bottom-0 flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden overscroll-contain rounded-t-xl border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-lg xs:border ${
          groupExpanded
            ? 'h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
            : ''
        }`}
        drag={isMobile ? 'y' : false}
        dragControls={groupDragControls}
        dragListener={false}
        dragSnapToOrigin
        dragUp={160}
        onDragEnd={handleGroupDragEnd}
        open={groupOpen}
        closeModal={closeGroup}
      >
        {isMobile && (
          <button
            aria-label='Faire glisser pour agrandir ou fermer la création de groupe'
            className='flex w-full touch-none justify-center py-3'
            onPointerDown={(event) =>
              groupDragControls.start(event.nativeEvent)
            }
            type='button'
          >
            <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
          </button>
        )}
        <div className='flex items-center justify-between gap-3 px-4 pb-3 pt-2 xs:pt-4'>
          <div className='min-w-0'>
            <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
              {groupStep === 1
                ? 'Nouveau groupe'
                : groupStep === 2
                ? 'Informations du groupe'
                : 'Confirmer le groupe'}
            </h2>
            <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
              {groupStep === 1
                ? 'Sélectionnez les personnes à ajouter à votre groupe.'
                : groupStep === 2
                ? 'Ajoutez un nom, une photo et une description.'
                : 'Vérifiez les informations avant de créer le groupe.'}
            </p>
          </div>
          <button
            aria-label='Fermer la création de groupe'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:hover:bg-white/5'
            onClick={closeGroup}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </button>
        </div>
        {groupStep === 1 && (
          <>
            <label className='mx-4 mb-3 flex items-center gap-3 rounded-full bg-main-search-background px-4 py-2 focus-within:ring-2 focus-within:ring-main-accent'>
              <MaterialIcon
                className='h-5 w-5 text-light-secondary dark:text-dark-secondary'
                iconName='search'
              />
              <input
                aria-label='Rechercher des personnes'
                className='w-full bg-transparent text-sm text-light-primary outline-none placeholder:text-light-secondary dark:text-dark-primary dark:placeholder:text-dark-secondary'
                onChange={(event) => setGroupSearch(event.target.value)}
                placeholder='Rechercher des personnes'
                type='search'
                value={groupSearch}
              />
            </label>
            <div className='min-h-0 flex-1 overflow-y-auto px-2 pb-2'>
              {usersLoading ? (
                <Loading className='mt-8' />
              ) : groupUsers.length === 0 ? (
                <p className='px-6 py-8 text-center text-sm text-light-secondary dark:text-dark-secondary'>
                  Aucune personne ne correspond à votre recherche.
                </p>
              ) : (
                groupUsers.map((item) => {
                  const selected = groupSelection.includes(item.id);

                  return (
                    <button
                      className={cn(
                        'my-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                        selected
                          ? 'bg-main-search-background'
                          : 'active:bg-light-primary/15 dark:active:bg-dark-primary/15 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                      )}
                      key={item.id}
                      onClick={() => toggleGroupMember(item.id)}
                      type='button'
                    >
                      <UserAvatar
                        alt={item.name}
                        className='!self-center'
                        frame={item.avatarFrame}
                        gender={item.gender}
                        shape={item.avatarShape}
                        src={item.photoURL}
                      />
                      <div className='min-w-0 flex-1'>
                        <UserName name={item.name} verified={item.verified} />
                        <UserUsername disableLink username={item.username} />
                      </div>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected
                            ? 'border-main-accent bg-main-accent text-white'
                            : 'border-light-secondary dark:border-dark-secondary'
                        }`}
                      >
                        {selected && (
                          <MaterialIcon className='h-3 w-3' iconName='check' />
                        )}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}

        {groupStep === 2 && (
          <div className='min-h-0 flex-1 overflow-y-auto px-4 pb-4'>
            <div className='flex flex-col items-center gap-3'>
              <GroupAvatar
                members={selectedMembers}
                photoURL={groupPhoto}
                size={96}
              />
              <div className='flex flex-wrap items-center justify-center gap-2'>
                <button
                  className='rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60'
                  disabled={groupPhotoBusy}
                  onClick={() => groupPhotoInputRef.current?.click()}
                  type='button'
                >
                  {groupPhotoBusy
                    ? 'Envoi…'
                    : groupPhoto
                    ? 'Changer la photo'
                    : 'Ajouter une photo'}
                </button>
                {groupPhoto && (
                  <button
                    className='rounded-full border border-light-border px-4 py-2 text-sm font-bold text-light-primary transition hover:bg-light-primary/10 dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/10'
                    onClick={() => setGroupPhoto(null)}
                    type='button'
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <p className='max-w-xs text-center text-xs text-light-secondary dark:text-dark-secondary'>
                {groupPhoto
                  ? 'Cette photo servira d’avatar au groupe.'
                  : 'Sans photo, l’avatar du groupe reprend les photos des membres, l’une sur l’autre.'}
              </p>
              <input
                accept='image/*'
                className='hidden'
                onChange={handleGroupPhotoChange}
                ref={groupPhotoInputRef}
                type='file'
              />
            </div>
            <label className='mt-5 block'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Nom du groupe
              </span>
              <input
                className='mt-1 w-full rounded-xl bg-main-search-background px-4 py-2.5 text-light-primary outline-none focus:ring-2 focus:ring-main-accent dark:text-dark-primary'
                maxLength={60}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder='Ex. « Les amis du vélo »'
                type='text'
                value={groupName}
              />
            </label>
            <label className='mt-4 block'>
              <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
                Description
              </span>
              <textarea
                className='mt-1 w-full resize-none rounded-xl bg-main-search-background px-4 py-2.5 text-light-primary outline-none focus:ring-2 focus:ring-main-accent dark:text-dark-primary'
                maxLength={200}
                onChange={(event) => setGroupDescription(event.target.value)}
                placeholder='À quoi sert ce groupe ?'
                rows={3}
                value={groupDescription}
              />
            </label>
            <p className='mt-2 text-right text-xs text-light-secondary dark:text-dark-secondary'>
              {groupDescription.length}/200
            </p>
          </div>
        )}

        {groupStep === 3 && (
          <div className='min-h-0 flex-1 overflow-y-auto px-4 pb-4'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <GroupAvatar
                members={selectedMembers}
                photoURL={groupPhoto}
                size={96}
              />
              <p className='mt-1 text-lg font-bold text-light-primary dark:text-dark-primary'>
                {groupName.trim() || 'Groupe'}
              </p>
              {groupDescription.trim() && (
                <p className='max-w-sm text-sm leading-5 text-light-secondary dark:text-dark-secondary'>
                  {groupDescription.trim()}
                </p>
              )}
              <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                {groupSelection.length + 1} membres
              </p>
            </div>
            <ul className='mt-4 flex flex-col gap-1'>
              {user && (
                <li className='flex items-center gap-3 rounded-lg px-3 py-2'>
                  <UserAvatar
                    alt={user.name}
                    className='!self-center'
                    frame={user.avatarFrame}
                    gender={user.gender}
                    shape={user.avatarShape}
                    size={36}
                    src={user.photoURL}
                  />
                  <span className='min-w-0 flex-1'>
                    <span className='block truncate font-semibold text-light-primary dark:text-dark-primary'>
                      {user.name}
                    </span>
                    <span className='block truncate text-sm text-light-secondary dark:text-dark-secondary'>
                      @{user.username} · vous
                    </span>
                  </span>
                </li>
              )}
              {selectedMembers.map((member) => (
                <li
                  className='flex items-center gap-3 rounded-lg bg-main-search-background px-3 py-2'
                  key={member.id}
                >
                  <UserAvatar
                    alt={member.name}
                    className='!self-center'
                    frame={member.avatarFrame}
                    gender={member.gender}
                    shape={member.avatarShape}
                    size={36}
                    src={member.photoURL}
                  />
                  <span className='min-w-0 flex-1'>
                    <span className='block truncate font-semibold text-light-primary dark:text-dark-primary'>
                      {member.name}
                    </span>
                    <span className='block truncate text-sm text-light-secondary dark:text-dark-secondary'>
                      @{member.username}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='flex items-center justify-between gap-3 border-t border-light-border px-4 py-3 dark:border-dark-border'>
          <button
            className='rounded-full px-4 py-2 text-sm font-bold text-light-primary transition hover:bg-light-primary/10 disabled:opacity-0 dark:text-dark-primary dark:hover:bg-dark-primary/10'
            disabled={groupStep === 1}
            onClick={() => setGroupStep(groupStep === 3 ? 2 : 1)}
            type='button'
          >
            Retour
          </button>
          {groupStep === 1 ? (
            <span className='flex items-center gap-3'>
              <span className='text-sm text-light-secondary dark:text-dark-secondary'>
                {groupSelection.length} sélectionné
                {groupSelection.length > 1 ? 's' : ''}
              </span>
              <button
                className='rounded-full bg-main-accent px-5 py-2 text-sm font-bold text-white transition enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={groupSelection.length === 0}
                onClick={() => setGroupStep(2)}
                type='button'
              >
                Suivant
              </button>
            </span>
          ) : groupStep === 2 ? (
            <button
              className='rounded-full bg-main-accent px-5 py-2 text-sm font-bold text-white transition enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={!groupName.trim() || groupPhotoBusy}
              onClick={() => setGroupStep(3)}
              type='button'
            >
              Suivant
            </button>
          ) : (
            <button
              className='rounded-full bg-main-accent px-5 py-2 text-sm font-bold text-white transition enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={creatingGroup}
              onClick={() => void handleCreateGroup()}
              type='button'
            >
              {creatingGroup ? 'Création…' : 'Créer le groupe'}
            </button>
          )}
        </div>
      </Modal>

      <Modal
        className='flex items-center justify-center p-4'
        modalClassName='w-full max-w-[26rem] rounded-lg bg-white px-8 py-8 shadow-2xl sm:px-10 sm:py-9 dark:bg-[#18212a]'
        open={contactToDelete !== null}
        closeModal={() => {
          if (!deletingContact) setContactToDelete(null);
        }}
      >
        <div
          className='relative'
          role='alertdialog'
          aria-modal='true'
          aria-labelledby='delete-contact-title'
        >
          <h2
            id='delete-contact-title'
            className='text-[22px] font-bold leading-7 text-light-primary dark:text-dark-primary'
          >
            Supprimer cette conversation ?
          </h2>
          <p className='mt-3 text-base leading-[1.6] text-[#536471] dark:text-dark-secondary'>
            La discussion avec « {contactToDelete?.name} » sera retirée de votre
            boîte de réception. Cette action est définitive.
          </p>
          <div className='mt-7 flex flex-col gap-3'>
            <button
              className='min-h-[50px] w-full rounded-full bg-[#e5484d] px-5 text-base font-bold text-white transition hover:bg-[#d7373b] disabled:opacity-60'
              disabled={deletingContact}
              onClick={() => void confirmDeleteContact()}
              type='button'
            >
              {deletingContact ? 'Suppression…' : 'Supprimer la conversation'}
            </button>
            <button
              className='min-h-[50px] w-full rounded-full border border-[#cfd9de] bg-white px-5 text-base font-bold text-light-primary transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-[#52606d] dark:bg-[#18212a] dark:text-dark-primary dark:hover:bg-white/5'
              disabled={deletingContact}
              onClick={() => setContactToDelete(null)}
              type='button'
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className='flex items-center justify-center p-4'
        modalClassName='w-full max-w-[26rem] rounded-lg bg-white px-8 py-8 shadow-2xl sm:px-10 sm:py-9 dark:bg-[#18212a]'
        open={multiDeleteOpen}
        closeModal={() => {
          if (!deletingContact) setMultiDeleteOpen(false);
        }}
      >
        <div role='alertdialog' aria-modal='true'>
          <h2 className='text-[22px] font-bold leading-7 text-light-primary dark:text-dark-primary'>
            Supprimer {selectedIds.size} conversation
            {selectedIds.size > 1 ? 's' : ''} ?
          </h2>
          <p className='mt-3 text-base leading-[1.6] text-[#536471] dark:text-dark-secondary'>
            Les discussions sélectionnées seront retirées de votre boîte de
            réception. Cette action est définitive.
          </p>
          <div className='mt-7 flex flex-col gap-3'>
            <button
              className='min-h-[50px] w-full rounded-full bg-[#e5484d] px-5 text-base font-bold text-white transition hover:bg-[#d7373b] disabled:opacity-60'
              disabled={deletingContact}
              onClick={() => {
                void (async () => {
                  const ids = [...selectedIds];
                  if (!user?.id) return;
                  setDeletingContact(true);
                  try {
                    for (const id of ids) {
                      try {
                        await deleteDoc(
                          doc(userContactsCollection(user.id), id)
                        );
                      } catch {
                        // ignore
                      }
                    }
                    if (selectedUser && ids.includes(selectedUser.id))
                      setSelectedUser(null);
                    setSelectedIds(new Set());
                    setMultiDeleteOpen(false);
                  } finally {
                    setDeletingContact(false);
                  }
                })();
              }}
              type='button'
            >
              {deletingContact ? 'Suppression…' : 'Supprimer'}
            </button>
            <button
              className='min-h-[50px] w-full rounded-full border border-[#cfd9de] bg-white px-5 text-base font-bold text-light-primary transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-[#52606d] dark:bg-[#18212a] dark:text-dark-primary dark:hover:bg-white/5'
              disabled={deletingContact}
              onClick={() => setMultiDeleteOpen(false)}
              type='button'
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </MainContainer>
  );
}

MessagesPage.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>{page}</MainLayout>
  </ProtectedLayout>
);
