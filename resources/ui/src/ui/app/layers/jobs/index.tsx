import { useCallback, useEffect, useState } from 'react';

import { useEscapeKey } from '../../hooks/use-game-events';
import jobsStore from '../../stores/jobs-store';
import styles from './styles.module.scss';

interface JobCardProps {
  job: Jobs.JobDefinition;
}

function JobCard({ job }: JobCardProps): React.ReactElement {
  return (
    <div className={styles.jobCard}>
      <h4>{job.name}</h4>
      {job.description && <p>{job.description}</p>}
      <p>
        <strong>Payment:</strong> {job.paymentType} - ${job.paymentAmount}
      </p>
    </div>
  );
}

interface ActiveTaskRowProps {
  instance: Jobs.TaskInstance;
}

function ActiveTaskRow({ instance }: ActiveTaskRowProps): React.ReactElement {
  return (
    <div className={styles.taskRow}>
      <span className={styles.taskHandle}>{instance.taskHandle}</span>
      <span className={styles.taskStatus}>{instance.status === 'IN_PROGRESS' ? 'In Progress' : 'Assigned'}</span>
      <span className={styles.taskTime}>{new Date(instance.assignedAt).toLocaleTimeString()}</span>
    </div>
  );
}

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

  const handleClockOut = useCallback((): void => {
    jobsStore.performClockOut();
  }, []);

  if (!state.show) return null;

  const { loading, error, isClocked, currentJob, availableJobs, clockedInEmployees, activeTasks } = state;

  return (
    <div className={styles.frame}>
      <div className={styles.container}>
        <h2>Job Management</h2>

        {error && <div className={styles.error}>{error}</div>}

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

        {loading && <p className={styles.loading}>Refreshing…</p>}

        {isClocked && currentJob ? (
          <div>
            <h3>{currentJob.name}</h3>
            {currentJob.description && <p>{currentJob.description}</p>}
            <p>
              <strong>Payment:</strong> {currentJob.paymentType} - ${currentJob.paymentAmount}
            </p>

            <h3>Active Tasks</h3>
            {activeTasks.length === 0 ? (
              <p>Nothing assigned right now.</p>
            ) : (
              activeTasks.map((instance) => <ActiveTaskRow instance={instance} key={instance.id} />)
            )}

            <button className={`${styles.button} ${styles.danger}`} onClick={handleClockOut} type="button">
              Clock Out
            </button>
          </div>
        ) : (
          <div>
            <h3>Available Jobs</h3>
            {availableJobs.length === 0 ? (
              <p>No jobs available at this time.</p>
            ) : (
              availableJobs.map((job) => <JobCard job={job} key={job.handle} />)
            )}
            <p className={styles.note}>Clock in at the job&apos;s worksite.</p>
          </div>
        )}
      </div>
    </div>
  );
}
