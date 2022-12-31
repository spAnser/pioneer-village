import UIComponent from '@uiLib/ui-component';
import { onClient } from '@lib/ui';

import { DoctorWrapper, DoctorCircle } from './styles';

import BoneBreak from '@styled/fa5/solid/bone-break.svg';
import ClawMarks from '@styled/fa5/solid/claw-marks.svg';
import Bacterium from '@styled/fa5/solid/bacterium.svg';
import Fire from '@styled/fa5/solid/fire.svg';

import Circle from './icon/circle';

export default class Doctor extends UIComponent<UI.BaseProps, UI.Doctor.State, {}> {
  closeOnEscape = true;

  constructor() {
    super();

    this.state = {
      show: false,
      entity: 0,
      boneStatus: [],
      inspecting: -1,
      inspected: [],
    };

    onClient('doctor.state', this.onEvent.bind(this));
  }

  onEvent(doctorEvent: UI.Doctor.Event) {
    if (doctorEvent.entity && doctorEvent.entity !== this.state.entity) {
      if (doctorEvent.boneStatus?.length) {
        doctorEvent.inspected = new Array(doctorEvent.boneStatus.length).fill(false);
      }
    }

    this.setState(doctorEvent);
  }

  onEscape() {
    this.setState({ show: false });
  }

  inspect(index: number) {
    if (this.state.inspecting !== -1 || this.state.inspected[index]) {
      return;
    }
    const { boneStatus, inspected } = this.state;
    const bone = boneStatus[index];

    if (bone) {
      const newInspected = [...inspected];
      newInspected[index] = true;

      this.setState({
        inspecting: index,
      });

      setTimeout(() => {
        this.setState({
          inspecting: -1,
          inspected: newInspected,
        });
      }, 2500);
    }
  }

  boneHealthColor(b: number, bone: UI.Doctor.BoneStatus) {
    if (this.state.inspected[b]) {
      if (bone.health < 20) {
        return 'red';
      }
      if (bone.health < 60) {
        return 'orange';
      }
      return 'green';
    }
    return 'white';
  }

  render() {
    return (
      this.state.show && (
        <DoctorWrapper>
          {this.state.boneStatus.map((bone, b) => (
            <DoctorCircle
              className={b === this.state.inspecting ? 'inspecting' : this.state.inspected[b] ? 'inspected' : ''}
              style={{ top: `${bone.coords.y}vh`, left: `${bone.coords.x}vw` }}
              onClick={() => this.inspect(b)}
              data-name={bone.name}
            >
              <Circle
                className="borderCircle"
                percentage={this.state.inspected[b] ? bone.health : 0}
                color={this.boneHealthColor(b, bone)}
              />
              {this.state.inspected[b] && (
                <>
                  {(bone.broken && <BoneBreak />) || ''}
                  {(bone.wound && <ClawMarks />) || ''}
                  {(bone.burned && <Fire />) || ''}
                  {(bone.infection && <Bacterium />) || ''}
                </>
              )}
            </DoctorCircle>
          ))}
        </DoctorWrapper>
      )
    );
  }
}
