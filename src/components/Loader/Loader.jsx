import { ProgressBar } from 'react-loader-spinner';

export const Loader = () => (
  <ProgressBar
    height="100"
    width="100"
    ariaLabel="progress-bar-loading"
    wrapperStyle={{ margin: '0 auto', paddingBottom: '20px' }}
    borderColor="#3f51b5"
    barColor="#3f51b5"
  />
);
