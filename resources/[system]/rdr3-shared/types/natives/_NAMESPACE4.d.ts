/**
   * _REPORT_PLAYER_BAD_SPORT_BEHAVIOR
   * nullsub, doesn't do anything
   * however it is being used in tty scripts: [NET_BAD_SPORT_REPORT_PLAYER] Detected bad sport behavior from Player
   * badSportBehavior: BS_QUITTER = 0, BS_VEHICLE_DESTRUCTION = 1, BS_VOTED_OUT = 2
   *
   * @param {DataView} gamerHandle
   * @param {number} badSportBehaviorType
   * @return {void}
   */
declare function ReportPlayerBadSportBehavior(gamerHandle: DataView, badSportBehaviorType: number): void;