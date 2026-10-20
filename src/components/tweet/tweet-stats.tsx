/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import {
  manageRetweet,
  manageLike,
  registerTweetView
} from '@lib/firebase/utils';
import { ViewTweetStats } from '@components/view/view-tweet-stats';
import { ReportModal } from '@components/modal/report-modal';
import { TweetOption } from './tweet-option';
import { TweetShare } from './tweet-share';
import { TweetStatsPanel } from './tweet-stats-panel';
import type { Tweet } from '@lib/types/tweet';

type TweetStatsProps = Pick<
  Tweet,
  'userLikes' | 'userRetweets' | 'userReplies' | 'views'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  tweetId: string;
  viewTweet?: boolean;
  openModal?: () => void;
  /** Données d'aperçu pour le panneau de partage. */
  text?: string | null;
  name?: string;
  username?: string;
  photoURL?: string;
  previewImage?: string;
  /** Auteur de la publication, nécessaire pour instruire un signalement. */
  authorId?: string;
};

export function TweetStats({
  reply,
  userId,
  isOwner,
  tweetId,
  userLikes,
  views,
  viewTweet,
  userRetweets,
  userReplies: totalReplies,
  openModal,
  text,
  name,
  username,
  photoURL,
  previewImage,
  authorId
}: TweetStatsProps): JSX.Element {
  const safeLikes = Array.isArray(userLikes) ? userLikes : [];
  const safeRetweets = Array.isArray(userRetweets) ? userRetweets : [];
  const totalLikes = safeLikes.length;
  const totalTweets = safeRetweets.length;
  const totalViews = views ?? 0;

  const [{ currentReplies, currentTweets, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });
  }, [totalReplies, totalLikes, totalTweets]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [totalReplies]
  );

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes]
  );

  const tweetMove = useMemo(
    () => (totalTweets > currentTweets ? -25 : 25),
    [totalTweets]
  );

  const tweetIsLiked = safeLikes.includes(userId);
  const tweetIsRetweeted = safeRetweets.includes(userId);

  const isStatsVisible = !!(totalReplies || totalTweets || totalLikes);

  const [statsOpen, setStatsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  /* Compte une vue (une seule fois par publication et par session). */
  useEffect(() => {
    void registerTweetView(tweetId);
  }, [tweetId]);

  return (
    <>
      {viewTweet && (
        <ViewTweetStats
          likeMove={likeMove}
          userLikes={safeLikes}
          tweetMove={tweetMove}
          replyMove={replyMove}
          userRetweets={safeRetweets}
          currentLikes={currentLikes}
          currentTweets={currentTweets}
          currentReplies={currentReplies}
          isStatsVisible={isStatsVisible}
        />
      )}
      <div
        className={cn(
          'flex text-light-secondary inner:outline-none dark:text-dark-secondary',
          viewTweet ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <TweetOption
          className='hover:text-accent-blue focus-visible:text-accent-blue'
          iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20 
                         group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-accent-blue/80'
          tip={reply ? 'Répondre à cette réponse' : 'Répondre'}
          move={replyMove}
          stats={currentReplies}
          iconName='chat_bubble'
          viewTweet={viewTweet}
          onClick={openModal}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-green focus-visible:text-accent-green',
            tweetIsRetweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20
                         group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80'
          tip={tweetIsRetweeted ? 'Annuler le repost' : 'Reposter'}
          move={tweetMove}
          stats={currentTweets}
          iconName='repeat'
          viewTweet={viewTweet}
          onClick={manageRetweet(
            tweetIsRetweeted ? 'unretweet' : 'retweet',
            userId,
            tweetId
          )}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-pink focus-visible:text-accent-pink',
            tweetIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20
                         group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80'
          tip={tweetIsLiked ? 'Retirer le J’aime' : 'J’aime'}
          move={likeMove}
          stats={currentLikes}
          iconName='favorite'
          viewTweet={viewTweet}
          onClick={manageLike(
            tweetIsLiked ? 'unlike' : 'like',
            userId,
            tweetId
          )}
        />
        <TweetShare
          userId={userId}
          tweetId={tweetId}
          viewTweet={viewTweet}
          text={text}
          name={name}
          username={username}
          photoURL={photoURL}
          previewImage={previewImage}
        />
        {!isOwner && !viewTweet && (
          <TweetOption
            className='hover:text-main-accent focus-visible:text-main-accent'
            iconClassName='group-hover:bg-main-accent/10 group-active:bg-main-accent/20 
                           group-focus-visible:bg-main-accent/10 group-focus-visible:ring-main-accent/80'
            tip='Signaler le contenu'
            iconName='flag'
            viewTweet={viewTweet}
            hideStats
            onClick={(): void => setReportOpen(true)}
          />
        )}
        {isOwner && (
          <TweetOption
            className='hover:text-main-accent focus-visible:text-main-accent'
            iconClassName='group-hover:bg-main-accent/10 group-active:bg-main-accent/20 
                           group-focus-visible:bg-main-accent/10'
            tip='Voir les statistiques'
            move={25}
            stats={totalViews}
            iconName='pie_chart'
            viewTweet={viewTweet}
            onClick={(): void => setStatsOpen(true)}
          />
        )}
      </div>
      {isOwner && (
        <TweetStatsPanel
          tweetId={tweetId}
          open={statsOpen}
          closeModal={(): void => setStatsOpen(false)}
        />
      )}
      <ReportModal
        open={reportOpen}
        tweetId={tweetId}
        tweetAuthorId={authorId ?? ''}
        tweetAuthorUsername={username ?? ''}
        tweetAuthorName={name}
        tweetText={text}
        tweetPhotoURL={photoURL}
        closeModal={(): void => setReportOpen(false)}
      />
    </>
  );
}
