import { useCallback, useEffect, useState } from 'react';

import { useEscapeKey } from '../../hooks/use-game-events';
import jobsStore from '../../stores/jobs-store';
import styles from './styles.module.scss';

export default function Jobs(): React.ReactElement | null {
  const [state, setState] = useState(jobsStore.getState());

  useEffect(() => {
    const unsubscribe = jobsStore.subscribe(setState);
    return unsubscribe;
  }, []);

  const onEscape = useCallback((): void => {
    jobsStore.close();
  }, []);

  useEscapeKey(state.show, onEscape);

  const handleClockIn = (jobHandle: string): void => {
    jobsStore.performClockIn(jobHandle);
  };

  const handleClockOut = (): void => {
    jobsStore.performClockOut();
  };

  if (!state.show) return null;

  const { isClocked, currentJob, availableJobs, clockedInEmployees } = state;

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <h2>Job Management</h2>

        <div className={styles.statusBar}>
          <div>
            <strong>Status:</strong> {isClocked ? 'Clocked In' : 'Not Working'}
          </div>
          {currentJob && (
            <div>
              <strong>Current Job:</strong> {currentJob.name} ({currentJob.handle})
            </div>
          )}
          <div>
            <strong>Total Employees Online:</strong> {clockedInEmployees}
          </div>
        </div>

        {isClocked && currentJob ? (
          <div>
            <h3>Current Job: {currentJob.name}</h3>
            <p>{currentJob.description}</p>
            <p>
              <strong>Payment:</strong> {currentJob.paymentType} - ${currentJob.paymentAmount}
            </p>
            <button className={`${styles.button} ${styles.danger}`} onClick={handleClockOut}>
              Clock Out
            </button>
          </div>
        ) : (
          <div>
            <h3>Available Jobs</h3>
            {availableJobs.length === 0 ? (
              <p>No jobs available at this time.</p>
            ) : (
              availableJobs.map((job: Jobs.JobDefinition) => (
                <div className={styles.jobCard} key={job.handle}>
                  <h4>{job.name}</h4>
                  <p>{job.description}</p>
                  <p>
                    <strong>Payment:</strong> {job.paymentType} - ${job.paymentAmount}
                  </p>
                  <button className={styles.button} onClick={() => handleClockIn(job.handle)}>
                    Clock In
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
