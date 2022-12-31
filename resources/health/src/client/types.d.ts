declare namespace Health {}

declare interface UIEvents {
  ['doctor.state']: (event: UI.Doctor.Event) => void;
}
