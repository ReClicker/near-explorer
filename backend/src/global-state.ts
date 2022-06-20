import { CachedTimestampMap } from "./cron/types";
import {
  CurrentEpochState,
  ValidatorDescription,
  ValidatorPoolInfo,
} from "./types";

export type GlobalState = {
  stakingPoolsDescriptions: Map<string, ValidatorDescription>;
  stakingPoolStakeProposalsFromContract: CachedTimestampMap<string>;
  stakingPoolInfos: CachedTimestampMap<ValidatorPoolInfo>;
  poolIds: string[];
  currentEpochState: CurrentEpochState | null;
  genesis: {
    minStakeRatio: [number, number];
    accountCount: number;
  } | null;
};

export const initGlobalState = (): GlobalState => ({
  stakingPoolsDescriptions: new Map(),
  stakingPoolStakeProposalsFromContract: {
    timestampMap: new Map(),
    valueMap: new Map(),
    promisesMap: new Map(),
  },
  stakingPoolInfos: {
    timestampMap: new Map(),
    valueMap: new Map(),
    promisesMap: new Map(),
  },
  poolIds: [],
  currentEpochState: null,
  genesis: null,
});
