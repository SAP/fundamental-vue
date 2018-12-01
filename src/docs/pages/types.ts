// @ts-ignore
import { all } from '@/components';
import { VueConstructor } from 'vue';
import { IconName } from '@/lib';

type ExampleCollectionPlugin = {
  relatedComponents: VueConstructor[];
  icon?: IconName;
};

export type ExampleCollectionFunction = (components: typeof all) => ExampleCollectionPlugin;
