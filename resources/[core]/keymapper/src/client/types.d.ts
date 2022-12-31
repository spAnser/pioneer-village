declare interface ClientExports {
  keymapper: KeyMapper.ClientExports;
}

declare namespace KeyMapper {
  type RegisterKeyMapping = (
    commandString: string,
    description: string,
    inputType: string,
    inputKey: string,
    modifier?: string,
  ) => void;

  type RemoveKeyMapping = (commandString: string, inputKey: string) => void;

  type ClientExports = {
    RegisterKeyMapping: RegisterKeyMapping;
    RemoveKeyMapping: RemoveKeyMapping;
  };
}
