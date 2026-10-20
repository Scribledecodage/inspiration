import { MaterialIcon } from './material-icon';

type ErrorProps = {
  message?: string;
};

export function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div
      className='flex flex-col items-center justify-center 
                 gap-2 py-5 px-3 text-light-secondary dark:text-dark-secondary'
    >
      <i>
        <MaterialIcon className='h-10 w-10' iconName='warning' />
      </i>
      <p>{message ?? 'Une erreur s’est produite. Essayez de recharger la page.'}</p>
    </div>
  );
}
