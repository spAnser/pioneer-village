import { Crosshair, HudBottomLeft, HudBottomCenter, HudBottomRight } from './styles';
import UIComponent from '@uiLib/ui-component';
import { onClient } from '@lib/ui';

import VoiceQuiet from '@styled/fa5/modified/mouth-quiet.svg';
import VoiceNormal from '@styled/fa5/modified/mouth-normal.svg';
import VoiceLoud from '@styled/fa5/modified/mouth-loud.svg';
// import Microphone from '@styled/fa5/solid/microphone-alt.svg';
import Heart from '@styled/fa5/solid/heart.svg';
import Fire from '@styled/fa5/solid/fire-alt.svg';
import Snowflake from '@styled/fa5/solid/snowflake.svg';
import Bolt from '@styled/fa5/solid/bolt.svg';
import Walking from '@styled/fa5/solid/walking.svg';
import Running from '@styled/fa5/solid/running.svg';
// import Horse from '@styled/fa5/solid/horse.svg';
// import HorseSaddle from '@styled/fa5/solid/horse-saddle.svg';
import Bacterium from '@styled/fa5/solid/bacterium.svg';
import ClawMarks from '@styled/fa5/duotone/claw-marks.svg';
import Tint from '@styled/fa5/solid/tint.svg';
import BoneBreak from '@styled/fa5/solid/bone-break.svg';
import SpeedFastest from '@styled/fa5/solid/tachometer-alt-fastest.svg';
import SpeedFast from '@styled/fa5/solid/tachometer-alt-fast.svg';
import Speed from '@styled/fa5/solid/tachometer-alt-average.svg';
import SpeedSlow from '@styled/fa5/solid/tachometer-alt-slow.svg';
import SpeedSlowest from '@styled/fa5/solid/tachometer-alt-slowest.svg';

import FoodAndDrink from './icons/FoodAndDrink';
import ProgressIcon from './icons/ProgressIcon';
import { uiSize } from '@uiLib/helpers';
import { AnimInfection, AnimBleeding } from '@styled/animations';

export default class HUD extends UIComponent<UI.BaseProps, UI.HUD.State, {}> {
  constructor() {
    super();

    this.state = {
      show: true,
      crosshair: false,
      health: 100,
      isHot: false,
      isCold: false,
      bleeding: false,
      brokenBone: false,
      infection: 0,
      food: 100,
      drink: 100,
      stamina: 100,
      moveSpeed: 100,
      horseSpeed: 0,
      speakVolume: 2,
      isSpeaking: false,
    };

    onClient('hud.state', this.onEvent.bind(this));
  }

  onEvent(hudEvent: UI.HUD.Event) {
    this.setState(hudEvent);
  }

  render() {
    return (
      this.state.show && (
        <>
          {this.state.crosshair && <Crosshair />}
          <HudBottomLeft>
            <ProgressIcon
              width={36}
              height={36}
              color={this.state.isSpeaking ? 'red' : 'white'}
              fill={100}
              style={{ transform: `translateY(-${uiSize(4)})` }}
              className={this.state.isSpeaking || this.state.speakVolume !== 2 ? 'active' : undefined}
            >
              {this.state.speakVolume === 1 ? (
                <VoiceQuiet />
              ) : this.state.speakVolume === 2 ? (
                <VoiceNormal />
              ) : this.state.speakVolume === 3 ? (
                <VoiceLoud />
              ) : (
                <VoiceNormal />
              )}
            </ProgressIcon>
            {/*<ProgressIcon*/}
            {/*  width={34}*/}
            {/*  height={34}*/}
            {/*  color="white"*/}
            {/*  fill={this.state.speakVolume * 33.333}*/}
            {/*  style={{ transform: `translateY(-${uiSize(2)})` }}*/}
            {/*  className={this.state.speakVolume !== 2 ? 'active' : undefined}*/}
            {/*>*/}
            {/*  <Microphone />*/}
            {/*</ProgressIcon>*/}
            <ProgressIcon
              width={40}
              height={40}
              color={this.state.health < 25 ? 'red' : 'green'}
              fill={this.state.health}
              style={{ transform: `translateY(-${uiSize(3)})` }}
              className={this.state.health < 100 ? 'active' : undefined}
            >
              <Heart />
            </ProgressIcon>
            <ProgressIcon
              width={38}
              height={38}
              color="red"
              fill={100}
              className={this.state.isHot ? 'active' : undefined}
            >
              <Fire />
            </ProgressIcon>
            <ProgressIcon
              width={38}
              height={38}
              color="lightBlue"
              fill={100}
              className={this.state.isCold ? 'active' : undefined}
            >
              <Snowflake />
            </ProgressIcon>
            <AnimBleeding className={this.state.bleeding ? 'active' : undefined}>
              <ProgressIcon
                width={38}
                height={38}
                color="white"
                fill={100}
                className={this.state.bleeding ? 'active' : undefined}
              >
                <ClawMarks className="clawMarks" />
                {this.state.bleeding && (
                  <>
                    <Tint className="blood" />
                    <Tint className="blood" />
                    <Tint className="blood" />
                  </>
                )}
              </ProgressIcon>
            </AnimBleeding>
            <ProgressIcon
              width={38}
              height={38}
              color="white"
              fill={100}
              className={this.state.brokenBone ? 'active' : undefined}
            >
              <BoneBreak />
            </ProgressIcon>
            <AnimInfection className={this.state.infection > 50 ? 'active' : null}>
              <ProgressIcon
                width={32}
                height={32}
                fill={this.state.infection}
                className={this.state.infection > 0 ? 'active' : undefined}
              >
                <Bacterium />
              </ProgressIcon>
            </AnimInfection>
            <FoodAndDrink
              width={48}
              height={48}
              food={this.state.food}
              drink={this.state.drink}
              className={this.state.food < 85 || this.state.drink < 85 ? 'active' : undefined}
            />
            <ProgressIcon
              width={38}
              height={38}
              color={this.state.stamina < 25 ? 'red' : 'white'}
              fill={this.state.stamina}
              className={this.state.stamina < 90 ? 'active' : undefined}
            >
              <Bolt />
            </ProgressIcon>
            <ProgressIcon
              width={38}
              height={38}
              color="white"
              fill={this.state.moveSpeed}
              className={this.state.moveSpeed < 100 ? 'active' : undefined}
            >
              {this.state.moveSpeed <= 50 ? <Walking /> : <Running />}
            </ProgressIcon>
          </HudBottomLeft>
          <HudBottomCenter>
            <ProgressIcon
              width={38}
              height={38}
              color="gray50"
              fill={100}
              className={this.state.horseSpeed > 0 ? 'active' : undefined}
            >
              {this.state.horseSpeed > 80 ? (
                <SpeedFastest />
              ) : this.state.horseSpeed > 60 ? (
                <SpeedFast />
              ) : this.state.horseSpeed > 40 ? (
                <Speed />
              ) : this.state.horseSpeed > 20 ? (
                <SpeedSlow />
              ) : (
                <SpeedSlowest />
              )}
            </ProgressIcon>
          </HudBottomCenter>
          {/*<HudBottomRight></HudBottomRight>*/}
        </>
      )
    );
  }
}
