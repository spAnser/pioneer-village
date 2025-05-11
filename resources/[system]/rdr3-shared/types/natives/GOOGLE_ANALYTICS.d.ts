/**
   * _GOOGLE_ANALYTICS_END_EVENT
   *
  
   * @return {boolean}
   */
declare function GoogleAnalyticsEndEvent(): boolean;

/**
   * _GOOGLE_ANALYTICS_POP_PAGE
   *
   * @param {string | number} pageName
   * @return {void}
   */
declare function GoogleAnalyticsPopPage(pageName: string | number): void;

/**
   * _GOOGLE_ANALYTICS_PUSH_PAGE
   *
   * @param {string | number} pageName
   * @return {void}
   */
declare function GoogleAnalyticsPushPage(pageName: string | number): void;

/**
   * _GOOGLE_ANALYTICS_START_EVENT
   *
   * @param {string | number} eventCategory
   * @param {string | number} eventAction
   * @param {string | number} eventLabel
   * @param {number} eventValue
   * @return {boolean}
   */
declare function GoogleAnalyticsStartEvent(eventCategory: string | number, eventAction: string | number, eventLabel: string | number, eventValue: number): boolean;