import { Injectable, OnModuleInit } from '@nestjs/common';
import { api, v3 } from 'node-hue-api';
import { ConfigService } from '@nestjs/config';

type GroupLightsState = { all_on?: boolean; any_on?: boolean };

@Injectable()
export class HueService implements OnModuleInit {
  private hueApi;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    this.hueApi = await api
      .createLocal(this.config.get('PHILIPS_HUE_HOST'))
      .connect(this.config.get('PHILIPS_HUE_USERNAME'));
  }

  async activateRelax() {
    return this.hueApi.scenes.activateScene(
      this.config.get('PHILIPS_HUE_SCENE_RELAX'),
    );
  }

  async activateEnergize() {
    return this.hueApi.scenes.activateScene(
      this.config.get('PHILIPS_HUE_SCENE_ENERGIZE'),
    );
  }

  async toggleLamps() {
    const currentLampState: GroupLightsState =
      await this.hueApi.groups.getGroupState(
        this.config.get('PHILIPS_HUE_GROUP_LAMPS'),
      );

    // turn on
    if (!currentLampState?.all_on) {
      return this.activateEnergize();
    }

    // turn off
    const newLampState = new v3.lightStates.GroupLightState().on(false);

    return this.hueApi.groups.setGroupState(
      this.config.get('PHILIPS_HUE_GROUP_LAMPS'),
      newLampState,
    );
  }
}
